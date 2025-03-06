import React from 'react';
import styles from '../styles/GameUI.module.css';
import MainMenu from './MainMenu';
import CharacterSelection from './CharacterSelection';

const GameUI = ({
  gameState,
  burgerHealth,
  jeanHealth,
  onStartGame,
  onResetGame,
  onCharacterSelect,
  selectedCharacter,
  onShowOptions,
}) => {
  const renderHealthBar = (health, character) => (
    <div className={styles.healthBarContainer}>
      <div className={styles.healthBar} style={{ width: `${health}%` }}></div>
      <span>{character}: {health}%</span>
    </div>
  );

  const renderGameOver = () => (
    <div className={styles.gameOver}>
      <h2>Game Over</h2>
      <p>{burgerHealth > jeanHealth ? 'Burger' : 'Jean'} wins!</p>
      <button onClick={onResetGame}>Play Again</button>
    </div>
  );

  switch (gameState) {
    case 'mainMenu':
      return (
        <MainMenu
          onStartGame={onStartGame}
          onCharacterSelection={() => onCharacterSelect(null)}
          onOptions={onShowOptions}
        />
      );
    case 'characterSelection':
      return (
        <CharacterSelection
          onSelectCharacter={onCharacterSelect}
          onBack={() => onCharacterSelect(null)}
        />
      );
    case 'ready':
      return (
        <div className={styles.startScreen}>
          <h2>Press Space to Start</h2>
        </div>
      );
    case 'fighting':
      return (
        <div className={styles.gameUI}>
          {renderHealthBar(burgerHealth, 'Burger')}
          {renderHealthBar(jeanHealth, 'Jean')}
        </div>
      );
    case 'gameOver':
      return renderGameOver();
    default:
      return null;
  }
};

export default GameUI;