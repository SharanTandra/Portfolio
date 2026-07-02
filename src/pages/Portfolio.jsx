import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const projects = [
  {
    title: 'Placement Portal',
    description: 'Full-stack web application for managing campus placements with student management, placement tracking, and admin dashboard.',
    tech: ['Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    features: ['Student Management', 'Placement Tracking', 'Admin Dashboard', 'Data Analytics'],
    color: '#38bdf8',
    emoji: '🎓',
  },
  {
    title: 'Student Chatbot',
    description: 'AI-powered assistant for students that provides academic guidance and career support through natural language conversations.',
    tech: ['Python', 'Flask', 'NLP', 'Machine Learning'],
    features: ['Academic Guidance', 'Career Support', 'AI Conversations', 'Smart Responses'],
    color: '#818cf8',
    emoji: '🤖',
  },
  {
    title: 'Personal Portfolio',
    description: 'Modern, responsive portfolio website built with React showcasing skills, projects, certifications, and contact information.',
    tech: ['React', 'Three.js', 'CSS', 'Framer Motion'],
    features: ['3D Animations', 'Responsive Design', 'Dark Theme', 'Interactive UI'],
    color: '#2dd4bf',
    emoji: '🌐',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <AnimatedSection delay={0.15 * (index + 1)}>
      <div style={{ perspective: '1000px' }}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            padding: '36px',
            background: 'var(--glass-bg)',
            border: `1px solid ${isHovered ? project.color + '40' : 'var(--glass-border)'}`,
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(20px)',
            boxShadow: isHovered ? `var(--shadow-card), 0 0 30px ${project.color}15` : 'var(--shadow-card)',
            transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease-out, box-shadow 0.4s ease, border-color 0.4s ease',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top glow */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '10%',
            right: '10%',
            height: '100%',
            background: `radial-gradient(ellipse at center, ${project.color}08 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Project emoji + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: `${project.color}15`,
              border: `1px solid ${project.color}25`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              flexShrink: 0,
            }}>
              {project.emoji}
            </div>
            <div>
              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '2px',
              }}>
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            marginBottom: '20px',
          }}>
            {project.description}
          </p>

          {/* Features */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.features.map((feature) => (
                <span key={feature} style={{
                  padding: '4px 12px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  ✦ {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tech.map((t) => (
              <motion.span
                key={t}
                className="tech-badge"
                whileHover={{ scale: 1.1 }}
                style={{
                  borderColor: `${project.color}30`,
                  color: project.color,
                  background: `${project.color}0d`,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Bottom accent line */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
            opacity: isHovered ? 0.6 : 0.2,
            transition: 'opacity 0.4s ease',
          }} />
        </div>
      </div>
    </AnimatedSection>
  );
}

function Portfolio() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <section className="section">

        {/* Header */}
        <AnimatedSection>
          <div className="section-header">
            <h1>
              My <span className="gradient-text">Portfolio</span>
            </h1>
            <div className="section-divider" />
            <p>Projects I've built to solve real-world problems.</p>
          </div>
        </AnimatedSection>

        {/* Project Grid */}
        <div className="grid-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </section>
    </div>
  );
}

export default Portfolio;