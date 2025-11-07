import '../App.css'

const knowledgeStats = [
  { label: 'Articles', value: 842 },
  { label: 'AI drafted this week', value: 68 },
  { label: 'Adoption', value: '76%' },
  { label: 'Feedback score', value: '4.7' },
]

const suggestedArticles = [
  {
    id: 'KB-2031',
    title: 'Resetting webhook orchestrators after timeouts',
    audience: 'Support engineers',
    signal: 'Triggered by 19 incidents',
  },
  {
    id: 'KB-2027',
    title: 'IVR overflow troubleshooting flowchart',
    audience: 'Contact center agents',
    signal: '12 thumbs-up today',
  },
  {
    id: 'KB-1998',
    title: 'Field device enrollment checklist',
    audience: 'Field services',
    signal: 'Top search this week',
  },
]

const feedback = [
  {
    agent: 'Sasha Ortega',
    note: 'Add more detail on API token rotation steps.',
    article: 'KB-2031',
    time: '12m ago',
  },
  {
    agent: 'Jude Mbaye',
    note: 'Link to the new IVR overflow policy please.',
    article: 'KB-2027',
    time: '34m ago',
  },
  {
    agent: 'Leah Gonzalez',
    note: 'Great checklist—maybe embed the provisioning video?',
    article: 'KB-1998',
    time: '1h ago',
  },
]

function KnowledgePage() {
  return (
    <div className="workspace-section">
      <header className="section-header">
        <div>
          <h3>Knowledge experience</h3>
          <p>Curate the content your agents need for first-touch resolution.</p>
        </div>
        <div className="section-actions">
          <button className="ghost-btn">Training insights</button>
          <button className="primary-btn">New article</button>
        </div>
      </header>

      <section className="panel">
        <div className="stat-grid">
          {knowledgeStats.map((stat) => (
            <article key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <div className="workspace-grid two-col">
        <section className="panel">
          <header>
            <h4>Recommended for publish</h4>
            <button className="ghost-btn">Review drafts</button>
          </header>
          <div className="knowledge-list dense">
            {suggestedArticles.map((article) => (
              <article key={article.id}>
                <span className="mono">{article.id}</span>
                <h4>{article.title}</h4>
                <p>{article.signal}</p>
                <span>{article.audience}</span>
                <div className="knowledge-actions">
                  <button className="primary-btn">Approve</button>
                  <button className="ghost-btn">Edit</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <header>
            <h4>Feedback loop</h4>
            <button className="ghost-btn">Open backlog</button>
          </header>
          <ul className="activity-feed">
            {feedback.map((item) => (
              <li key={item.agent + item.article}>
                <span className="timeline-time">{item.time}</span>
                <div>
                  <strong>{item.agent}</strong>
                  <p>{item.note}</p>
                  <span className="mono">{item.article}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default KnowledgePage

