import { useState } from 'react'
import '../App.css'
import Pagination from '../components/Pagination'

const queueMetrics = [
  {
    label: 'Open incidents',
    value: '312',
    delta: '+14%',
    tone: 'negative',
    detail: 'vs. last 7 hours',
  },
  {
    label: 'Breaching SLAs',
    value: '18',
    delta: '+3',
    tone: 'negative',
    detail: 'target &lt; 5',
  },
  {
    label: 'Auto-resolved',
    value: '57%',
    delta: '+9pp',
    tone: 'positive',
    detail: 'Nova copilots coverage',
  },
  {
    label: 'Customer sentiment',
    value: '4.6',
    delta: '+0.3',
    tone: 'positive',
    detail: 'rolling CSAT',
  },
]

const majorIncidents = [
  {
    id: 'INC001873',
    summary: 'Checkout webhooks timing out across EU region',
    priority: 'P1',
    squad: 'Digital Commerce',
    sla: '14m to breach',
  },
  {
    id: 'INC001874',
    summary: 'Voice IVR stuck routing inbound calls to overflow',
    priority: 'P0',
    squad: 'Contact Center Ops',
    sla: 'War room live',
  },
  {
    id: 'INC001850',
    summary: 'Reporting exports delayed due to batch backlog',
    priority: 'P2',
    squad: 'Data Platform',
    sla: 'On track',
  },
]

const queueAssignments = [
  {
    name: 'My squad queue',
    count: 32,
    aging: '12 breaching soon',
    trend: '+4 today',
  },
  {
    name: 'VIP customers',
    count: 11,
    aging: 'next breach in 28m',
    trend: 'holding steady',
  },
  {
    name: 'Field services',
    count: 47,
    aging: '8 awaiting dispatch',
    trend: 'requires eyes',
  },
]

const knowledgeSignals = [
  {
    id: 'KB-2045',
    title: 'Restart protocol for webhook orchestrators',
    intent: 'impacted 19 incidents today',
  },
  {
    id: 'KB-1881',
    title: 'IVR call overflow ruleset',
    intent: 'suggested 12 times in the last hour',
  },
  {
    id: 'Runbook-67',
    title: 'Batch rendering backlog routine',
    intent: 'recommended by automation center',
  },
]

const changeCalendar = [
  {
    time: '10:30',
    name: 'Deploy: Customer portal 2025.11',
    risk: 'Medium risk',
    owner: 'Experience Platform',
  },
  {
    time: '13:00',
    name: 'Patch: EU webhook brokers',
    risk: 'High risk',
    owner: 'Integration Mesh',
  },
  {
    time: '16:45',
    name: 'Rollback rehearsal: Incident playbook',
    risk: 'Low risk',
    owner: 'Pulse Ops',
  },
]

const agentActivity = [
  {
    time: '09:42',
    agent: 'Sasha Ortega',
    action: 'closed INC001821 via knowledge automation',
  },
  {
    time: '09:18',
    agent: 'Kaito Mori',
    action: 'updated SLA policy for VIP queue',
  },
  {
    time: '08:55',
    agent: 'Rena Alvarez',
    action: 'escalated change CHG000912 to emergency board',
  },
  {
    time: '08:31',
    agent: 'Jude Mbaye',
    action: 'enabled proactive alert for webhook latency',
  },
]

const INCIDENT_PAGE_SIZE = 3

function HomePage() {
  const [incidentPage, setIncidentPage] = useState(1)
  const incidentPageCount = Math.ceil(majorIncidents.length / INCIDENT_PAGE_SIZE)
  const visibleIncidents = majorIncidents.slice(
    (incidentPage - 1) * INCIDENT_PAGE_SIZE,
    incidentPage * INCIDENT_PAGE_SIZE,
  )

  return (
    <div className="workspace-dashboard">
      <section className="workspace-metrics">
        {queueMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <header>
              <span>{metric.label}</span>
              <span className={`metric-delta ${metric.tone}`}>{metric.delta}</span>
            </header>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <header>
            <h3>Major incidents</h3>
            <button className="ghost-btn">Launch war room</button>
          </header>
          <div className="table">
            <div className="table-head">
              <span>ID</span>
              <span>Summary</span>
              <span>Priority</span>
              <span>Squad</span>
              <span>SLA</span>
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
                <span>{incident.squad}</span>
                <span>{incident.sla}</span>
              </div>
            ))}
          </div>
          <Pagination
            page={incidentPage}
            pageCount={incidentPageCount}
            onPageChange={setIncidentPage}
            pageSize={INCIDENT_PAGE_SIZE}
          />
        </section>

        <section className="panel">
          <header>
            <h3>Queue watch</h3>
            <button className="ghost-btn">View routing rules</button>
          </header>
          <div className="queue-list">
            {queueAssignments.map((queue) => (
              <article key={queue.name} className="queue-card">
                <h4>{queue.name}</h4>
                <div className="queue-count">{queue.count}</div>
                <p>{queue.aging}</p>
                <span>{queue.trend}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <header>
            <h3>Knowledge & runbooks</h3>
            <button className="ghost-btn">Manage knowledge</button>
          </header>
          <div className="knowledge-list">
            {knowledgeSignals.map((article) => (
              <article key={article.id}>
                <span className="mono">{article.id}</span>
                <h4>{article.title}</h4>
                <p>{article.intent}</p>
                <button className="secondary-btn">Preview</button>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <header>
            <h3>Change calendar</h3>
            <button className="ghost-btn">Open CAB board</button>
          </header>
          <div className="timeline">
            {changeCalendar.map((item) => (
              <div key={item.name} className="timeline-item">
                <span className="timeline-time">{item.time}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.owner}</p>
                </div>
                <span className={`pill risk-${item.risk.split(' ')[0].toLowerCase()}`}>
                  {item.risk}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <header>
            <h3>Agent activity</h3>
            <button className="ghost-btn">See full audit</button>
          </header>
          <ul className="activity-feed">
            {agentActivity.map((event) => (
              <li key={event.agent + event.time}>
                <span className="timeline-time">{event.time}</span>
                <div>
                  <strong>{event.agent}</strong>
                  <p>{event.action}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default HomePage

