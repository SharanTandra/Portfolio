import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const socialLinks = [
  {
    name: 'Email',
    icon: '✉️',
    value: 'sharantandra315@gmail.com',
    href: 'mailto:sharantandra315@gmail.com',
    color: '#38bdf8',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    value: 'Sharan Tandra',
    href: 'https://www.linkedin.com/in/sharan-tandra-090250291/',
    color: '#0a66c2',
  },
  {
    name: 'GitHub',
    icon: '🐙',
    value: 'SharanTandra',
    href: 'https://github.com/SharanTandra',
    color: '#818cf8',
  },
  {
    name: 'LeetCode',
    icon: '⚡',
    value: 'sharantandra',
    href: 'https://leetcode.com/u/sharantandra/',
    color: '#f59e0b',
  },
];

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [ripple, setRipple] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    // Form submission logic would go here
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <section className="section">

        {/* Header */}
        <AnimatedSection>
          <div className="section-header">
            <h1>
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <div className="section-divider" />
            <p>Feel free to connect regarding opportunities, collaborations, or technology discussions.</p>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>

          {/* Social Links */}
          <AnimatedSection delay={0.1}>
            <div className="grid-2">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass-card"
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (i + 1) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '24px 28px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    background: `${link.color}15`,
                    border: `1px solid ${link.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}>
                    {link.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '2px',
                    }}>
                      {link.name}
                    </div>
                    <div style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}>
                      {link.value}
                    </div>
                  </div>
                  {/* Arrow */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={link.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: 'auto', opacity: 0.5 }}
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.3}>
            <div
              className="glass-card"
              style={{ padding: '40px' }}
            >
              <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
                Send a Message
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                marginBottom: '32px',
              }}>
                I'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="form-input"
                    name="message"
                    placeholder="Your message..."
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    marginTop: '8px',
                  }}
                >
                  {ripple && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        position: 'absolute',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  )}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </motion.button>
              </form>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </div>
  );
}

export default Contact;