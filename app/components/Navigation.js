'use client'

import { useEffect, useState } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <nav className={isScrolled ? 'scrolled' : ''} id="navbar">
      <div className="nav-container">
        <div className="logo">Synexis Technologies</div>
        <ul className="nav-links">
          <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a></li>
          <li><a href="#solutions" onClick={(e) => handleNavClick(e, '#solutions')}>Solutions</a></li>
          <li><a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')}>Portfolio</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta" onClick={(e) => handleNavClick(e, '#contact')}>Get Started</a>
      </div>
    </nav>
  )
}
