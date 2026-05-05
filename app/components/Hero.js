export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-gradient gradient-1"></div>
        <div className="hero-gradient gradient-2"></div>
        <div className="grid-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-tag">Enterprise Intelligence Solutions</div>
          <h1>
            Engineering the Future of<br />
            <span className="gradient-text">Digital Enterprise</span>
          </h1>
          <p className="hero-description">
            We deliver scalable software, intelligent automation, and data-driven transformation for global enterprises seeking technical excellence at scale.
          </p>
          <div className="hero-buttons">
            <a href="#services" className="btn-primary">
              Explore Services
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#portfolio" className="btn-secondary">View Case Studies</a>
          </div>
        </div>
      </div>
    </section>
  )
}
