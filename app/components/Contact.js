'use client'

import { useEffect, useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! We will contact you shortly.')
    setSubmitted(true)
    e.target.reset()
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-section reveal">
          <h2>Let's Build Something Intelligent</h2>
          <p>Ready to transform your enterprise with cutting-edge technology? Let's discuss your project.</p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email Address" required />
            </div>
            <input type="text" placeholder="Company Name" required />
            <textarea placeholder="Tell us about your project" required></textarea>
            <button type="submit" className="submit-btn">Start Conversation</button>
          </form>
        </div>
      </div>
    </section>
  )
}
