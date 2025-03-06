import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import BurgerCharacter from './BurgerCharacter';
import JeanCharacter from './JeanCharacter';
import GameUI from './GameUI';
import { useGameLogic } from './GameLogic';
import Background from './Background';
import ParticleSystem from './ParticleSystem';
import AudioManager from './AudioManager';

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

  const [impactPosition, setImpactPosition] = useState(null);

  const handleAttack = useCallback((attacker, defender) => {
    // Your attack logic here
    // Update the impact position for particle effects
    setImpactPosition(defender === 'Burger' ? [-3, 1, 0] : [3, 1, 0]);
    setTimeout(() => setImpactPosition(null), 500);
  }, []);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, 5, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          
          <Background />
          
          <Plane args={[20, 20]} rotation-x={-Math.PI / 2} position-y={-0.5}>
            <meshStandardMaterial color="green" />
          </Plane>
          
          <BurgerCharacter position={[-3, 0, 0]} animationState={burgerAnimation} />
          <JeanCharacter position={[3, 0, 0]} animationState={jeanAnimation} />
          
          {impactPosition && (
            <ParticleSystem position={impactPosition} color="#FFA500" count={20} />
          )}
          
          <AudioManager 
            gameState={gameState}
            onAttack={handleAttack}
            onHit={() => {/* Handle hit sound */}}
            onGameStart={startRound}
            onGameEnd={resetGame}
          />
        </Canvas>
        
        <GameUI
          gameState={gameState}
          burgerHealth={burgerHealth}
          jeanHealth={jeanHealth}
          winner={winner}
          onStartGame={startRound}
        />
      </div>
    </>
  );
};

export default Scene;