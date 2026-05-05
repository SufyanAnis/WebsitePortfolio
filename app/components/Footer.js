export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">Synexis Technologies</div>
            <p className="footer-description">
              Engineering intelligent digital and enterprise solutions for businesses seeking technical excellence and innovation at scale.
            </p>
          </div>
          <div>
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Mobile Development</a></li>
              <li><a href="#services">Enterprise Solutions</a></li>
              <li><a href="#services">Data Intelligence</a></li>
              <li><a href="#services">AI Automation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#portfolio">Case Studies</a></li>
              <li><a href="#services">Technology</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@synexis.tech">info@synexis.tech</a></li>
              <li><a href="tel:+923001234567">+92 300 1234567</a></li>
              <li>Karachi, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {year} Synexis Technologies. All rights reserved.
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/company/synexis-technologies" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">in</a>
            <a href="https://x.com/synexis_tech" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-link">𝕏</a>
            <a href="https://github.com/synexis-tech" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">gh</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
