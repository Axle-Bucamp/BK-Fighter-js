import { useState, useEffect, useCallback } from 'react';

const INITIAL_HEALTH = 100;
const ATTACK_DAMAGE = 10;
const ATTACK_RANGE = 2; // Distance within which attacks can land

export const useGameLogic = () => {
  const [burgerHealth, setBurgerHealth] = useState(INITIAL_HEALTH);
  const [jeanHealth, setJeanHealth] = useState(INITIAL_HEALTH);
  const [burgerPosition, setBurgerPosition] = useState([-3, 0, 0]);
  const [jeanPosition, setJeanPosition] = useState([3, 0, 0]);
  const [burgerState, setBurgerState] = useState('idle');
  const [jeanState, setJeanState] = useState('idle');
  const [gameState, setGameState] = useState('start');
  const [winner, setWinner] = useState(null);

  const resetGame = useCallback(() => {
    setBurgerHealth(INITIAL_HEALTH);
    setJeanHealth(INITIAL_HEALTH);
    setBurgerPosition([-3, 0, 0]);
    setJeanPosition([3, 0, 0]);
    setBurgerState('idle');
    setJeanState('idle');
    setGameState('start');
    setWinner(null);
  }, []);

  const attack = useCallback((attacker) => {
    if (gameState !== 'fighting') return;

    const [attackerState, setAttackerState] = attacker === 'burger' ? [burgerState, setBurgerState] : [jeanState, setJeanState];
    const [defenderHealth, setDefenderHealth] = attacker === 'burger' ? [jeanHealth, setJeanHealth] : [burgerHealth, setBurgerHealth];
    const [attackerPosition, defenderPosition] = attacker === 'burger' ? [burgerPosition, jeanPosition] : [jeanPosition, burgerPosition];

    if (attackerState !== 'attack') {
      setAttackerState('attack');
      setTimeout(() => setAttackerState('idle'), 500); // Reset to idle after attack animation

      // Check if attack lands
      const distance = Math.abs(attackerPosition[0] - defenderPosition[0]);
      if (distance <= ATTACK_RANGE) {
        setDefenderHealth(prev => {
          const newHealth = Math.max(0, prev - ATTACK_DAMAGE);
          if (newHealth === 0) {
            setGameState('end');
            setWinner(attacker);
          }
          return newHealth;
        });
      }
    }
  }, [gameState, burgerState, jeanState, burgerHealth, jeanHealth, burgerPosition, jeanPosition]);

  const move = useCallback((character, direction) => {
    if (gameState !== 'fighting') return;

    const [position, setPosition] = character === 'burger' ? [burgerPosition, setBurgerPosition] : [jeanPosition, setJeanPosition];
    const newPosition = [...position];
    newPosition[0] += direction * 0.1; // Move 0.1 units in the specified direction
    setPosition(newPosition);
  }, [gameState, burgerPosition, jeanPosition]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'a': move('burger', -1); break;
        case 'd': move('burger', 1); break;
        case 'w': attack('burger'); break;
        case 'ArrowLeft': move('jean', -1); break;
        case 'ArrowRight': move('jean', 1); break;
        case 'ArrowUp': attack('jean'); break;
        case ' ': 
          if (gameState === 'start' || gameState === 'end') {
            setGameState('fighting');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [attack, move, gameState]);

  return {
    burgerHealth,
    jeanHealth,
    burgerPosition,
    jeanPosition,
    burgerState,
    jeanState,
    gameState,
    winner,
    resetGame
  };
};