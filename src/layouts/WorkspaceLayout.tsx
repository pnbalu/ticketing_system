import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Flame,
  Inbox,
  LayoutDashboard,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Settings,
  Users2,
} from 'lucide-react'
import '../App.css'

const workspaceNav = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Incidents', to: '/incidents', icon: Flame },
  { label: 'Service Requests', to: '/requests', icon: Inbox },
  { label: 'Changes', to: '/changes', icon: RefreshCw },
  { label: 'Knowledge', to: '/knowledge', icon: BookOpen },
  { label: 'Users & Roles', to: '/users', icon: Users2 },
  { label: 'Approvers', to: '/approvers', icon: ShieldCheck },
  { label: 'Settings', to: '/settings', icon: Settings },
]

const NAV_STORAGE_KEY = 'nova_nav_collapsed'

function WorkspaceLayout() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [navCollapsed, setNavCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.localStorage.getItem(NAV_STORAGE_KEY) === '1'
  })
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setProfileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-nav', navCollapsed ? 'collapsed' : 'expanded')
    }
    if (typeof window !== 'undefined') {
      if (navCollapsed) {
        window.localStorage.setItem(NAV_STORAGE_KEY, '1')
      } else {
        window.localStorage.removeItem(NAV_STORAGE_KEY)
      }
    }
  }, [navCollapsed])

  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.removeAttribute('data-nav')
      }
    }
  }, [])

  const activeTitle = useMemo(() => {
    const current = workspaceNav.find((item) => item.to === location.pathname)
    return current?.label ?? 'Unified service operations'
  }, [location.pathname])

  return (
    <div className="workspace-shell">
      <aside className="workspace-nav">
        <div className="workspace-logo" aria-hidden="true">
          <span className="brand-glow" />
        </div>
        <div className="workspace-name">Nova Service Cloud</div>
        <button
          type="button"
          className="workspace-nav-toggle"
          onClick={() => setNavCollapsed((prev) => !prev)}
          aria-pressed={navCollapsed}
          aria-label={navCollapsed ? 'Expand navigation menu' : 'Collapse navigation menu'}
        >
          {navCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>

        <div className="workspace-nav-scroll">
          <nav className="workspace-menu" aria-label="Primary">
            <div className="workspace-menu-divider" />
            <div className="workspace-menu-items">
              {workspaceNav.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    end={item.to === '/'}
                  >
                    <span className="nav-icon">
                      <Icon size={16} />
                    </span>
                    <span className="nav-label">{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          </nav>
        </div>

        <div className="workspace-profile">
          <button
            type="button"
            className="profile-trigger"
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            <div className="workspace-avatar small">RA</div>
            <div className="profile-copy">
              <strong>Rena Alvarez</strong>
              <span>Operations Lead</span>
            </div>
            <ChevronDown size={16} />
          </button>
          {profileOpen ? (
            <div className="profile-menu" role="menu" aria-label="User menu">
              <button type="button" role="menuitem">
                View profile
              </button>
              <button type="button" role="menuitem" onClick={() => navigate('/settings')}>
                Account settings
              </button>
              <button type="button" role="menuitem">
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : null}
        </div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <div>
            <span className="chip chip-live">Platform health • Stable</span>
            <h2>{activeTitle}</h2>
          </div>
          <div className="workspace-actions">
            <div className="workspace-search">
              <input type="search" placeholder="Search incidents, knowledge, runbooks..." />
              <span>⌘K</span>
            </div>
            <button className="ghost-btn">Event bridge</button>
          </div>
        </header>

        <main className="workspace-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default WorkspaceLayout

