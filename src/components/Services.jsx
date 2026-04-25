import './Services.css'

const services = [
  {
    icon: '🖥️',
    title: 'Frontend Development',
    desc: 'Building responsive, pixel-perfect user interfaces with React, HTML, CSS, and modern web technologies.',
    tags: ['React', 'HTML5', 'CSS3', 'Responsive'],
    color: '#00f5d4',
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    desc: 'Architecting robust server-side logic, REST APIs, and database systems for scalable applications.',
    tags: ['Node.js', 'REST API', 'SQL', 'Python'],
    color: '#7c3aed',
  },
  {
    icon: '🚀',
    title: 'Full Stack Applications',
    desc: 'Developing end-to-end web applications from database design to deployment — complete ownership of the stack.',
    tags: ['Full Stack', 'Web App', 'Integration'],
    color: '#f97316',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Crafting intuitive, visually appealing user experiences that balance aesthetics with usability.',
    tags: ['UI Design', 'Figma', 'UX Flow'],
    color: '#ec4899',
  },
]

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-center">
          <div className="section-tag reveal">// Services</div>
          <h2 className="section-title reveal d2">
            What <span className="gradient-text">I Do</span>
          </h2>
          <p className="section-sub reveal d3">
            From concept to deployment — I've got the full stack covered
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={s.title} className={`service-card reveal d${i + 1}`} style={{ '--sc': s.color }}>
              <div className="service-top">
                <div className="service-icon-wrap">
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-icon-bg" />
                </div>
                <div className="service-number">0{i + 1}</div>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map(t => (
                  <span key={t} className="stag">{t}</span>
                ))}
              </div>
              <div className="service-line" />
              <div className="service-hover-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
