import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import GeometryShape from '../components/FloatingGeometry';
import AnimatedSection from '../components/AnimatedSection';

function Home() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      {/* Hero Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 3D Geometry Accents */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ background: 'transparent' }}>
            <ambientLight intensity={0.5} />
            <GeometryShape geometry="icosahedron" position={[-5, 2, 0]} color="#38bdf8" size={1.2} speed={0.8} />
            <GeometryShape geometry="torus" position={[5, -2, -2]} color="#818cf8" size={1} speed={1.2} />
            <GeometryShape geometry="octahedron" position={[4, 3, -3]} color="#c084fc" size={0.8} speed={0.6} />
            <GeometryShape geometry="dodecahedron" position={[-4, -3, -1]} color="#2dd4bf" size={0.7} speed={1} />
          </Canvas>
        </div>

        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '48px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Row: Image + Text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '64px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>

            {/* Profile Image */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="profile-image-wrapper">
                <img
                  src="/profile.jpg"
                  alt="Sharan Tandra"
                  className="profile-image"
                />
              </div>
            </AnimatedSection>

            {/* Text Content */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <AnimatedSection delay={0.1}>
                <motion.p
                  style={{
                    color: 'var(--accent-cyan)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Hello, I'm
                </motion.p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h1 style={{ marginBottom: '8px' }}>
                  <span className="gradient-text">Sharan Tandra</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <h2 style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontWeight: 400,
                  color: 'var(--text-secondary)',
                  marginBottom: '24px',
                }}>
                  Full-Stack Developer &amp; CS Student
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  color: 'var(--text-secondary)',
                }}>
                  I am a final-year Computer Science student at Sreyas Institute
                  of Engineering and Technology. Passionate about Full-Stack
                  Development, Data Structures &amp; Algorithms, and building
                  real-world software solutions.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.5}>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  marginBottom: '32px',
                  color: 'var(--text-secondary)',
                }}>
                  My primary skills include Java, Python, React.js, Flask,
                  MySQL, MongoDB, Git, and GitHub.
                </p>
              </AnimatedSection>

              {/* CTA Buttons */}
              <AnimatedSection delay={0.6}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <motion.a
                    href="/portfolio"
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                    View Portfolio
                  </motion.a>
                  <motion.a
                    href="/contact"
                    className="btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Contact Me
                  </motion.a>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Stats Row */}
          <AnimatedSection delay={0.7}>
            <div
              className="glass-card"
              style={{
                display: 'flex',
                gap: '0',
                padding: '0',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {[
                { number: '10+', label: 'Projects Built' },
                { number: '5+', label: 'Technologies' },
                { number: '3+', label: 'Certifications' },
                { number: '500+', label: 'LeetCode Problems' },
              ].map((stat, i) => (
                <div key={i} className="stat-item" style={{
                  padding: '24px 40px',
                  borderRight: i < 3 ? '1px solid var(--glass-border)' : 'none',
                }}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll</span>
          <div className="scroll-indicator-line" />
        </motion.div>
      </section>
    </div>
  );
}

export default Home;