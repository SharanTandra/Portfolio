import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function Card1({ title, description, icon, delay = 0 }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX((y - centerY) / 15);
    setRotateY((centerX - x) / 15);
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: '32px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-card)',
          transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border-hover)';
          e.currentTarget.style.boxShadow = 'var(--shadow-card), var(--glow-soft)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        }}
      >
        {/* Glow follower */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0, 212, 255, 0.08) 0%, transparent 60%)`,
            pointerEvents: 'none',
            transition: 'background 0.1s ease',
          }}
        />

        {/* Icon */}
        {icon && (
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '1.5rem',
            }}
          >
            {icon}
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            marginBottom: '12px',
            color: 'var(--text-primary)',
            transform: 'translateZ(20px)',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            transform: 'translateZ(10px)',
          }}
        >
          {description}
        </p>

        {/* Bottom gradient line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '20%',
            right: '20%',
            height: '2px',
            background: 'var(--gradient-accent)',
            borderRadius: 'var(--radius-full)',
            opacity: 0.5,
          }}
        />
      </div>
    </motion.div>
  );
}

export default Card1;