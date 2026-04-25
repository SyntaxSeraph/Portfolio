import './Projects.css'

const projects = [
  {
    title: 'Hospital Management System',
    desc: 'A full-stack platform streamlining hospital operations with separate portals for hospitals and patients. Features include hospital registration, doctor management, and real-time appointment booking with a dynamic token system to minimize wait times.',
    tags: ['Full Stack', 'Web App', 'React', 'Node.js', 'SQL'],
    color: '#00f5d4',
    accent: '#7c3aed',
    features: [
      'Hospital & Patient dual portal',
      'Real-time appointment booking',
      'Dynamic token queue system',
      'Doctor management dashboard',
    ],
    github: 'https://syntaxseraph.github.io/MediCare/',
    year: '2024',
    status: 'Completed',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-orb" />
      <div className="container">
        <div className="section-center">
          <div className="section-tag reveal">// Projects</div>
          <h2 className="section-title reveal d2">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="section-sub reveal d3">
            What I've built so far — with more coming soon
          </p>
        </div>

        <div className="projects-list">
          {projects.map((proj, i) => (
            <div key={proj.title} className="project-card reveal" style={{ '--pc': proj.color, '--pa': proj.accent }}>
              <div className="project-visual">
                <div className="pv-bg" />
                <div className="pv-grid" />
                <div className="pv-mockup">
                  <div className="mock-bar">
                    <div className="mock-dot" style={{ background: '#ff5f57' }} />
                    <div className="mock-dot" style={{ background: '#febc2e' }} />
                    <div className="mock-dot" style={{ background: '#28c840' }} />
                  </div>
                  <div className="mock-content">
                    <div className="mock-line ml-header" />
                    <div className="mock-panels">
                      <div className="mock-sidebar">
                        {[80, 60, 70, 50, 65].map((w, j) => (
                          <div key={j} className="mock-nav-item" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                      <div className="mock-main">
                        <div className="mock-card" />
                        <div className="mock-cards-row">
                          <div className="mock-card-sm" />
                          <div className="mock-card-sm" />
                          <div className="mock-card-sm" />
                        </div>
                        <div className="mock-card" style={{ height: '45px' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pv-tag">
                  <span className="status-dot" />
                  {proj.status}
                </div>
              </div>

              <div className="project-info">
                <div className="proj-meta">
                  <span className="proj-year">{proj.year}</span>
                  <div className="proj-tags">
                    {proj.tags.map(t => (
                      <span key={t} className="ptag">{t}</span>
                    ))}
                  </div>
                </div>

                <h3 className="proj-title">{proj.title}</h3>
                <p className="proj-desc">{proj.desc}</p>

                <div className="proj-features">
                  <div className="pf-label">Key Features</div>
                  <ul>
                    {proj.features.map(f => (
                      <li key={f}>
                        <span className="pf-bullet">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="proj-actions">
                  <a href={proj.github} target="_blank" rel="noreferrer" className="proj-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="more-projects reveal d3">
          <div className="mp-inner">
            <div className="mp-icon">🚧</div>
            <div>
              <div className="mp-title">More Projects Coming Soon</div>
              <div className="mp-sub">Currently building exciting new things...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
