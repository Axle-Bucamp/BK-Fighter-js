import React from 'react';
import styles from './GameUI.module.css';

const GameUI = ({ gameState, burgerHealth, jeanHealth, winner, onStartGame }) => {
  return (
    <div className={styles.gameUI}>
      {gameState === 'ready' && (
        <div className={styles.startScreen}>
          <h1>Burger vs Jean</h1>
          <p>Press Space to Start</p>
        </div>
      )}
      
      {gameState !== 'ready' && (
        <div className={styles.healthBars}>
          <div className={styles.healthBar}>
            <div className={styles.healthBarInner} style={{ width: `${burgerHealth}%` }}></div>
            <span>Burger</span>
          </div>
          <div className={styles.healthBar}>
            <div className={styles.healthBarInner} style={{ width: `${jeanHealth}%` }}></div>
            <span>Jean</span>
          </div>
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <div className={styles.gameOverScreen}>
          <h2>{winner} wins!</h2>
          <button onClick={onStartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default GameUI;