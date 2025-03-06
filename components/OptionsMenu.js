import React from 'react';
import styles from '../styles/OptionsMenu.module.css';

const OptionsMenu = ({ onBack, musicVolume, sfxVolume, onMusicVolumeChange, onSfxVolumeChange }) => {
  return (
    <div className={styles.optionsMenu}>
      <h2>Options</h2>
      <div className={styles.volumeControl}>
        <label htmlFor="musicVolume">Music Volume:</label>
        <input
          type="range"
          id="musicVolume"
          min="0"
          max="1"
          step="0.1"
          value={musicVolume}
          onChange={(e) => onMusicVolumeChange(parseFloat(e.target.value))}
        />
      </div>
      <div className={styles.volumeControl}>
        <label htmlFor="sfxVolume">SFX Volume:</label>
        <input
          type="range"
          id="sfxVolume"
          min="0"
          max="1"
          step="0.1"
          value={sfxVolume}
          onChange={(e) => onSfxVolumeChange(parseFloat(e.target.value))}
        />
      </div>
      <button className={styles.backButton} onClick={onBack}>Back to Main Menu</button>
    </div>
  );
};

export default OptionsMenu;