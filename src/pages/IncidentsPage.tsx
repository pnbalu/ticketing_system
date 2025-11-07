import { useState } from 'react'
import '../App.css'
import Pagination from '../components/Pagination'

const priorityFilters = ['All', 'P0', 'P1', 'P2', 'Awaiting info'] as const

type PriorityValue = (typeof priorityFilters)[number]

const incidents = [
  {
    id: 'INC001874',
    summary: 'Voice IVR stuck routing inbound calls to overflow',
    priority: 'P0',
    status: 'In progress',
    owner: 'Contact Center Ops',
    updated: '4m ago',
  },
  {
    id: 'INC001873',
    summary: 'Checkout webhooks timing out across EU region',
    priority: 'P1',
    status: 'War room live',
    owner: 'Digital Commerce',
    updated: '9m ago',
  },
  {
    id: 'INC001850',
    summary: 'Reporting exports delayed due to batch backlog',
    priority: 'P2',
    status: 'Awaiting vendor',
    owner: 'Data Platform',
    updated: '23m ago',
  },
  {
    id: 'INC001842',
    summary: 'Device enrollment failing for APAC field engineers',
    priority: 'P1',
    status: 'Triage',
    owner: 'Endpoint Services',
    updated: '41m ago',
  },
]

const backlogStats = [
  { label: 'Open', value: 312 },
  { label: 'Within SLA', value: '82%' },
  { label: 'Automation coverage', value: '57%' },
  { label: 'Major incidents', value: 3 },
]

const INCIDENTS_PAGE_SIZE = 5

function IncidentsPage() {
  const [priority, setPriority] = useState<PriorityValue>('All')
  const [page, setPage] = useState(1)

  const filteredIncidents = incidents.filter((incident) => {
    if (priority === 'All') {
      return true
    }
    if (priority === 'Awaiting info') {
      return incident.status.toLowerCase().includes('awaiting')
    }
    return incident.priority === priority
  })

  const pageCount = Math.ceil(filteredIncidents.length / INCIDENTS_PAGE_SIZE) || 1
  const visibleIncidents = filteredIncidents.slice(
    (page - 1) * INCIDENTS_PAGE_SIZE,
    page * INCIDENTS_PAGE_SIZE,
  )

  const handlePriorityClick = (filter: PriorityValue) => {
    setPriority(filter)
    setPage(1)
  }

  return (
    <div className="workspace-section">
      <header className="section-header">
        <div>
          <h3>Incident command center</h3>
          <p>Track major disruptions, squad ownership, and SLA risk in one place.</p>
        </div>
        <div className="section-actions">
          <button className="ghost-btn">Incident policies</button>
          <button className="primary-btn">New incident</button>
        </div>
      </header>

      <div className="section-filters">
        <div className="chip-row ghost">
          {priorityFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={filter === priority ? 'active' : ''}
              onClick={() => handlePriorityClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="workspace-search inline">
          <input type="search" placeholder="Find incident or customer..." />
          <span>⌘F</span>
        </div>
      </div>

      <section className="panel">
        <div className="table">
          <div className="table-head">
            <span>ID</span>
            <span>Summary</span>
            <span>Priority</span>
            <span>Status</span>
            <span>Squad owner</span>
            <span>Last update</span>
          </div>
          {visibleIncidents.map((incident) => (
            <div key={incident.id} className="table-row">
              <span className="mono">{incident.id}</span>
              <span>{incident.summary}</span>
              <span>
                <span className={`pill priority-${incident.priority.toLowerCase()}`}>
                  {incident.priority}
                </span>
              </span>
              <span>{incident.status}</span>
              <span>{incident.owner}</span>
              <span>{incident.updated}</span>
            </div>
          ))}
        </div>
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} pageSize={INCIDENTS_PAGE_SIZE} />
      </section>

      <section className="panel">
        <header>
          <h4>Backlog health</h4>
          <button className="ghost-btn">Automation insights</button>
        </header>
        <div className="stat-grid">
          {backlogStats.map((stat) => (
            <article key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default IncidentsPage

