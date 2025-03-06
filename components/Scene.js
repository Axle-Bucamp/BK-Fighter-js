import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { BurgerCharacter } from './BurgerCharacter';
import { JeanCharacter } from './JeanCharacter';

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#4a9" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="sunset" />
        
        <BurgerCharacter position={[-3, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <JeanCharacter position={[3, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
        
        <Floor />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}