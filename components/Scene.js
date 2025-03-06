import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BurgerCharacter from './BurgerCharacter';
import JeanCharacter from './JeanCharacter';
import { useGameLogic } from './GameLogic';
import GameUI from './GameUI';

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  );
}

function Background() {
  return (
    <mesh position={[0, 0, -5]}>
      <planeBufferGeometry attach="geometry" args={[20, 10]} />
      <meshStandardMaterial attach="material" color="lightblue" />
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
    winner
  } = useGameLogic();

  return (
    <>
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Floor />
        <Background />
        <BurgerCharacter position={burgerPosition} rotation={[0, Math.PI / 2, 0]} animationState={burgerState} />
        <JeanCharacter position={jeanPosition} rotation={[0, -Math.PI / 2, 0]} animationState={jeanState} />
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