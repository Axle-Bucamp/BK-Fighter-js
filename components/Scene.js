import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BurgerCharacter from './BurgerCharacter';
import JeanCharacter from './JeanCharacter';
import GameUI from './GameUI';
import AudioManager from './AudioManager';
import ParticleSystem from './ParticleSystem';
import Background from './Background';
import useGameLogic from '../hooks/useGameLogic';
import MainMenu from './MainMenu';
import CharacterSelection from './CharacterSelection';

const Scene = () => {
  const [gameState, setGameState] = useState('mainMenu');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [impactPosition, setImpactPosition] = useState(null);
  const {
    burgerPosition,
    jeanPosition,
    burgerHealth,
    jeanHealth,
    burgerState,
    jeanState,
    winner,
    startGame,
    attackBurger,
    attackJean,
    moveBurger,
    moveJean,
  } = useGameLogic();

  const handleAttack = (attacker, target) => {
    if (attacker === 'burger') {
      attackJean();
      setImpactPosition(jeanPosition);
    } else {
      attackBurger();
      setImpactPosition(burgerPosition);
    }
    setTimeout(() => setImpactPosition(null), 300);
  };

  const handleStartGame = () => {
    startGame();
    setGameState('playing');
  };

  const handleCharacterSelection = () => {
    setGameState('characterSelection');
  };

  const handleOptions = () => {
    // Implement options menu logic here
    console.log('Options menu clicked');
  };

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    setGameState('playing');
    startGame();
  };

  const handleBackToMainMenu = () => {
    setGameState('mainMenu');
  };

  if (gameState === 'mainMenu') {
    return (
      <MainMenu
        onStartGame={handleStartGame}
        onCharacterSelection={handleCharacterSelection}
        onOptions={handleOptions}
      />
    );
  }

  if (gameState === 'characterSelection') {
    return (
      <CharacterSelection
        onSelectCharacter={handleSelectCharacter}
        onBack={handleBackToMainMenu}
      />
    );
  }

  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Background />
          <BurgerCharacter position={burgerPosition} animationState={burgerState} />
          <JeanCharacter position={jeanPosition} animationState={jeanState} />
          {impactPosition && <ParticleSystem position={impactPosition} />}
        </Suspense>
        <AudioManager
          gameState={gameState}
          onAttack={() => handleAttack('burger', 'jean')}
          onHit={() => handleAttack('jean', 'burger')}
          onGameStart={() => setGameState('playing')}
          onGameEnd={() => setGameState('gameOver')}
        />
      </Canvas>
      <GameUI
        gameState={gameState}
        burgerHealth={burgerHealth}
        jeanHealth={jeanHealth}
        winner={winner}
        onStartGame={handleStartGame}
        onMainMenu={handleBackToMainMenu}
      />
    </>
  );
};

export default Scene;