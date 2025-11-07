import '../App.css'
import { availableThemes, useTheme } from '../context/ThemeContext'
import { availableLayouts, useLayout } from '../context/LayoutContext'

function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { layout, setLayout } = useLayout()

  return (
    <div className="workspace-section">
      <header className="section-header">
        <div>
          <h3>Workspace settings</h3>
          <p>Control the look and feel of your service cloud console.</p>
        </div>
      </header>

      <section className="panel">
        <header>
          <h4>Theme</h4>
          <span className="pill">Active: {theme}</span>
        </header>
        <div className="theme-grid">
          {availableThemes.map((option) => (
            <label key={option} className={`theme-card ${option === theme ? 'active' : ''}`}>
              <input
                type="radio"
                name="theme"
                value={option}
                checked={option === theme}
                onChange={() => setTheme(option)}
              />
              <div className="theme-card-body">
                <strong>{option}</strong>
                <span>Preview the {option} workspace experience.</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="panel">
        <header>
          <h4>Layout</h4>
          <span className="pill">Active: {layout}</span>
        </header>
        <div className="theme-grid layout-grid">
          {availableLayouts.map((option) => (
            <label key={option} className={`theme-card ${option === layout ? 'active' : ''}`}>
              <input
                type="radio"
                name="layout"
                value={option}
                checked={option === layout}
                onChange={() => setLayout(option)}
              />
              <div className="theme-card-body">
                <strong>{option}</strong>
                <span>
                  {option === 'classic'
                    ? 'Standard rail with generous spacing.'
                    : option === 'compact'
                      ? 'Narrow rail, condensed content padding.'
                      : 'Crisp visuals with increased breathing room.'}
                </span>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="panel">
        <header>
          <h4>Notifications</h4>
        </header>
        <p className="text-muted">Connect your notification preferences once backend integration is ready.</p>
      </section>
    </div>
  )
}

export default SettingsPage
