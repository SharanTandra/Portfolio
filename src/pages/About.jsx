import AnimatedSection from '../components/AnimatedSection';
import Card1 from '../Card1';

function About() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <section className="section">

        {/* Section Header */}
        <AnimatedSection>
          <div className="section-header">
            <h1>
              About <span className="gradient-text">Me</span>
            </h1>
            <div className="section-divider" />
            <p>Get to know more about my education and journey.</p>
          </div>
        </AnimatedSection>

        {/* About Cards */}
        <div className="grid-2" style={{ marginBottom: '80px' }}>
          <Card1
            icon="👨‍💻"
            title="Who I Am"
            description="I am Sharan Tandra, a final-year Computer Science student passionate about Full-Stack Development, Data Structures & Algorithms, and Software Engineering. I love turning ideas into real products."
            delay={0.1}
          />
          <Card1
            icon="🎯"
            title="My Goal"
            description="To begin my career as a Software Engineer where I can contribute to meaningful products while continuing to grow technically and professionally."
            delay={0.2}
          />
        </div>

        {/* Timeline */}
        <AnimatedSection delay={0.1}>
          <h2 style={{ marginBottom: '40px' }}>
            My <span className="gradient-text">Journey</span>
          </h2>
        </AnimatedSection>

        <div className="timeline">
          {[
            {
              year: '2021 – Present',
              title: 'B.Tech Computer Science & Engineering',
              place: 'Sreyas Institute of Engineering and Technology',
              description: 'Studying core CS subjects, building projects, and competitive programming.',
            },
            {
              year: 'Certifications',
              title: 'SQL, SkillUp, GeeksforGeeks',
              place: 'Online Platforms',
              description: 'Strengthened understanding of databases, programming concepts, and software development practices.',
            },
            {
              year: 'Interests',
              title: 'Web Dev, ML, Problem Solving',
              place: 'Self-Learning',
              description: 'Continuously learning new technologies — Web Development, Database Management, Machine Learning, and Problem Solving.',
            },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={0.15 * (i + 1)} direction="left">
              <div className="timeline-item">
                <div
                  className="glass-card"
                  style={{
                    padding: '28px 32px',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 14px',
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-cyan)',
                    marginBottom: '12px',
                    fontWeight: 500,
                  }}>
                    {item.year}
                  </span>
                  <h3 style={{ marginBottom: '4px', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--accent-violet)',
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}>
                    {item.place}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </section>
    </div>
  );
}

export default About;