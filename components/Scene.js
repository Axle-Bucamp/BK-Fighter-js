import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BurgerCharacter from './BurgerCharacter';
import JeanCharacter from './JeanCharacter';
import { useGameLogic } from './GameLogic';
import GameUI from './GameUI';
import AudioManager from './AudioManager';
import ParticleSystem from './ParticleSystem';
import Background from './Background';

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  );
}

export default function Scene() {
  const {
    burgerHealth,
    jeanHealth,
    burgerPosition,
    jeanPosition,
    burgerState,
    jeanState,
    gameState,
    winner,
    onAttack,
    onHit
  } = useGameLogic();

  const [impactPosition, setImpactPosition] = useState(null);

  const handleAttack = (attacker) => {
    onAttack(attacker);
    // Set impact position based on the defender's position
    setImpactPosition(attacker === 'burger' ? jeanPosition : burgerPosition);
    // Reset impact position after a short delay
    setTimeout(() => setImpactPosition(null), 500);
  };

  return (
    <>
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Background />
        <Floor />
        <BurgerCharacter position={burgerPosition} rotation={[0, Math.PI / 2, 0]} animationState={burgerState} />
        <JeanCharacter position={jeanPosition} rotation={[0, -Math.PI / 2, 0]} animationState={jeanState} />
        {impactPosition && (
          <ParticleSystem position={impactPosition} color="#ff0000" count={50} />
        )}
        <AudioManager 
          gameState={gameState} 
          onAttack={() => handleAttack('burger')} 
          onHit={() => handleAttack('jean')} 
          onGameStart={gameState === 'start'} 
          onGameEnd={gameState === 'end'} 
        />
      </Canvas>
      <GameUI 
        gameState={gameState}
        burgerHealth={burgerHealth}
        jeanHealth={jeanHealth}
        winner={winner}
      />
    </>
  );
}