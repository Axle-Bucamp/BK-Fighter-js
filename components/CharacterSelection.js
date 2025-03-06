import React from 'react';
import styles from '../styles/CharacterSelection.module.css';

const CharacterSelection = ({ onSelectCharacter, onBack }) => {
  const characters = ['Burger', 'Jean'];

  return (
    <div className={styles.characterSelection}>
      <h2>Select Your Character</h2>
      <div className={styles.characterList}>
        {characters.map((character) => (
          <button key={character} onClick={() => onSelectCharacter(character)}>
            {character}
          </button>
        ))}
      </div>
      <button onClick={onBack}>Back to Main Menu</button>
    </div>
  );
};

export default CharacterSelection;