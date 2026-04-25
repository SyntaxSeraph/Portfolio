import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="container footer-inner">
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">SH</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer-copy">
          © 2024 <strong>Sohan Hazra</strong>. Crafted with passion & code.
        </p>
        <div className="footer-links">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(l => (
            <button
              key={l}
              className="footer-link"
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
