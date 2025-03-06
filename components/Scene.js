import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import BurgerCharacter from './BurgerCharacter';
import JeanCharacter from './JeanCharacter';
import GameUI from './GameUI';
import { useGameLogic } from './GameLogic';
import Background from './Background';
import ParticleSystem from './ParticleSystem';

const Scene = () => {
  const {
    burgerHealth,
    jeanHealth,
    gameState,
    winner,
    roundTime,
    burgerAnimation,
    jeanAnimation,
    resetGame,
    startRound,
  } = useGameLogic();

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, 5, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />

          <Background />

          <Plane args={[20, 20]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial color="green" />
          </Plane>

          <BurgerCharacter position={[-3, 0, 0]} animationState={burgerAnimation} />
          <JeanCharacter position={[3, 0, 0]} animationState={jeanAnimation} />

          {gameState === 'fighting' && (
            <ParticleSystem position={[0, 1, 0]} color="#FFD700" />
          )}
        </Canvas>
      </div>
      <GameUI
        gameState={gameState}
        burgerHealth={burgerHealth}
        jeanHealth={jeanHealth}
        winner={winner}
        onStartGame={startRound}
      />
    </>
  );
};

export default Scene;