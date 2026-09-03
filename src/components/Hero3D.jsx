import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, OrbitControls } from '@react-three/drei';
import { WebGLFallback } from './WebGLFallback';

// 3D Silk Ribbon Mesh with interactive mouse parallax
const SilkRibbon = ({ mousePos }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
      
      // Smooth mouse follow parallax
      meshRef.current.position.x = (mousePos.current.x * 0.8 - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y = (-mousePos.current.y * 0.5 - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[2, 0, -1]} scale={1.4}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#7B1E3A"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.85}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
};

// Organic floating accent torus ribbon
const SecondaryRibbon = ({ mousePos }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.1;
      meshRef.current.rotation.z += delta * 0.2;
      meshRef.current.position.x = (-mousePos.current.x * 0.5 - meshRef.current.position.x) * 0.03;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[-2.5, -1, -2]} scale={1.1}>
        <torusKnotGeometry args={[0.9, 0.25, 96, 24, 3, 4]} />
        <meshStandardMaterial
          color="#7B1E3A"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

export const Hero3D = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect WebGL capability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#F3E5AB" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#7B1E3A" />
        <directionalLight position={[0, 5, 5]} intensity={0.8} color="#D4AF37" />

        <Suspense fallback={null}>
          {/* Floating Gold Particles */}
          <Sparkles
            count={60}
            scale={12}
            size={3.5}
            speed={0.4}
            color="#D4AF37"
            opacity={0.8}
          />
          <Sparkles
            count={30}
            scale={10}
            size={4.5}
            speed={0.2}
            color="#FFF9F2"
            opacity={0.6}
          />

          <SilkRibbon mousePos={mousePos} />
          <SecondaryRibbon mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
};
