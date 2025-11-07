import { BadgeCheck, BellRing, Clock3 } from 'lucide-react'
import '../App.css'

const approverTiers = [
  {
    tier: 'Tier 0',
    description: 'Automatic policies, no human approval required',
    sla: 'Instant',
    approvers: [],
  },
  {
    tier: 'Tier 1',
    description: 'Squad-level supervisors',
    sla: '30 minutes',
    approvers: [
      { name: 'Sasha Ortega', squad: 'Contact Center Ops', hours: '24/5', status: 'On call' },
      { name: 'Kaito Mori', squad: 'Digital Commerce', hours: 'Follow-the-sun', status: 'Available' },
    ],
  },
  {
    tier: 'Tier 2',
    description: 'Service managers and CAB representatives',
    sla: '2 hours',
    approvers: [
      { name: 'Rena Alvarez', squad: 'Platform Mesh', hours: '08:00 – 18:00 PDT', status: 'Available' },
      { name: 'Leah Gonzalez', squad: 'Customer Success', hours: '09:00 – 17:00 EST', status: 'In meeting' },
    ],
  },
  {
    tier: 'Tier 3',
    description: 'Executive change board escalation',
    sla: '6 hours',
    approvers: [
      { name: 'Aria Quinn', squad: 'Experience Platform', hours: 'On demand', status: 'Escalate via pager' },
    ],
  },
]

const signals = [
  { icon: <BellRing size={16} />, label: 'Real-time alerts routed via Nova Pager' },
  { icon: <BadgeCheck size={16} />, label: 'All approvals recorded with digital signature' },
  { icon: <Clock3 size={16} />, label: 'SLA breach reminders escalate automatically' },
]

function ApproversPage() {
  return (
    <div className="workspace-section">
      <header className="section-header">
        <div>
          <h3>Approver matrix</h3>
          <p>Understand who signs off on incidents, changes, and service requests.</p>
        </div>
      </header>

      <section className="panel">
        <header>
          <h4>Signals & guardrails</h4>
        </header>
        <ul className="approver-signals">
          {signals.map((item) => (
            <li key={item.label}>
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {approverTiers.map((tier) => (
        <section key={tier.tier} className="panel">
          <header>
            <div>
              <h4>{tier.tier}</h4>
              <p>{tier.description}</p>
            </div>
            <span className="pill">SLA {tier.sla}</span>
          </header>
          {tier.approvers.length === 0 ? (
            <div className="empty-state">Automation handles this lane</div>
          ) : (
            <div className="approver-grid">
              {tier.approvers.map((approver) => (
                <article key={approver.name}>
                  <strong>{approver.name}</strong>
                  <span>{approver.squad}</span>
                  <span>{approver.hours}</span>
                  <span className="pill user-pill">{approver.status}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

export default ApproversPage

