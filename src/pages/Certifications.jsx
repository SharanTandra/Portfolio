import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SkillSphere from '../components/SkillSphere';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'Python', 'C', 'JavaScript', 'SQL'],
    color: '#38bdf8',
  },
  {
    title: 'Front-End',
    skills: ['React.js', 'HTML', 'CSS', 'JavaScript'],
    color: '#818cf8',
  },
  {
    title: 'Back-End & DB',
    skills: ['Flask', 'Node.js', 'MySQL', 'MongoDB', 'Oracle SQL'],
    color: '#c084fc',
  },
  {
    title: 'Tools & Others',
    skills: ['Git', 'GitHub', 'VS Code', 'Pandas', 'Scikit-learn'],
    color: '#2dd4bf',
  },
];

const certifications = [
  {
    title: 'SQL Certification',
    issuer: 'Database Fundamentals',
    description: 'Comprehensive SQL querying, database design, and optimization techniques.',
  },
  {
    title: 'SkillUp Courses',
    issuer: 'Online Platform',
    description: 'Completed multiple courses covering programming concepts and software development.',
  },
  {
    title: 'GeeksforGeeks Certifications',
    issuer: 'GeeksforGeeks',
    description: 'Data structures, algorithms, and competitive programming certifications.',
  },
];

function Certifications() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <section className="section">

        {/* Header */}
        <AnimatedSection>
          <div className="section-header">
            <h1>
              Skills & <span className="gradient-text">Certifications</span>
            </h1>
            <div className="section-divider" />
            <p>Technologies I work with and certifications I've earned.</p>
          </div>
        </AnimatedSection>

        {/* 3D Skill Sphere */}
        <AnimatedSection delay={0.1}>
          <div
            className="glass-card"
            style={{
              padding: '20px',
              marginBottom: '64px',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <SkillSphere />
            <p style={{
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginTop: '8px',
            }}>
              ↑ Interactive 3D skill cloud — hover and explore
            </p>
          </div>
        </AnimatedSection>

        {/* Skill Categories */}
        <AnimatedSection delay={0.1}>
          <h2 style={{ marginBottom: '32px' }}>
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </AnimatedSection>

        <div className="grid-2" style={{ marginBottom: '80px' }}>
          {skillCategories.map((category, i) => (
            <AnimatedSection key={category.title} delay={0.1 * (i + 1)}>
              <div
                className="glass-card"
                style={{ padding: '28px 32px' }}
              >
                <h3 style={{
                  marginBottom: '16px',
                  color: category.color,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}>
                  {category.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="skill-tag"
                      whileHover={{ scale: 1.05, y: -2 }}
                      style={{
                        borderColor: `${category.color}33`,
                        color: category.color,
                        background: `${category.color}10`,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Animated skill bar */}
                <div style={{
                  marginTop: '20px',
                  height: '3px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${75 + i * 5}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Certifications */}
        <AnimatedSection delay={0.1}>
          <h2 style={{ marginBottom: '32px' }}>
            <span className="gradient-text">Certifications</span>
          </h2>
        </AnimatedSection>

        <div className="grid-3">
          {certifications.map((cert, i) => (
            <AnimatedSection key={cert.title} delay={0.1 * (i + 1)}>
              <motion.div
                className="glass-card"
                style={{ padding: '28px 32px', height: '100%' }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Badge icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  fontSize: '1.5rem',
                }}>
                  🏆
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  marginBottom: '4px',
                  color: 'var(--text-primary)',
                }}>
                  {cert.title}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--accent-cyan)',
                  marginBottom: '12px',
                  fontWeight: 500,
                }}>
                  {cert.issuer}
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {cert.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

      </section>
    </div>
  );
}

export default Certifications;