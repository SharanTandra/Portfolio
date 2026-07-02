import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  'Java', 'Python', 'C', 'JavaScript', 'React.js',
  'Flask', 'Node.js', 'MySQL', 'MongoDB', 'Git',
  'HTML', 'CSS', 'DSA', 'GitHub', 'SQL',
  'Pandas', 'Scikit-learn', 'VS Code'
];

function SkillTag({ text, position, index }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      // Gentle bobbing
      ref.current.position.y = position[1] + Math.sin(time * 0.5 + offset) * 0.15;
      // Always face camera
      ref.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Background pill */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[text.length * 0.12 + 0.4, 0.35]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.08}
        />
      </mesh>
      <Text
        fontSize={0.15}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {text}
      </Text>
    </group>
  );
}

function SphereWireframe() {
  const ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = time * 0.1;
      ref.current.rotation.x = Math.sin(time * 0.05) * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.2, 24, 24]} />
      <meshBasicMaterial
        color="#818cf8"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function SkillsCloud() {
  const groupRef = useRef();

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / skills.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const radius = 2.5;
      return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ];
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <SphereWireframe />
      {skills.map((skill, i) => (
        <SkillTag
          key={skill}
          text={skill}
          position={positions[i]}
          index={i}
        />
      ))}
    </group>
  );
}

function SkillSphere() {
  return (
    <div style={{ width: '100%', height: '450px' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <SkillsCloud />
      </Canvas>
    </div>
  );
}

export default SkillSphere;
