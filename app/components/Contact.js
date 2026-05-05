'use client'

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.elements[0].value.trim()
    const email = form.elements[1].value.trim()
    const company = form.elements[2].value.trim()
    const message = form.elements[3].value.trim()

    const subject = `New project inquiry from ${name} (${company})`
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`
    window.location.href = `mailto:info@synexis.tech?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-section reveal">
          <h2>Let&apos;s Build Something Intelligent</h2>
          <p>Ready to transform your enterprise with cutting-edge technology? Let&apos;s discuss your project.</p>

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
