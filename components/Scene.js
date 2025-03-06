import React, { useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BurgerCharacter from './BurgerCharacter';
import JeanCharacter from './JeanCharacter';
import Floor from './Floor';
import Background from './Background';
import ParticleSystem from './ParticleSystem';
import GameUI from './GameUI';
import AudioManager from './AudioManager';
import useGameLogic from './GameLogic';

const Scene = () => {
  const {
    gameState,
    burgerHealth,
    jeanHealth,
    burgerPosition,
    jeanPosition,
    burgerAnimationState,
    jeanAnimationState,
    startRound,
    resetGame,
    handleAttack,
    selectedCharacter,
    setSelectedCharacter,
  } = useGameLogic();

  const [impactPosition, setImpactPosition] = React.useState(null);

  const handleCharacterAttack = useCallback((attacker) => {
    const [success, position] = handleAttack(attacker);
    if (success) {
      setImpactPosition(position);
      setTimeout(() => setImpactPosition(null), 1000); // Reset after 1 second
    }
  }, [handleAttack]);

  return (
    <>
      <Canvas camera={{ position: [0, 5, 10] }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Background />
        <Floor />
        {gameState === 'fighting' && (
          <>
            <BurgerCharacter position={burgerPosition} animationState={burgerAnimationState} />
            <JeanCharacter position={jeanPosition} animationState={jeanAnimationState} />
            {impactPosition && <ParticleSystem position={impactPosition} />}
          </>
        )}
        <AudioManager
          gameState={gameState}
          onAttack={handleCharacterAttack}
          onHit={() => {}} // Implement hit sound logic if needed
          onGameStart={startRound}
          onGameEnd={resetGame}
        />
      </Canvas>
      <GameUI
        gameState={gameState}
        burgerHealth={burgerHealth}
        jeanHealth={jeanHealth}
        onStartGame={startRound}
        onResetGame={resetGame}
        onCharacterSelect={setSelectedCharacter}
        selectedCharacter={selectedCharacter}
      />
    </>
  );
};

export default Scene;