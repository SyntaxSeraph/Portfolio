import './About.css'

const stats = [
  { value: '3rd', label: 'Year B.Tech' },
  { value: '5+', label: 'Projects Built' },
  { value: '3+', label: 'Languages' },
  { value: '∞', label: 'Curiosity' },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-tag reveal d1">// About Me</div>
        <div className="about-grid">
          {/* Left: 3D card */}
          <div className="about-card-wrap reveal-left d2">
            <div className="about-3d-card">
              <div className="card-glow" />
              <div className="card-corner tl" />
              <div className="card-corner tr" />
              <div className="card-corner bl" />
              <div className="card-corner br" />
              <div className="about-card-content">
                <div className="card-avatar">
                  <div className="ca-initials">SH</div>
                  <div className="ca-ring" />
                </div>
                <h3 className="card-name">Sohan Hazra</h3>
                <p className="card-sub">Computer Science Engineer</p>
                <div className="card-edu">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  B.Tech CSE · VIT Vellore
                </div>
                <div className="card-tags">
                  <span className="ctag">Web Dev</span>
                  <span className="ctag">Full Stack</span>
                  <span className="ctag">Problem Solver</span>
                </div>
              </div>
              <div className="scan-line" />
            </div>

            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className={`stat-item reveal d${i + 2}`}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio */}
          <div className="about-bio">
            <h2 className="section-title reveal d2">
              Who Am <span className="gradient-text">I?</span>
            </h2>
            <p className="bio-text reveal d3">
              I'm a passionate <strong>Computer Science student in my 3rd year at VIT Vellore</strong>, with a deep love for building things that live on the internet. I thrive at the intersection of creativity and logic — turning ideas into polished, functional web experiences.
            </p>
            <p className="bio-text reveal d4">
              My journey in tech is driven by an insatiable curiosity and a desire to craft innovative, efficient solutions. Whether it's architecting full-stack applications or fine-tuning user interfaces, I bring precision and passion to every line of code.
            </p>

            <div className="about-highlights reveal d5">
              <div className="highlight-item">
                <div className="hi-icon">🎓</div>
                <div>
                  <div className="hi-title">Education</div>
                  <div className="hi-sub">B.Tech Computer Science · VIT Vellore · 3rd Year</div>
                </div>
              </div>
              <div className="highlight-item">
                <div className="hi-icon">⚡</div>
                <div>
                  <div className="hi-title">Quick Learner</div>
                  <div className="hi-sub">Adapts fast to new technologies and frameworks</div>
                </div>
              </div>
              <div className="highlight-item">
                <div className="hi-icon">🔧</div>
                <div>
                  <div className="hi-title">Strong Foundation</div>
                  <div className="hi-sub">Solid grasp of programming principles & CS fundamentals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
