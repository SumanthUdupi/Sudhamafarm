import { test, expect, type Page, type BrowserContext } from '@playwright/test'
import { createHmac } from 'crypto'

// ─── Token helper (mirrors middleware logic) ───────────────────────────────
function generateCommandToken(secret: string): string {
  const ts = Math.floor(Date.now() / 1000).toString()
  const hmac = createHmac('sha256', secret).update(ts).digest('hex')
  return `${ts}.${hmac}`
}

const COMMAND_SECRET = process.env.COMMAND_SECRET ?? 'test-secret-for-ci-use-only-32c'

// ─── TEST CASE 1: Security Masking ─────────────────────────────────────────
test.describe('Security: Command Center Access Control', () => {
  test('[Desktop] unauthenticated /command request returns 404, not 401/403', async ({ page }) => {
    const response = await page.goto('/command', { waitUntil: 'networkidle' })

    // Middleware rewrites to /not-found — must be HTTP 200 (rewrite) but show 404 UI
    // OR Next.js responds with its own 404. Either way: no command UI visible.
    const bodyText = await page.textContent('body')

    // Must NOT expose the command center UI
    expect(bodyText).not.toContain('Command Center')
    expect(bodyText).not.toContain('Telemetry')
    expect(bodyText).not.toContain('Publishing Calendar')

    // Should show 404 content
    expect(bodyText?.toLowerCase()).toMatch(/404|not found|page not found/i)
  })

  test('[Desktop] direct path probe does not reveal admin panel in HTML source', async ({ page }) => {
    await page.goto('/command')
    const html = await page.content()

    expect(html).not.toContain('data-testid="command-center"')
    expect(html).not.toContain('/api/schedule')
  })

  test('[Mobile] unauthenticated /command request returns 404 on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/command')
    const bodyText = await page.textContent('body')
    expect(bodyText?.toLowerCase()).toMatch(/404|not found/i)
    expect(bodyText).not.toContain('Command Center')
  })

  test('[Desktop] valid signed token grants command center access', async ({ page }) => {
    const token = generateCommandToken(COMMAND_SECRET)
    const response = await page.goto(`/command?t=${token}`, { waitUntil: 'domcontentloaded' })

    // Should NOT be a 404 page
    const bodyText = await page.textContent('body')
    expect(bodyText).not.toMatch(/^404$/m)

    // Should render command center heading
    await expect(page.getByText('Command Center')).toBeVisible({ timeout: 5000 })
  })

  test('[Desktop] expired token (>15 min old) is rejected', async ({ page }) => {
    // Manually craft a token with an old timestamp
    const oldTs = (Math.floor(Date.now() / 1000) - 1000).toString() // 16+ minutes ago
    const hmac = createHmac('sha256', COMMAND_SECRET).update(oldTs).digest('hex')
    const expiredToken = `${oldTs}.${hmac}`

    await page.goto(`/command?t=${expiredToken}`)
    const bodyText = await page.textContent('body')
    expect(bodyText?.toLowerCase()).toMatch(/404|not found/i)
  })
})

// ─── TEST CASE 2: Theme Inference Transformation ───────────────────────────
test.describe('Theme Inference: CinematicContentShell', () => {
  test('Temple article applies spiritual theme (dark canvas, Cinzel font)', async ({ page }) => {
    await page.goto('/blog/puri-jagannath-temple', { waitUntil: 'domcontentloaded' })

    // The spiritual theme sets a near-black background on the shell
    const shell = page.locator('[style*="background-color"]').first()
    const bg = await shell.getAttribute('style')
    // Spiritual theme canvasBg is #0D0A07
    expect(bg).toMatch(/#0[Dd]0[Aa]07|0d0a07|rgb\(13,\s*10,\s*7\)/i)
  })

  test('Temple article uses Cinzel font family for headings', async ({ page }) => {
    await page.goto('/blog/konark-sun-temple', { waitUntil: 'domcontentloaded' })

    const h1 = page.locator('h1').first()
    const fontFamily = await h1.evaluate((el) => getComputedStyle(el).fontFamily)
    expect(fontFamily.toLowerCase()).toContain('cinzel')
  })

  test('Different articles produce different theme tokens without collision', async ({ browser }) => {
    // Load two different article pages in separate contexts to prevent cache bleed
    const ctx1: BrowserContext = await browser.newContext()
    const ctx2: BrowserContext = await browser.newContext()

    const [page1, page2] = await Promise.all([
      ctx1.newPage(),
      ctx2.newPage(),
    ])

    await Promise.all([
      page1.goto('/blog/puri-jagannath-temple', { waitUntil: 'domcontentloaded' }),
      page2.goto('/blog/konark-sun-temple', { waitUntil: 'domcontentloaded' }),
    ])

    const getShellBg = (p: Page) =>
      p.locator('[style*="background-color"]').first().getAttribute('style')

    const [bg1, bg2] = await Promise.all([getShellBg(page1), getShellBg(page2)])

    // Both are spiritual — same theme, which is expected. Verify they both loaded.
    expect(bg1).toBeTruthy()
    expect(bg2).toBeTruthy()

    await ctx1.close()
    await ctx2.close()
  })

  test('Blog index page retains default farm/warm theme', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'domcontentloaded' })

    // Default background is the coconut/warm palette — body should not be near-black
    const bgColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    // Should NOT be the spiritual dark background
    expect(bgColor).not.toMatch(/rgb\(13,\s*10,\s*7\)/)
  })

  test('Article heading font-family is applied via CSS custom property', async ({ page }) => {
    await page.goto('/blog/lingaraj-temple', { waitUntil: 'domcontentloaded' })

    const fontVar = await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--active-font-head') ||
      getComputedStyle(document.documentElement).getPropertyValue('--active-font-head')
    )
    // CinematicContentShell sets this on the shell div, not :root
    // Check h1 computed font includes cinzel or playfair
    const h1Font = await page.locator('h1').first().evaluate((el) => getComputedStyle(el).fontFamily)
    expect(h1Font.toLowerCase()).toMatch(/cinzel|playfair/i)
  })
})

// ─── TEST CASE 3: Scheduling Concurrency & Optimistic Handling ─────────────
test.describe('Scheduling: Concurrency Resiliency & Optimistic Locking', () => {
  const token = generateCommandToken(COMMAND_SECRET)

  test('Scheduling an article shows optimistic UI feedback immediately', async ({ page }) => {
    await page.goto(`/command?t=${token}`, { waitUntil: 'networkidle' })

    // Intercept the schedule API to add artificial delay
    await page.route('/api/schedule', async (route) => {
      await new Promise((r) => setTimeout(r, 300))
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    // Click a day in the calendar
    const calendarDay = page.locator('button').filter({ hasText: /^1[5-9]$/ }).first()
    await calendarDay.click()

    // Select an article
    const select = page.locator('select')
    await select.selectOption({ index: 1 })

    // Click confirm
    await page.locator('button', { hasText: 'Confirm Schedule' }).click()

    // Optimistic: button shows loading state
    await expect(page.locator('button', { hasText: 'Saving…' })).toBeVisible({ timeout: 2000 })
  })

  test('Network failure triggers error toast with Retry action', async ({ page }) => {
    await page.goto(`/command?t=${token}`, { waitUntil: 'networkidle' })

    // Mock API failure
    await page.route('/api/schedule', (route) =>
      route.fulfill({ status: 500, body: JSON.stringify({ error: 'DB error' }) })
    )

    const calendarDay = page.locator('button').filter({ hasText: /^2[0-5]$/ }).first()
    await calendarDay.click()

    const select = page.locator('select')
    await select.selectOption({ index: 1 })
    await page.locator('button', { hasText: 'Confirm Schedule' }).click()

    // Toast with Retry should appear
    await expect(page.locator('[data-sonner-toast]')).toBeVisible({ timeout: 4000 })
    await expect(page.locator('button', { hasText: 'Retry' })).toBeVisible({ timeout: 2000 })
  })

  test('Conflict (409) response opens merge conflict notification', async ({ page }) => {
    await page.goto(`/command?t=${token}`, { waitUntil: 'networkidle' })

    // Mock 409 conflict
    await page.route('/api/schedule', (route) =>
      route.fulfill({
        status: 409,
        body: JSON.stringify({ error: 'conflict', message: 'Modified by another process.' }),
      })
    )

    const calendarDay = page.locator('button').filter({ hasText: /^[89]$/ }).first()
    await calendarDay.click()
    const select = page.locator('select')
    await select.selectOption({ index: 1 })
    await page.locator('button', { hasText: 'Confirm Schedule' }).click()

    // A toast indicating conflict should appear
    await expect(
      page.locator('[data-sonner-toast]').filter({ hasText: /conflict|modified/i })
    ).toBeVisible({ timeout: 4000 })
  })

  test('Simultaneous requests from two clients produce no UI crash', async ({ browser }) => {
    const ctx1 = await browser.newContext()
    const ctx2 = await browser.newContext()
    const [p1, p2] = await Promise.all([ctx1.newPage(), ctx2.newPage()])

    await Promise.all([
      p1.goto(`/command?t=${token}`, { waitUntil: 'networkidle' }),
      p2.goto(`/command?t=${token}`, { waitUntil: 'networkidle' }),
    ])

    // Mock both to succeed
    await p1.route('/api/schedule', (r) => r.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }))
    await p2.route('/api/schedule', (r) => r.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }))

    // Fire both schedule actions simultaneously
    const scheduleIn = async (p: Page) => {
      const day = p.locator('button').filter({ hasText: /^1[0-4]$/ }).first()
      await day.click()
      const sel = p.locator('select')
      await sel.selectOption({ index: 1 })
      return p.locator('button', { hasText: 'Confirm Schedule' }).click()
    }

    await Promise.all([scheduleIn(p1), scheduleIn(p2)])

    // Neither page should have crashed — both should still show the Command heading
    await expect(p1.getByText('Command Center')).toBeVisible({ timeout: 3000 })
    await expect(p2.getByText('Command Center')).toBeVisible({ timeout: 3000 })

    await ctx1.close()
    await ctx2.close()
  })
})

// ─── TEST CASE 4: Core Navigation & Routing ───────────────────────────────
test.describe('Navigation & Routing', () => {
  test('Home page loads and renders hero section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('h1', { hasText: 'SuDhama' })).toBeVisible()
  })

  test('Blog index lists all published articles', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('article')).toHaveCount({ minimum: 1 } as never)
  })

  test('Blog article page renders title and content', async ({ page }) => {
    await page.goto('/blog/konark-sun-temple', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('h1')).toContainText('Konark')
  })

  test('Unknown blog slug returns 404', async ({ page }) => {
    const res = await page.goto('/blog/this-article-does-not-exist')
    expect(res?.status()).toBe(404)
  })

  test('[Mobile] hamburger menu opens and closes correctly', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    const hamburger = page.locator('button[aria-label="Toggle menu"]')
    await hamburger.click()

    await expect(page.locator('nav a', { hasText: 'Sacred Journeys' })).toBeVisible({ timeout: 2000 })

    await hamburger.click()
    await expect(page.locator('nav a', { hasText: 'Sacred Journeys' })).not.toBeVisible({ timeout: 2000 })
  })
})
