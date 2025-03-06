import React from 'react';
import styles from './GameUI.module.css';

const GameUI = ({ gameState, burgerHealth, jeanHealth, winner }) => {
  return (
    <div className={styles.gameUI}>
      {gameState === 'start' && (
        <div className={styles.startScreen}>
          <h1>Burger vs Jean</h1>
          <p>Press Space to Start</p>
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
          <p>Press Space to Restart</p>
        </div>
      )}
    </div>
  );
};

export default GameUI;