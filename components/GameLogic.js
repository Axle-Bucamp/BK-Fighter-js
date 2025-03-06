import {
  useCallback,
  useEffect,
  useState,
} from 'react';

const INITIAL_HEALTH = 100;
const ATTACK_DAMAGE = 10;
const ROUND_TIME = 60; // 60 seconds per round

export const useGameLogic = (burgerRef, jeanRef) => {
  const [burgerHealth, setBurgerHealth] = useState(INITIAL_HEALTH);
  const [jeanHealth, setJeanHealth] = useState(INITIAL_HEALTH);
  const [gameState, setGameState] = useState('ready'); // 'ready', 'fighting', 'roundOver', 'gameOver'
  const [winner, setWinner] = useState(null);
  const [roundTime, setRoundTime] = useState(ROUND_TIME);
  const [burgerAnimation, setBurgerAnimation] = useState('idle');
  const [jeanAnimation, setJeanAnimation] = useState('idle');
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Added state for selectedCharacter

  const resetGame = useCallback(() => {
    setBurgerHealth(INITIAL_HEALTH);
    setJeanHealth(INITIAL_HEALTH);
    setGameState('ready');
    setWinner(null);
    setRoundTime(ROUND_TIME);
    setBurgerAnimation('idle');
    setJeanAnimation('idle');
    setSelectedCharacter(null); // Reset selectedCharacter as well
  }, []);

  const startRound = useCallback(() => {
    setGameState('fighting');
  }, []);

  const endRound = useCallback(() => {
    setGameState('roundOver');
    if (burgerHealth > jeanHealth) {
      setWinner('Burger');
    } else if (jeanHealth > burgerHealth) {
      setWinner('Jean');
    } else {
      setWinner('Draw');
    }
  }, [burgerHealth, jeanHealth]);

  const handleAttack = useCallback((attacker) => {
    if (gameState !== 'fighting') return [false, null];

    const attackerAnimation = attacker === 'Burger' ? setBurgerAnimation : setJeanAnimation;
    const defenderAnimation = attacker === 'Burger' ? setJeanAnimation : setBurgerAnimation;
    const setDefenderHealth = attacker === 'Burger' ? setJeanHealth : setBurgerHealth;

    attackerAnimation('attack');
    setTimeout(() => attackerAnimation('idle'), 500);

    const hitChance = Math.random();
    if (hitChance > 0.3) { // 70% chance to hit
      defenderAnimation('hurt');
      setTimeout(() => defenderAnimation('idle'), 500);
      setDefenderHealth(prevHealth => Math.max(prevHealth - ATTACK_DAMAGE, 0));
      return [true, { x: Math.random() * 5, y: Math.random() * 5, z: Math.random() * 5 }];  // Simulated impact position
    }

    return [false, null];
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'fighting') return;

    const timer = setInterval(() => {
      setRoundTime(prevTime => {
        if (prevTime <= 0 || burgerHealth <= 0 || jeanHealth <= 0) {
          clearInterval(timer);
          endRound();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, burgerHealth, jeanHealth, endRound]);

  // Key press handler
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'a':
          handleAttack('Burger');  // Use handleAttack directly
          break;
        case 'j':
          handleAttack('Jean');  // Use handleAttack directly
          break;
        case ' ':
          if (gameState === 'ready' || gameState === 'roundOver') {
            startRound();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleAttack, gameState, startRound]);

  return {
    burgerHealth,
    jeanHealth,
    gameState,
    winner,
    roundTime,
    burgerAnimation,
    jeanAnimation,
    startRound,
    resetGame,
    handleAttack,
    selectedCharacter,
    setSelectedCharacter,
  };
};

export default useGameLogic;
