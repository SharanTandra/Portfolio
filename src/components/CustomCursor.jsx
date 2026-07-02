import { useEffect, useRef, useState } from 'react';

function CustomCursor() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let mouse = { x: -1000, y: -1000, radius: 180 };
    
    // Create dots scattered across the whole screen
    const numDots = Math.floor((window.innerWidth * window.innerHeight) / 12000); // Responsive amount of dots
    const dots = Array.from({ length: numDots }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.8, // Slow drift velocity
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      color: `hsla(${190 + Math.random() * 80}, 90%, 65%, ${Math.random() * 0.5 + 0.3})`
    }));

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach((dot, index) => {
        // Continuous slow drift
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Seamless wrap-around edges (better than bouncing for oceans of dots)
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        // Interactive mouse repel (creating a wave/splash effect as you move through them)
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          // Easing function for smooth repulsion
          const force = (mouse.radius - distance) / mouse.radius; 
          
          // Push dots away from the cursor
          dot.x -= forceDirectionX * force * 5;
          dot.y -= forceDirectionY * force * 5;
        }

        // Draw connecting lines between nearby dots to create a network effect
        for (let j = index + 1; j < dots.length; j++) {
          const otherDot = dots[j];
          const dx2 = dot.x - otherDot.x;
          const dy2 = dot.y - otherDot.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            // Opacity fades smoothly based on distance
            const opacity = (1 - dist2 / 120) * 0.25; 
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw the dot itself
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        
        ctx.shadowBlur = 6;
        ctx.shadowColor = dot.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
      {/* Inner sharp dot */}
      <div 
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#38bdf8',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate3d(-1000px, -1000px, 0) translate(-50%, -50%)',
          boxShadow: '0 0 10px #38bdf8',
        }}
      />
    </>
  );
}

export default CustomCursor;
