'use client'

import { useEffect } from 'react'

const caseStudies = [
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',
    badge: 'Compliance',
    title: 'SAP-FBR Tax Automation',
    description: 'Problem: Manual tax reporting causing delays.\nSolution: Automated SAP-FBR integration.\nImpact: Zero compliance errors.',
    metrics: [
      { value: '100%', label: 'Compliance' },
      { value: '-80%', label: 'Processing Time' }
    ]
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg',
    badge: 'DevOps',
    title: 'CI/CD Pipeline Transformation',
    description: 'Problem: Slow deployment cycles.\nSolution: Azure DevOps automation.\nImpact: 10x faster releases.',
    metrics: [
      { value: '70%', label: 'Time Saved' },
      { value: '10x', label: 'Faster Deploy' }
    ]
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
    badge: 'Analytics',
    title: 'Executive Dashboard Platform',
    description: 'Problem: No real-time visibility.\nSolution: Custom Power BI dashboards.\nImpact: Data-driven decisions.',
    metrics: [
      { value: 'Real-time', label: 'Insights' },
      { value: '40%', label: 'Better ROI' }
    ]
  }
]

export default function Portfolio() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })

    document.querySelectorAll('.reveal, .stagger-item').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-tag">Portfolio</div>
          <h2>Transformative Case Studies</h2>
          <p className="section-description">
            Real-world solutions delivering measurable impact for enterprise clients.
          </p>
        </div>

        <div className="case-studies-grid">
          {caseStudies.map((study, index) => (
            <div key={index} className="case-study stagger-item">
              <div className="case-study-image">
                <img src={study.image} alt={study.title} />
              </div>
              <div className="case-study-content">
                <div className="case-badge">{study.badge}</div>
                <h3>{study.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  {study.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < study.description.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <div className="case-metric">
                  {study.metrics.map((metric, mIndex) => (
                    <div key={mIndex} className="metric-item">
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-label">{metric.label}</div>
                    </div>
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
