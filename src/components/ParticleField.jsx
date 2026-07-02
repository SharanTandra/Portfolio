import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleSea() {
  const meshRef = useRef();

  // Grid dimensions
  const count = 70; // 70x70 = 4900 particles
  const sep = 1.5; // Separation between particles

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * count * 3);
    const colors = new Float32Array(count * count * 3);
    
    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        // Center the grid
        positions[i] = ix * sep - ((count * sep) / 2);
        positions[i + 1] = 0; // Y is animated
        positions[i + 2] = iy * sep - ((count * sep) / 2);
        
        // Colors: Fade across the grid to match the theme (cyan to violet)
        const color = new THREE.Color();
        // Theme uses #38bdf8 (cyan) to #818cf8 (indigo) to #c084fc (purple)
        // HSL for Cyan is around 0.55, Purple is 0.75
        color.setHSL(0.55 + (ix / count) * 0.2, 0.8, 0.6); 
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        
        i += 3;
      }
    }
    return { positions, colors };
  }, [count, sep]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position.array;
      let i = 0;
      for (let ix = 0; ix < count; ix++) {
        for (let iy = 0; iy < count; iy++) {
          // Calculate complex wave height using sine waves on X and Z axes
          pos[i + 1] = (Math.sin((ix + time * 1.5) * 0.3) * 1.5) + (Math.sin((iy + time * 1.0) * 0.3) * 1.5);
          i += 3;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Slowly rotate the entire sea
      meshRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <points ref={meshRef} position={[0, -8, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingDust({ count = 300 }) {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60; // Z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.02;
      mesh.current.rotation.x = time * 0.01;
      
      // Gentle floating
      const pos = mesh.current.geometry.attributes.position.array;
      for(let i=0; i<count; i++) {
         pos[i*3+1] += Math.sin(time * 0.5 + i) * 0.005;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function ParticleField() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 5, 20], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Fog to fade out particles in the distance smoothly into the background */}
        <fog attach="fog" args={['#0f172a', 15, 45]} />
        <ParticleSea />
        <FloatingDust count={400} />
      </Canvas>
    </div>
  );
}

export default ParticleField;
