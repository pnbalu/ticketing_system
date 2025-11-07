import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

const recoveryMethods = [
  { id: 'email', label: 'Email reset link', detail: 'Delivers a secure link to your inbox.' },
  { id: 'sms', label: 'SMS verification code', detail: 'Send to your verified mobile number.' },
  {
    id: 'security',
    label: 'Answer control challenge',
    detail: 'Confirm your adaptive security question.',
  },
]

function ForgotPasswordPage() {
  const [method, setMethod] = useState('email')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="form-card">
      <header className="form-header">
        <span className="form-chip form-chip-mint">Recover access</span>
        <h2>Let’s re-sync your credentials</h2>
        <p>Choose a recovery path and we’ll reunite you with your support rituals.</p>
      </header>

      <div className="form-field">
        <span>Preferred recovery orbit</span>
        <div className="recovery-options">
          {recoveryMethods.map((option) => (
            <button
              key={option.id}
              type="button"
              className={method === option.id ? 'active' : ''}
              onClick={() => setMethod(option.id)}
            >
              <span>{option.label}</span>
              <small>{option.detail}</small>
            </button>
          ))}
        </div>
      </div>

      <form className="form-stack" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>
            {method === 'sms'
              ? 'Mobile number'
              : method === 'security'
                ? 'Answer your control phrase'
                : 'Account email'}
          </span>
          {method === 'security' ? (
            <textarea rows={3} placeholder="Describe the outcome of our August 2025 launch." />
          ) : (
            <input
              type={method === 'sms' ? 'tel' : 'email'}
              placeholder={method === 'sms' ? '+1 (917) 555-0147' : 'ops-lead@orbitops.io'}
              required={method !== 'security'}
            />
          )}
        </label>

        <div className="form-hint">
          We will create a recovery ritual that expires in 15 minutes. Keep your device handy.
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Initiate recovery flow
          </button>
          <Link to="/auth/login" className="ghost-btn link-button">
            Return to sign in
          </Link>
        </div>
      </form>

      <div className="form-divider">
        <span />
        <small>Need extra help?</small>
        <span />
      </div>

      <div className="form-support-card">
        <strong>White-glove restoration</strong>
        <p>
          Ping our Nova guardians to manually rehydrate your workspace credentials and audit
          recent access attempts.
        </p>
        <button type="button" className="secondary-btn">
          Contact guardians
        </button>
      </div>
    </div>
  )
}

export default ForgotPasswordPage

