import { useState } from 'react'
import { verifyCredentials, setAuthed } from '../lib/auth.js'

export default function Login({ onSuccess, title }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const ok = await verifyCredentials(username, password)
    setBusy(false)
    if (ok) {
      setAuthed(true)
      onSuccess()
    } else {
      setError('Incorrect username or password.')
      setPassword('')
    }
  }

  return (
    <div className="login-screen">
      <form className="card login-card" onSubmit={submit}>
        <div className="pulse login-logo" aria-hidden>＋</div>
        <div className="eyebrow">Restricted Access</div>
        <h1>{title}</h1>
        <p className="subtitle">Sign in to launch the facilitator board.</p>

        <label className="login-field">
          <span>Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />
        </label>
        <label className="login-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {error && <div className="login-error">{error}</div>}

        <button className="btn primary big" type="submit" disabled={busy}>
          {busy ? 'Checking…' : 'Sign in →'}
        </button>
      </form>
    </div>
  )
}
