import { useState } from 'react'
import '../App.css'
import Pagination from '../components/Pagination'

const changeStages = [
  { label: 'Draft', value: 21 },
  { label: 'Assess', value: 14 },
  { label: 'Authorize', value: 6 },
  { label: 'Implement', value: 9 },
  { label: 'Review', value: 4 },
]

const upcomingChanges = [
  {
    id: 'CHG000912',
    title: 'Rollout: API mesh 2025.11',
    window: 'Today 13:00 - 15:00',
    risk: 'High',
    owner: 'Platform mesh',
    approvals: 'CAB approved',
  },
  {
    id: 'CHG000901',
    title: 'Patch: Payments ledger hotfix',
    window: 'Tomorrow 02:00 - 03:00',
    risk: 'Medium',
    owner: 'Fintech ops',
    approvals: 'Awaiting CAB',
  },
  {
    id: 'CHG000897',
    title: 'Deploy: Service portal personalization',
    window: 'Thu 09:00 - 10:30',
    risk: 'Low',
    owner: 'Experience platform',
    approvals: 'Ready for release',
  },
]

const blastRadius = [
  { system: 'Customer portal', impact: 'High', coverage: 'Backups validated' },
  { system: 'Webhook brokers', impact: 'Medium', coverage: 'Rollback rehearsed' },
  { system: 'Analytics pipeline', impact: 'Low', coverage: 'No change this window' },
]

const BLAST_PAGE_SIZE = 4

function ChangesPage() {
  const [blastPage, setBlastPage] = useState(1)
  const blastPageCount = Math.ceil(blastRadius.length / BLAST_PAGE_SIZE) || 1
  const visibleBlastRadius = blastRadius.slice(
    (blastPage - 1) * BLAST_PAGE_SIZE,
    blastPage * BLAST_PAGE_SIZE,
  )

  return (
    <div className="workspace-section">
      <header className="section-header">
        <div>
          <h3>Change management</h3>
          <p>Coordinate release calendars, CAB approvals, and blast radius assessments.</p>
        </div>
        <div className="section-actions">
          <button className="ghost-btn">Change policies</button>
          <button className="primary-btn">Raise change</button>
        </div>
      </header>

      <section className="panel">
        <header>
          <h4>Lifecycle distribution</h4>
        </header>
        <div className="stat-grid">
          {changeStages.map((stage) => (
            <article key={stage.label}>
              <span>{stage.label}</span>
              <strong>{stage.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <header>
          <h4>Upcoming changes</h4>
          <button className="ghost-btn">Open calendar</button>
        </header>
        <div className="timeline">
          {upcomingChanges.map((change) => (
            <div key={change.id} className="timeline-item">
              <span className="timeline-time">{change.window}</span>
              <div>
                <strong>{change.title}</strong>
                <p>{change.owner}</p>
                <span className="mono">{change.id}</span>
              </div>
              <div className="timeline-meta">
                <span className={`pill risk-${change.risk.toLowerCase()}`}>
                  {change.risk} risk
                </span>
                <span>{change.approvals}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <header>
          <h4>Blast radius overview</h4>
        </header>
        <div className="table">
          <div className="table-head">
            <span>System</span>
            <span>Impact</span>
            <span>Coverage</span>
          </div>
          {visibleBlastRadius.map((item) => (
            <div key={item.system} className="table-row">
              <span>{item.system}</span>
              <span>{item.impact}</span>
              <span>{item.coverage}</span>
            </div>
          ))}
        </div>
        <Pagination
          page={blastPage}
          pageCount={blastPageCount}
          onPageChange={setBlastPage}
          pageSize={BLAST_PAGE_SIZE}
        />
      </section>
    </div>
  )
}

export default ChangesPage

