import React from 'react';
import styles from '../styles/GameUI.module.css';

const GameUI = ({ gameState, burgerHealth, jeanHealth, winner, onStartGame, onMainMenu }) => {
  return (
    <div className={styles.gameUI}>
      {gameState === 'mainMenu' && (
        <div className={styles.mainMenu}>
          <h1>Fighting Game</h1>
          <button onClick={onStartGame}>Start Game</button>
          {/* Add more menu options here */}
        </div>
      )}
      
      {gameState === 'characterSelection' && (
        <div className={styles.characterSelection}>
          <h2>Select Your Character</h2>
          {/* Add character selection options here */}
          <button onClick={onMainMenu}>Back to Main Menu</button>
        </div>
      )}
      
      {gameState === 'playing' && (
        <div className={styles.healthBars}>
          <div className={styles.healthBar}>
            <div className={styles.healthBarInner} style={{width: `${burgerHealth}%`}}></div>
            <span>Burger</span>
          </div>
          <div className={styles.healthBar}>
            <div className={styles.healthBarInner} style={{width: `${jeanHealth}%`}}></div>
            <span>Jean</span>
          </div>
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <div className={styles.gameOverScreen}>
          <h2>{winner} Wins!</h2>
          <button onClick={onStartGame}>Play Again</button>
          <button onClick={onMainMenu}>Main Menu</button>
        </div>
      )}
    </div>
  );
};

export default GameUI;