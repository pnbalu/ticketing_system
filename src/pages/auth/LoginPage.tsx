import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

const providers = [
  { name: 'Sign in with SSO', glyph: '🌐' },
  { name: 'Sign in with Google', glyph: '⚡' },
]

function LoginPage() {
  const [mode, setMode] = useState<'password' | 'magic-link'>('password')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="form-card">
      <header className="form-header">
        <span className="form-chip">Returning member</span>
        <h2>Welcome back to the response studio</h2>
        <p>Authenticate to rejoin your mission control rituals and live war rooms.</p>
      </header>

      <div className="form-toggle">
        <button
          type="button"
          className={mode === 'password' ? 'active' : ''}
          onClick={() => setMode('password')}
        >
          Password
        </button>
        <button
          type="button"
          className={mode === 'magic-link' ? 'active' : ''}
          onClick={() => setMode('magic-link')}
        >
          Magic link
        </button>
      </div>

      <form className="form-stack" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Email address</span>
          <input type="email" placeholder="team-lead@orbitops.io" required />
        </label>

        {mode === 'password' ? (
          <label className="form-field">
            <span>Password</span>
            <input type="password" placeholder="••••••••" required />
          </label>
        ) : (
          <div className="form-hint">
            We will deliver a single-use link to your email for instant access.
          </div>
        )}

        <div className="form-row">
          <label className="form-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Remember my device</span>
          </label>
          <Link className="form-link" to="/auth/forgot-password">
            Forgot password?
          </Link>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {mode === 'password' ? 'Enter mission control' : 'Send magic link'}
          </button>
          <button type="button" className="ghost-btn">
            Use hardware key
          </button>
        </div>
      </form>

      <div className="form-divider">
        <span />
        <small>Or continue with</small>
        <span />
      </div>

      <div className="form-alt-links">
        {providers.map((provider) => (
          <button key={provider.name} type="button">
            <span>{provider.glyph}</span>
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LoginPage

