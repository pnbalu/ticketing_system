import { NavLink, Outlet } from 'react-router-dom'
import '../../App.css'

const authLinks = [
  { label: 'Sign in', to: '/auth/login' },
  { label: 'Create account', to: '/auth/signup' },
  { label: 'Recover access', to: '/auth/forgot-password' },
]

function AuthLayout() {
  return (
    <div className="auth-shell">
      <div className="auth-aurora" aria-hidden="true" />
      <div className="auth-grid">
        <aside className="auth-showcase">
          <div className="auth-brand">
            <span className="brand-glow" />
            <div>
              <h1>NovaDesk</h1>
              <p>Support orchestration for teams that move at lightspeed.</p>
            </div>
          </div>

          <div className="auth-narrative">
            <h2>Cultivate legendary customer rituals.</h2>
            <p>
              Synchronize squads, automate incident choreography, and restore customer
              calm before sentiment even shifts. NovaDesk transforms reactive support
              into a predictive craft.
            </p>
            <ul>
              <li>
                <strong>Autopilot flows</strong> anticipate intent across every channel.
              </li>
              <li>
                <strong>Signal-led triage</strong> removes inbox noise in real time.
              </li>
              <li>
                <strong>Mission dashboards</strong> fuse operations and customer voice.
              </li>
            </ul>
          </div>

          <div className="auth-stats">
            <div>
              <span>Median first response</span>
              <strong>2m 18s</strong>
            </div>
            <div>
              <span>Sentiment uplift</span>
              <strong>+21%</strong>
            </div>
            <div>
              <span>Signals automated</span>
              <strong>78%</strong>
            </div>
          </div>

          <div className="auth-testimonial">
            <p>
              “NovaDesk turned our fire-fighting into a choreographed experience. Our
              customers feel the difference in every interaction.”
            </p>
            <span>— Aria Quinn, VP of Experience @ Framewave</span>
          </div>
        </aside>

        <section className="auth-panel">
          <nav className="auth-nav" aria-label="Authentication pages">
            {authLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="auth-body">
            <Outlet />
          </div>

          <footer className="auth-footer">
            <span>Need a demo? Visit the mission control overview.</span>
            <NavLink to="/">Back to Nova mission control</NavLink>
          </footer>
        </section>
      </div>
    </div>
  )
}

export default AuthLayout

