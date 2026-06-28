// Client-side access gate.
//
// IMPORTANT: GitHub Pages is static hosting, so this check runs in the
// browser. It deters casual access but is not strong security — a determined
// visitor could bypass it. We store only a SHA-256 hash of "username:password"
// (never the plaintext) so credentials aren't readable in the public repo.
//
// To change credentials, recompute the hash and replace CREDENTIAL_HASH:
//   node -e 'console.log(require("crypto").createHash("sha256").update("USER:PASS").digest("hex"))'

const CREDENTIAL_HASH =
  '529a39f547bef6bc1806d929f9795b9a2d06f6a9eadc5e5dc9870e98b42e3bf8'

const SESSION_KEY = 'clinical-breakout:auth'

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// Returns true if username + password match. Username is case-insensitive.
export async function verifyCredentials(username, password) {
  const combo = `${(username || '').trim().toLowerCase()}:${password || ''}`
  const hash = await sha256Hex(combo)
  // length-independent equality is overkill here, but cheap
  return hash === CREDENTIAL_HASH
}

export function isAuthed() {
  try {
    return localStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function setAuthed(on) {
  try {
    if (on) localStorage.setItem(SESSION_KEY, '1')
    else localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}
