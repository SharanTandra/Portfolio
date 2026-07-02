import { motion } from 'framer-motion';
import { useRef } from 'react';

function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -60 };
      case 'right':
        return { opacity: 0, x: 60 };
      case 'down':
        return { opacity: 0, y: -40 };
      case 'up':
      default:
        return { opacity: 0, y: 40 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
