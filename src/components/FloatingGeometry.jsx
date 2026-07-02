import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';

function GeometryShape({ geometry = 'icosahedron', position = [0, 0, 0], color = '#38bdf8', size = 1, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15 * speed;
      meshRef.current.rotation.z = time * 0.1 * speed;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'torus':
        return <torusGeometry args={[size, size * 0.35, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[size]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[size * 0.7, size * 0.2, 64, 16]} />;
      case 'icosahedron':
      default:
        return <icosahedronGeometry args={[size, 0]} />;
    }
  };

  return (
    <Float
      speed={speed * 2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default GeometryShape;
