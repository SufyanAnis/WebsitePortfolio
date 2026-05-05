import Image from 'next/image'

const solutions = [
  {
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop',
    badge: 'AI-Powered',
    title: 'AI Calling Solution',
    description: 'Intelligent voice AI for automated customer support, sales calls, and appointment scheduling. Natural language processing with multi-language support and CRM integration.',
    features: ['Voice AI', 'NLP', 'CRM Integration', '24/7 Available']
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    badge: 'Integration',
    title: 'n8n Automation Platform',
    description: 'Self-hosted workflow automation connecting 400+ apps and services. Build complex integrations with visual workflow editor and custom JavaScript functions.',
    features: ['400+ Apps', 'Self-Hosted', 'Custom Logic', 'No-Code']
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    badge: 'Enterprise',
    title: 'Apigee API Gateway',
    description: 'Full API lifecycle management with security, analytics, developer portals, and monetization. Scalable infrastructure for mission-critical API ecosystems.',
    features: ['API Security', 'Analytics', 'Monetization', 'Developer Portal']
  }
]

export default function Solutions() {
  return (
    <section id="solutions" className="solutions-section">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-tag">Innovative Solutions</div>
          <h2>Transformative Technology</h2>
          <p className="section-description">
            Cutting-edge solutions that drive business transformation and competitive advantage.
          </p>
        </div>

        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <div key={index} className="solution-card stagger-item">
              <Image
                src={solution.image}
                alt={solution.title}
                width={800}
                height={400}
                className="solution-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
              />
              <div className="solution-content">
                <div className="solution-badge">{solution.badge}</div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <div className="solution-features">
                  {solution.features.map((feature, fIndex) => (
                    <span key={fIndex} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
