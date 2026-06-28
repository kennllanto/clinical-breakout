// Normalize an answer for forgiving comparison:
// lowercase, strip accents/diacritics, collapse all non-alphanumerics.
// So "Alpha-1", "alpha 1", "ALPHA1", "α1" -> "alpha1".
export function normalize(s) {
  return String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining accents
    .replace(/[^a-z0-9]/g, '')
    .trim()
}

// True if `guess` matches any accepted code on the lock.
export function isCorrect(guess, codes) {
  const g = normalize(guess)
  if (!g) return false
  return (codes || []).some((c) => normalize(c) === g)
}
