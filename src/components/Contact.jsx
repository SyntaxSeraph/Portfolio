import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate send
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-orb" />
      <div className="container">
        <div className="section-center">
          <div className="section-tag reveal">// Contact</div>
          <h2 className="section-title reveal d2">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-sub reveal d3">
            Got a project in mind? Let's build something amazing together.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal-left d2">
            <h3 className="ci-title">Get In Touch</h3>
            <p className="ci-sub">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
            </p>

            <div className="contact-links">
              <a href="mailto:sohanhazra70@gmail.com" className="cl-item">
                <div className="cl-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div className="cl-label">Email</div>
                  <div className="cl-val">sohanhazra70@gmail.com</div>
                </div>
                <div className="cl-arrow">→</div>
              </a>

              <a href="https://www.linkedin.com/in/sohan-hazra2024/" target="_blank" rel="noreferrer" className="cl-item">
                <div className="cl-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div>
                  <div className="cl-label">LinkedIn</div>
                  <div className="cl-val">sohan-hazra2024</div>
                </div>
                <div className="cl-arrow">→</div>
              </a>

              <a href="https://github.com/SyntaxSeraph" target="_blank" rel="noreferrer" className="cl-item">
                <div className="cl-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </div>
                <div>
                  <div className="cl-label">GitHub</div>
                  <div className="cl-val">SyntaxSeraph</div>
                </div>
                <div className="cl-arrow">→</div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap reveal d3">
            {sent ? (
              <div className="success-msg">
                <div className="success-icon">✓</div>
                <h4>Message sent!</h4>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name" name="name" type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message" name="message"
                    rows="5"
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="form-submit">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
