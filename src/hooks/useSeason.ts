'use client'

export function useSeason(): 'monsoon' | 'harvest' | 'summer' {
  const month = new Date().getMonth() + 1
  if (month >= 6 && month <= 9) return 'monsoon'
  if (month >= 10 || month <= 2) return 'harvest'
  return 'summer'
}
