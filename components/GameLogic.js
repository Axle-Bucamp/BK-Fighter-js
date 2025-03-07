import {
  useCallback,
  useEffect,
  useState,
} from 'react';

const INITIAL_HEALTH = 100;
const ATTACK_DAMAGE = 10;
const ROUND_TIME = 60;
const MOVE_SPEED = 1;
const JUMP_HEIGHT = 2;
const ATTACK_COOLDOWN = 500;

export const useGameLogic = (burgerRef, jeanRef) => {
  const [burgerHealth, setBurgerHealth] = useState(INITIAL_HEALTH);
  const [jeanHealth, setJeanHealth] = useState(INITIAL_HEALTH);
  const [gameStates, setGameState] = useState('ready');
  const [winner, setWinner] = useState(null);
  const [roundTime, setRoundTime] = useState(ROUND_TIME);
  const [burgerAnimation, setBurgerAnimation] = useState('idle');
  const [jeanAnimation, setJeanAnimation] = useState('idle');
  const [canAttack, setCanAttack] = useState(true);
  const [burgerPosition, setBurgerPosition] = useState(0);
  const [jeanPosition, setJeanPosition] = useState(0);

  const resetGame = useCallback(() => {
    console.log("reset-direct")
    setBurgerHealth(INITIAL_HEALTH);
    setJeanHealth(INITIAL_HEALTH);
    setGameState('ready');
    setWinner(null);
    setRoundTime(ROUND_TIME);
    setBurgerAnimation('idle');
    setJeanAnimation('idle');
    setBurgerPosition(0);
    setJeanPosition(0);
    setCanAttack(true);
  }, []);

  const startRound = useCallback(() => {
    setGameState('fighting');
  }, []);

  const endRound = useCallback(() => {
    setGameState('roundOver'); // Prevent instant reset
    if (burgerHealth > jeanHealth) {
      setWinner('Burger');
    } else if (jeanHealth > burgerHealth) {
      setWinner('Jean');
    } else {
      setWinner('Draw');
    }
  
    // Delay reset to avoid immediate return to "ready"
    console.log("reset")
    setTimeout(() => {
      resetGame();
    }, 3000); // 3 seconds delay before resetting
  }, [burgerHealth, jeanHealth, resetGame]);
  

  const handleAttack = useCallback((attacker) => {
    let success = false;
    let position = null;

    // Example attack logic
    if (attacker === 'burger') {
      // Simulate attack logic
      if (Math.random() > 0.3) {
        success = true;
        position = [Math.random() * 10, Math.random() * 10]; // Random impact position
        setJeanHealth(prevHealth => Math.max(0, prevHealth - 10));
      }
    } else if (attacker === 'jean') {
      if (Math.random() > 0.5) {
        success = true;
        position = [Math.random() * 10, Math.random() * 10]; // Random impact position
        setBurgerHealth(prevHealth => Math.max(0, prevHealth - 10));
      }
    }

    return [success, position];
  }, [burgerHealth, jeanHealth]);

  const moveCharacter = useCallback((character, direction) => {
    if (gameStates !== 'fighting') return;
    console.log("move");
    const updatePosition = (prevPosition) => prevPosition[2] + (direction === 'left' ? -MOVE_SPEED : MOVE_SPEED);
  
    const setCharacterAnimation = (char) => {
      if (char === 'Burger') {
        setBurgerAnimation('run');
        setTimeout(() => setBurgerAnimation('idle'), 300); // Reset to idle after animation time
      } else {
        setJeanAnimation('run');
        setTimeout(() => setJeanAnimation('idle'), 300);
      }
    };
    
    if (character === 'Burger') {
      setBurgerPosition((prev) => updatePosition(prev));
      console.log(burgerPosition);
      setCharacterAnimation('Burger');
    } else {
      setJeanPosition((prev) => updatePosition(prev));
      console.log(jeanPosition);
      setCharacterAnimation('Jean');
    }
  }, [gameStates]);
  
  const jumpCharacter = useCallback((character) => {
    if (gameStates !== 'fighting') return;
  
    const characterRef = character === 'Burger' ? burgerRef : jeanRef;
    if (!characterRef?.current) return;
  
    const jump = () => {
      characterRef.current.style.transition = 'transform 0.3s ease';
      characterRef.current.style.transform = `translateY(-${JUMP_HEIGHT}px)`;
      setTimeout(() => {
        characterRef.current.style.transform = 'translateY(0)';
      }, 300); // Reset the position after jump animation time
    };
  
    jump();
  }, [gameStates, burgerRef, jeanRef]);
  
useEffect(() => {
  //if ( gameStates !== 'fighting') return;
  
  const timer = setInterval(() => {
    setRoundTime((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(timer);
        setTimeout(endRound, 1000); // Give a delay before ending the round
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [gameStates, endRound]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      
      if ( gameStates === 'fighting') {
        switch (event.key) {
          case 'a': moveCharacter('Burger', 'left'); break;
          case 'd': moveCharacter('Burger', 'right'); break;
          case 'w': jumpCharacter('Burger'); break;
          case 'j': moveCharacter('Jean', 'left'); break;
          case 'l': moveCharacter('Jean', 'right'); break;
          case 'i': jumpCharacter('Jean'); break;
          case 's': handleAttack?.('Burger'); break; // Added optional chaining to prevent errors
          case 'k': handleAttack?.('Jean'); break;
          default: break;
        }
      }
      console.log(event.key)
      console.log(gameStates)
  
      if (gameStates === 'ready' || gameStates === 'roundOver') {
        if (event.key === ' ') startRound();
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleAttack, moveCharacter, jumpCharacter, gameStates, startRound]);

  return {
    burgerHealth,
    jeanHealth,
    gameStates,
    winner,
    roundTime,
    burgerAnimation,
    jeanAnimation,
    startRound,
    resetGame,
    handleAttack,
    burgerPosition,
    jeanPosition,
  };
};

export default useGameLogic;
