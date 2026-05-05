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

  return (
    <nav className={isScrolled ? 'scrolled' : ''} id="navbar">
      <div className="nav-container">
        <div className="logo">Synexis Technologies</div>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#solutions">Solutions</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Get Started</a>
      </div>
    </nav>
  )
}
