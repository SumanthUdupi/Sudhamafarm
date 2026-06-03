/* ════════ GlowInvite.jsx — long-scroll invitation surface ════════ */

const { useEffect: useEffectG, useRef: useRefG } = React;
const MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3267.7977577419288!2d74.63620480600737!3d13.786080064126601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc8a87bc0f7751%3A0xe4caca14081dd920!2sSri%20Krishna%20Lalitha%20Kala%20Mandira!5e0!3m2!1sen!2sin!4v1780235354375!5m2!1sen!2sin";

function Hero() {
  return (
    <section className="hero">
      <Petals />
      <KolamCorner pos="tl" /><KolamCorner pos="tr" /><KolamCorner pos="bl" /><KolamCorner pos="br" />
      <div className="hero-inner">
        <Garland />
        <p className="hero-om" lang="kn">❧&nbsp;&nbsp;ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ&nbsp;&nbsp;❧</p>
        <div className="hero-names">
          <span className="name">Sumanth</span>
          <span className="amp">&amp;</span>
          <span className="name">Vindhya</span>
        </div>
        <p className="hero-tagline">— A Sacred Union Begins —</p>
        <div className="hero-badge">✦&nbsp; 12<sup>th</sup> JULY &nbsp;·&nbsp; NAGOOR, UDUPI &nbsp;✦</div>
        <Garland bottom />
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
          <rect x="1" y="1" width="16" height="26" rx="8" stroke="#EAA221" strokeWidth="1.6"/>
          <circle cx="9" cy="8" r="2.5" fill="#EAA221">
            <animate attributeName="cy" from="8" to="18" dur="1.7s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="1" to="0" dur="1.7s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <span>Scroll</span>
      </div>
    </section>
  );
}

function Divine() {
  return (
    <section className="divine">
      <div className="inner">
        <h2 className="sec-title reveal">The Divine Presence</h2>
        <p className="sec-sub reveal">Five Sacred Guardians bless this union</p>
        <DeityRow />
        <Rule />
        <div className="shloka-card reveal">
          <span className="shloka-gem tl">✦</span><span className="shloka-gem tr">✦</span>
          <span className="shloka-gem bl">✦</span><span className="shloka-gem br">✦</span>
          <span className="om" aria-label="Om">ॐ</span>
          <p className="shloka-kn" lang="kn">
            ವಿಷ್ಣುಂ ಶಿವಂ ಕೃಷ್ಣಂ ಸ್ಕಂದಂ ಹನೂಮಂತಂ ನಮಾಮ್ಯಹಮ್ |<br/>
            ಪಂಚದೇವಾಃ ಪ್ರಸನ್ನಾಃ ಸ್ಯುಃ ಶುಭಲಗ್ನೇ ಶುಭಾಶಯಾಃ ||
          </p>
          <p className="shloka-en">
            "I bow to Vishnu, Shiva, Krishna, Skanda, and Hanuman —<br/>
            may these Five Sacred Ones fill this auspicious hour with their grace."
          </p>
        </div>
        <h3 className="sec-title reveal" style={{ marginTop: '.5rem' }}>A Joyful Invitation</h3>
        <Rule gem="❦" />
        <div className="inv-block reveal">
          <p className="inv-kn" lang="kn">
            ಸಮಸ್ತ ದೇವರ ಆಶೀರ್ವಾದ ಮತ್ತು ಎರಡು ಕುಟುಂಬಗಳ ಅಪಾರ ಸಂತೋಷದೊಂದಿಗೆ,<br/><br/>
            <strong>ಸುಮಂತ್ ಉಡುಪಿ</strong> ಮತ್ತು <strong>ವಿಂಧ್ಯಾ ಉಡುಪ</strong> ಅವರ ಕುಟುಂಬಸ್ಥರು ತಮ್ಮ ಪ್ರಿಯ ಮಕ್ಕಳ <strong>ನಿಶ್ಚಿತಾರ್ಥ — ಶುಭ ಉಂಗುರ ವಿನಿಮಯ ಸಮಾರಂಭ</strong>ಕ್ಕೆ ಸಾದರವಾಗಿ ಆಹ್ವಾನಿಸುತ್ತಾರೆ.
          </p>
          <p className="inv-en">
            With hearts overflowing with gratitude, joy, and the fragrance of marigolds, the families of <strong>Sumanth Udupi</strong> and <strong>Vindhya Udupa</strong> joyfully invite you to the sacred exchange of rings — a first tender step in the journey of a lifetime.<br/><br/>
            Your presence and blessings are our greatest treasure.
          </p>
        </div>
        <div className="families">
          <div className="fam-block reveal">
            <span className="fam-tag">Groom's Family</span>
            <span className="fam-name">Udupi Family</span>
            <span className="fam-kn" lang="kn">ಉಡುಪಿ ಕುಟುಂಬ</span>
          </div>
          <span className="fam-sep reveal" aria-hidden="true">❦</span>
          <div className="fam-block reveal">
            <span className="fam-tag">Bride's Family</span>
            <span className="fam-name">Udupa Family</span>
            <span className="fam-kn" lang="kn">ಉಡುಪ ಕುಟುಂಬ</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Muhurtham() {
  return (
    <section className="muhurtham">
      <div className="inner">
        <h2 className="sec-title reveal" lang="kn">ಶುಭ ಮುಹೂರ್ತ</h2>
        <p className="sec-sub reveal">The Holy Muhurtham · Auspicious Date &amp; Venue</p>
        <Rule />
        <div className="muhu-card reveal">
          <p className="muhu-lbl" lang="kn">✦&nbsp; ಶುಭ ದಿನ · Shubha Dina &nbsp;✦</p>
          <div className="muhu-day">12</div>
          <div className="muhu-month">JULY &nbsp;·&nbsp; 2026</div>
          <div className="muhu-hr" />
          <div className="muhu-venue">
            <strong>Sri Krishna Lalitha Kala Mandira</strong>
            <span lang="kn">ಶ್ರೀ ಕೃಷ್ಣ ಲಲಿತಾ ಕಲಾ ಮಂದಿರ</span>
            Nagoor, Udupi — Tulu Nadu, Karnataka
          </div>
          <p className="muhu-prose">"Where the coastal breezes of Udupi carry the fragrance of sandalwood and the whisper of the sea…"</p>
        </div>
        <div className="detail-grid">
          {[
            { i: '📅', l: 'Date', v: '12th July, 2026', s: 'ಆಷಾಢ ಮಾಸ · ಶುಭ ದಿನ' },
            { i: '🌅', l: 'Ceremony', v: 'Morning Onwards', s: 'Refreshments & Celebration' },
            { i: '📍', l: 'Venue', v: 'Nagoor, Udupi', s: 'ನಾಗೂರು, ಉಡುಪಿ' },
            { i: '💍', l: 'Occasion', v: 'Engagement', s: 'ನಿಶ್ಚಿತಾರ್ಥ' },
          ].map((d, k) => (
            <div className="detail-card reveal" key={k}>
              <span className="d-icon" aria-hidden="true">{d.i}</span>
              <div className="d-lbl">{d.l}</div>
              <div className="d-val">{d.v}</div>
              <div className="d-sub" lang="kn">{d.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapRsvp() {
  return (
    <section className="maprsvp">
      <div className="inner">
        <h2 className="sec-title reveal" lang="kn">ನಾಗೂರಿಗೆ ಸ್ವಾಗತ</h2>
        <p className="sec-sub reveal">The Path to Nagoor · Find Your Way to Us</p>
        <Rule gem="❦" />
        <div className="map-wrap reveal">
          <iframe src={MAP_SRC} width="100%" height="380" style={{ border: 0, display: 'block' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Sri Krishna Lalitha Kala Mandira, Nagoor, Udupi" />
          <div className="map-cap">
            <strong>Sri Krishna Lalitha Kala Mandira</strong>
            <span lang="kn">ಶ್ರೀ ಕೃಷ್ಣ ಲಲಿತಾ ಕಲಾ ಮಂದಿರ</span>&nbsp;·&nbsp; Nagoor, Udupi, Karnataka
          </div>
        </div>
        <div className="rsvp-block">
          <h3 className="rsvp-kn reveal" lang="kn">ನಿಮ್ಮ ಆಶೀರ್ವಾದ ಬೇಕು</h3>
          <p className="rsvp-en reveal">Your blessings and presence mean everything to us.</p>
          <div className="btn-row">
            <a className="btn-primary reveal" href="#" onClick={(e) => e.preventDefault()}>✦&nbsp;&nbsp;Send Your Blessings&nbsp;&nbsp;✦</a>
            <a className="btn-secondary reveal" href="#" onClick={(e) => e.preventDefault()}>↗&nbsp; Get Directions</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="closing">
      <DeityRowBrass />
      <Rule color="#D4AF37" />
      <p className="close-quote" lang="kn">
        ಕುಟುಂಬಗಳ ಮಿಲನ, ಪ್ರೀತಿಯ ಉಡುಗೊರೆ |<br/>ಎಲ್ಲರ ಆಶೀರ್ವಾದ, ಜೀವನದ ಸಾಥಿ ||
      </p>
      <p className="close-prose">
        "Two families, one joyful heart — in the warm coastal embrace of Udupi, where temple bells ring with the rhythm of the sea, Sumanth and Vindhya take their very first step together."
      </p>
      <Rule gem="❦" color="#D4AF37" />
      <div className="close-names">Sumanth &nbsp;✦&nbsp; Vindhya</div>
      <p className="close-names-kn" lang="kn">ಸುಮಂತ್ &nbsp;✦&nbsp; ವಿಂಧ್ಯಾ</p>
      <p className="close-date">12th July, 2026 &nbsp;·&nbsp; Nagoor, Udupi</p>
      <p className="footer-note">Made with love in Tulu Nadu &nbsp;·&nbsp; ಉಡುಪಿ ✦ ಕರ್ನಾಟಕ</p>
    </section>
  );
}

function GlowInvite() {
  const rootRef = useRefG(null);
  const barRef = useRefG(null);
  useEffectG(() => {
    const root = rootRef.current; if (!root) return;
    const scroller = root.closest('.kit-stage') || window;
    const getScroll = () => scroller === window ? window.scrollY : scroller.scrollTop;
    const getH = () => scroller === window ? document.documentElement.scrollHeight - window.innerHeight : scroller.scrollHeight - scroller.clientHeight;

    const onScroll = () => { if (barRef.current) barRef.current.style.width = Math.min(100, (getScroll() / (getH() || 1) * 100)).toFixed(1) + '%'; };
    const target = scroller === window ? window : scroller;
    target.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => { target.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  return (
    <div className="glow" ref={rootRef}>
      <div className="page-frame" aria-hidden="true" />
      <div id="progress-bar" ref={barRef} />
      <Hero />
      <WaveDivider bg="linear-gradient(165deg,#3A000D,#800020)" path="M0,70 C200,5 480,65 720,30 C960,5 1240,60 1440,22 L1440,70 Z" fill="#FDF6E9" />
      <Divine />
      <WaveDivider bg="#FDF6E9" path="M0,0 Q380,65 720,20 Q1060,65 1440,0 L1440,65 L0,65 Z" fill="#F4E7C7" />
      <Muhurtham />
      <WaveDivider bg="#F4E7C7" path="M0,60 L0,24 C280,65 640,5 1000,38 C1200,52 1360,24 1440,30 L1440,60 Z" fill="#FFFDF5" />
      <MapRsvp />
      <WaveDivider bg="#FFFDF5" path="M0,0 Q360,65 720,25 Q1080,65 1440,0 L1440,65 L0,65 Z" fill="#5C0015" />
      <Closing />
    </div>
  );
}

Object.assign(window, { GlowInvite });
