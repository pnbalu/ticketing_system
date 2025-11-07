import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

const teamScales = ['Under 10', '10 – 50', '50 – 250', '250+']
const focusChannels = ['Live chat', 'Email', 'Voice', 'Product status', 'Enterprise success']

function SignupPage() {
  const [teamScale, setTeamScale] = useState('10 – 50')
  const [channel, setChannel] = useState('Live chat')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="form-card">
      <header className="form-header">
        <span className="form-chip form-chip-lilac">New to Nova</span>
        <h2>Spin up your collaborative support studio</h2>
        <p>
          Craft rituals, automate escalations, and invite your squad into a single
          mission control canvas built around live customer signals.
        </p>
      </header>

      <form className="form-stack" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            <span>Full name</span>
            <input type="text" placeholder="Aria Quinn" required />
          </label>
          <label className="form-field">
            <span>Work email</span>
            <input type="email" placeholder="aria@framewave.com" required />
          </label>
        </div>

        <label className="form-field">
          <span>Company</span>
          <input type="text" placeholder="Framewave" required />
        </label>

        <div className="form-grid">
          <label className="form-field">
            <span>Create password</span>
            <input type="password" placeholder="Minimum 12 characters" required />
          </label>
          <label className="form-field">
            <span>Confirm password</span>
            <input type="password" placeholder="Repeat password" required />
          </label>
        </div>

        <div className="form-field">
          <span>Team size</span>
          <div className="chip-row">
            {teamScales.map((scale) => (
              <button
                key={scale}
                type="button"
                className={teamScale === scale ? 'active' : ''}
                onClick={() => setTeamScale(scale)}
              >
                {scale}
              </button>
            ))}
          </div>
        </div>

        <div className="form-field">
          <span>Primary customer channel</span>
          <div className="chip-row ghost">
            {focusChannels.map((focus) => (
              <button
                key={focus}
                type="button"
                className={channel === focus ? 'active' : ''}
                onClick={() => setChannel(focus)}
              >
                {focus}
              </button>
            ))}
          </div>
        </div>

        <label className="form-checkbox">
          <input type="checkbox" required />
          <span>
            I agree to the NovaDesk rituals charter and understand how data will be used.
          </span>
        </label>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Create launch workspace
          </button>
          <button type="button" className="ghost-btn">
            Schedule white-glove onboarding
          </button>
        </div>
      </form>

      <footer className="form-footer-note">
        Already invited? <Link to="/auth/login">Sign in with your mission link</Link>
      </footer>
    </div>
  )
}

export default SignupPage

