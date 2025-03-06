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
import OptionsMenu from './OptionsMenu';

const Scene = () => {
  const [gameState, setGameState] = useState('mainMenu');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [impactPosition, setImpactPosition] = useState(null);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [sfxVolume, setSfxVolume] = useState(0.5);

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
    setGameState('options');
  };

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    setGameState('playing');
    startGame();
  };

  const handleBackToMainMenu = () => {
    setGameState('mainMenu');
  };

  const handleMusicVolumeChange = (volume) => {
    setMusicVolume(volume);
  };

  const handleSfxVolumeChange = (volume) => {
    setSfxVolume(volume);
  };

  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Background />
          {gameState === 'playing' && (
            <>
              <BurgerCharacter position={burgerPosition} animationState={burgerState} />
              <JeanCharacter position={jeanPosition} animationState={jeanState} />
              {impactPosition && <ParticleSystem position={impactPosition} />}
            </>
          )}
        </Suspense>
        <AudioManager
          gameState={gameState}
          onAttack={() => handleAttack('burger', 'jean')}
          onHit={() => handleAttack('jean', 'burger')}
          onGameStart={() => setGameState('playing')}
          onGameEnd={() => setGameState('gameOver')}
          musicVolume={musicVolume}
          sfxVolume={sfxVolume}
        />
      </Canvas>
      {gameState === 'mainMenu' && (
        <MainMenu
          onStartGame={handleStartGame}
          onCharacterSelection={handleCharacterSelection}
          onOptions={handleOptions}
        />
      )}
      {gameState === 'characterSelection' && (
        <CharacterSelection
          onSelectCharacter={handleSelectCharacter}
          onBack={handleBackToMainMenu}
        />
      )}
      {gameState === 'options' && (
        <OptionsMenu
          onBack={handleBackToMainMenu}
          musicVolume={musicVolume}
          sfxVolume={sfxVolume}
          onMusicVolumeChange={handleMusicVolumeChange}
          onSfxVolumeChange={handleSfxVolumeChange}
        />
      )}
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