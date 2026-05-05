'use client'

import { useEffect } from 'react'

const services = [
  {
    title: 'Mobile App Development',
    description: 'iOS, Android, and cross-platform solutions engineered for performance, scalability, and seamless user experience.',
    badge: 'React Native • Flutter • Swift',
    icon: 'gradient',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  },
  {
    title: 'Website Development',
    description: 'Responsive, high-performance web applications built with modern frameworks and optimized for conversion.',
    badge: 'Next.js • React • Node.js',
    icon: 'gradient',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric design systems built in Figma that balance aesthetics with functionality for intuitive digital experiences.',
    badge: 'Figma • Adobe XD • Sketch',
    icon: 'image',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    alt: 'Figma'
  },
  {
    title: 'JIRA Implementation',
    description: 'Agile workflow automation, ITSM configuration, and custom integrations for enterprise project management.',
    badge: 'Atlassian • Confluence • Bitbucket',
    icon: 'image',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    alt: 'JIRA'
  },
  {
    title: 'Dashboarding & Analytics',
    description: 'Power BI dashboards, KPI tracking, and predictive analytics for data-driven executive decision-making.',
    badge: 'Power BI • Tableau • Looker',
    icon: 'image',
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
    alt: 'Power BI'
  },
  {
    title: 'AI Agents & Automation',
    description: 'Intelligent chatbots, workflow automation, and AI-powered assistants powered by GPT and Claude.',
    badge: 'OpenAI • Claude • LangChain',
    icon: 'gradient',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/>
      <rect x="2" y="12" width="20" height="8" rx="2"/>
      <path d="M2 12h20"/>
      <circle cx="8" cy="16" r="1" fill="currentColor"/>
      <circle cx="16" cy="16" r="1" fill="currentColor"/>
    </svg>
  },
  {
    title: 'Azure DevOps CI/CD',
    description: 'End-to-end DevOps automation, infrastructure as code, and continuous delivery pipelines.',
    badge: 'Azure • Docker • Kubernetes',
    icon: 'image',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg',
    alt: 'Azure DevOps'
  },
  {
    title: 'SAP ABAP Solutions',
    description: 'Custom SAP development, enhancements, reports, and integrations for enterprise resource planning.',
    badge: 'SAP S/4HANA • ABAP • Fiori',
    icon: 'image',
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',
    alt: 'SAP'
  },
  {
    title: 'FBR Integration with SAP',
    description: 'Automated tax compliance connecting SAP systems with Pakistan\'s FBR portal for seamless invoicing.',
    badge: 'FBR Portal • SAP • Tax Compliance',
    icon: 'image',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Emblem_of_Pakistan.svg/200px-Emblem_of_Pakistan.svg.png',
    alt: 'FBR Pakistan',
    imgStyle: { filter: 'brightness(0.9)' }
  },
  {
    title: 'n8n Workflow Automation',
    description: 'Advanced workflow automation and integration platform connecting 400+ apps, APIs, and databases.',
    badge: 'n8n • Webhooks • Custom Nodes',
    icon: 'image',
    src: 'https://avatars.githubusercontent.com/u/45487711?s=200&v=4',
    alt: 'n8n'
  },
  {
    title: 'Apigee API Management',
    description: 'Enterprise API gateway by Google Cloud with security, analytics, and monetization for scalable API ecosystems.',
    badge: 'Apigee • Google Cloud • API Gateway',
    icon: 'image',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    alt: 'Apigee'
  }
]

export default function Services() {
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
    <section id="services">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-tag">What We Do</div>
          <h2>Enterprise-Grade Solutions</h2>
          <p className="section-description">
            Comprehensive technology services spanning digital development, enterprise systems, and intelligent automation.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card stagger-item">
              <div className={`service-icon ${service.icon === 'gradient' ? 'service-icon-gradient' : ''}`} style={service.icon === 'image' ? { background: 'white' } : {}}>
                {service.icon === 'gradient' ? (
                  service.svg
                ) : (
                  <img src={service.src} alt={service.alt} style={service.imgStyle} />
                )}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="tech-badge">{service.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
