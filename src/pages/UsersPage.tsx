import { useState } from 'react'
import { Mail, Phone, Plus, ShieldCheck, UserPlus } from 'lucide-react'
import '../App.css'
import Pagination from '../components/Pagination'

const roles = ['Agent', 'Supervisor', 'Service Manager', 'Change Manager', 'Approver']

const initialUsers = [
  {
    id: 'USR-101',
    name: 'Sasha Ortega',
    email: 'sasha.ortega@novacloud.io',
    phone: '+1 415 555 0192',
    roles: ['Supervisor', 'Approver'],
    squad: 'Contact Center Ops',
  },
  {
    id: 'USR-108',
    name: 'Kaito Mori',
    email: 'kaito.mori@novacloud.io',
    phone: '+81 3 5550 9854',
    roles: ['Service Manager'],
    squad: 'Digital Commerce',
  },
  {
    id: 'USR-116',
    name: 'Rena Alvarez',
    email: 'rena.alvarez@novacloud.io',
    phone: '+34 91 555 9090',
    roles: ['Change Manager', 'Approver'],
    squad: 'Platform Mesh',
  },
]

const USERS_PAGE_SIZE = 5

function UsersPage() {
  const [people, setPeople] = useState(initialUsers)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    roles: ['Agent'],
    squad: '',
  })
  const [page, setPage] = useState(1)

  const pageCount = Math.ceil(people.length / USERS_PAGE_SIZE) || 1
  const visiblePeople = people.slice((page - 1) * USERS_PAGE_SIZE, page * USERS_PAGE_SIZE)

  const handleChange = (key: 'name' | 'email' | 'phone' | 'squad', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const toggleRole = (role: string) => {
    setForm((prev) => {
      const exists = prev.roles.includes(role)
      const rolesNext = exists ? prev.roles.filter((r) => r !== role) : [...prev.roles, role]
      return { ...prev, roles: rolesNext }
    })
  }

  const addUser = () => {
    if (!form.name.trim() || !form.email.trim()) {
      return
    }
    setPeople((prev) => [
      {
        id: `USR-${String(prev.length + 201).padStart(3, '0')}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        roles: form.roles,
        squad: form.squad,
      },
      ...prev,
    ])
    setForm({ name: '', email: '', phone: '', roles: ['Agent'], squad: '' })
    setPage(1)
  }

  return (
    <div className="workspace-section">
      <header className="section-header">
        <div>
          <h3>User management</h3>
          <p>Invite teammates, set their primary roles, and keep squads in sync.</p>
        </div>
        <div className="section-actions">
          <button className="ghost-btn">
            <ShieldCheck size={16} />
            Role policies
          </button>
        </div>
      </header>

      <section className="panel">
        <header>
          <h4>Add teammate</h4>
          <button className="primary-btn" type="button" onClick={addUser}>
            <Plus size={16} /> Add user
          </button>
        </header>
        <div className="user-form-grid">
          <label className="form-field">
            <span>Full name</span>
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
            />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              placeholder="user@novacloud.io"
              value={form.email}
              onChange={(event) => handleChange('email', event.target.value)}
            />
          </label>
          <label className="form-field">
            <span>Phone (optional)</span>
            <input
              type="tel"
              placeholder="+1 415 555 0192"
              value={form.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
            />
          </label>
          <label className="form-field">
            <span>Squad</span>
            <input
              type="text"
              placeholder="Team or squad"
              value={form.squad}
              onChange={(event) => handleChange('squad', event.target.value)}
            />
          </label>
        </div>
        <div className="form-field">
          <span>Assign roles</span>
          <div className="chip-row ghost">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                className={form.roles.includes(role) ? 'active' : ''}
                onClick={() => toggleRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <header>
          <h4>Directory</h4>
          <button className="ghost-btn">
            <UserPlus size={16} /> Bulk invite
          </button>
        </header>
        <div className="table table-users">
          <div className="table-head">
            <span>ID</span>
            <span>Name</span>
            <span>Contact</span>
            <span>Roles</span>
            <span>Squad</span>
          </div>
          {visiblePeople.map((person) => (
            <div key={person.id} className="table-row user-row">
              <span className="mono">{person.id}</span>
              <span>{person.name}</span>
              <span className="user-contact">
                <span>
                  <Mail size={14} /> {person.email}
                </span>
                {person.phone && (
                  <span>
                    <Phone size={14} /> {person.phone}
                  </span>
                )}
              </span>
              <span className="user-roles">
                {person.roles.map((role) => (
                  <span key={role} className="pill user-pill">
                    {role}
                  </span>
                ))}
              </span>
              <span>{person.squad || '—'}</span>
            </div>
          ))}
        </div>
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} pageSize={USERS_PAGE_SIZE} />
      </section>
    </div>
  )
}

export default UsersPage

