import './Skills.css'

const skills = [
  { name: 'Full Stack Web Dev', level: 85, icon: '🌐', color: '#00f5d4' },
  { name: 'JavaScript', level: 82, icon: '⚡', color: '#f7df1e' },
  { name: 'React.js', level: 80, icon: '⚛️', color: '#61dafb' },
  { name: 'Python', level: 78, icon: '🐍', color: '#3776ab' },
  { name: 'Java', level: 75, icon: '☕', color: '#f89820' },
  { name: 'C Language', level: 72, icon: '🔵', color: '#a8b9cc' },
  { name: 'Node.js', level: 70, icon: '🟢', color: '#339933' },
  { name: 'SQL / Databases', level: 68, icon: '🗄️', color: '#f97316' },
  { name: 'HTML / CSS', level: 90, icon: '🎨', color: '#e34f26' },
  { name: 'Git / GitHub', level: 76, icon: '🐙', color: '#a78bfa' },
  { name: 'REST APIs', level: 74, icon: '🔗', color: '#06b6d4' },
  { name: 'Problem Solving', level: 88, icon: '🧠', color: '#ec4899' },
]

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-orb" />
      <div className="container">
        <div className="section-center">
          <div className="section-tag reveal">// Skills</div>
          <h2 className="section-title reveal d2">
            My <span className="gradient-text">Technical</span> Arsenal
          </h2>
          <p className="section-sub reveal d3">
            Technologies I use to build, solve, and create
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div key={skill.name} className={`skill-card reveal d${(i % 6) + 1}`}>
              <div className="skill-icon" style={{ '--scolor': skill.color }}>{skill.icon}</div>
              <div className="skill-info">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-pct" style={{ color: skill.color }}>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ '--w': `${skill.level}%`, '--c': skill.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
