import { useState } from 'react'
import '../App.css'
import Pagination from '../components/Pagination'

const requestQueues = [
  {
    label: 'Awaiting approval',
    count: 48,
    detail: 'Average turnaround 1h 12m',
  },
  {
    label: 'Needs fulfillment',
    count: 137,
    detail: '24 ready for automation',
  },
  {
    label: 'Pending customer input',
    count: 32,
    detail: 'Auto-reminders activated',
  },
]

const requests = [
  {
    id: 'REQ004512',
    requester: 'Roshan Iyer',
    type: 'Access • Finance analytics workspace',
    status: 'Awaiting approval',
    owner: 'Finance IT',
    due: 'Today 14:00',
  },
  {
    id: 'REQ004498',
    requester: 'Leah Gonzalez',
    type: 'Hardware • MacBook Pro replacement',
    status: 'Needs fulfillment',
    owner: 'Endpoint services',
    due: 'Tomorrow',
  },
  {
    id: 'REQ004471',
    requester: 'Bloom Labs',
    type: 'Service • Production sandbox refresh',
    status: 'Scheduled',
    owner: 'Customer success',
    due: 'Fri 10:00',
  },
  {
    id: 'REQ004467',
    requester: 'Naomi Clarke',
    type: 'Workflow • Marketing automation rights',
    status: 'Pending customer input',
    owner: 'Marketing ops',
    due: 'In 2 days',
  },
]

const REQUESTS_PAGE_SIZE = 5

function RequestsPage() {
  const [page, setPage] = useState(1)

  const pageCount = Math.ceil(requests.length / REQUESTS_PAGE_SIZE) || 1
  const visibleRequests = requests.slice(
    (page - 1) * REQUESTS_PAGE_SIZE,
    page * REQUESTS_PAGE_SIZE,
  )

  return (
    <div className="workspace-section">
      <header className="section-header">
        <div>
          <h3>Service request hub</h3>
          <p>Blend approvals, fulfillment, and automation triggers across every channel.</p>
        </div>
        <div className="section-actions">
          <button className="ghost-btn">Catalog designer</button>
          <button className="primary-btn">Create request</button>
        </div>
      </header>

      <div className="panel">
        <div className="queue-list compact">
          {requestQueues.map((queue) => (
            <article key={queue.label} className="queue-card">
              <h4>{queue.label}</h4>
              <div className="queue-count">{queue.count}</div>
              <p>{queue.detail}</p>
              <button className="ghost-btn">Open queue</button>
            </article>
          ))}
        </div>
      </div>

      <section className="panel">
        <div className="table">
          <div className="table-head">
            <span>ID</span>
            <span>Requester</span>
            <span>Request type</span>
            <span>Status</span>
            <span>Assignment group</span>
            <span>Due</span>
          </div>
          {visibleRequests.map((request) => (
            <div key={request.id} className="table-row">
              <span className="mono">{request.id}</span>
              <span>{request.requester}</span>
              <span>{request.type}</span>
              <span>{request.status}</span>
              <span>{request.owner}</span>
              <span>{request.due}</span>
            </div>
          ))}
        </div>
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} pageSize={REQUESTS_PAGE_SIZE} />
      </section>
    </div>
  )
}

export default RequestsPage

