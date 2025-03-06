import React, { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AudioManager = ({ gameState, onAttack, onHit, onGameStart, onGameEnd }) => {
  const { scene } = useThree();
  const [volume, setVolume] = useState({ music: 0.5, sfx: 0.5 });
  const listener = useRef(new THREE.AudioListener());
  const backgroundMusic = useRef(new THREE.Audio(listener.current));
  const attackSound = useRef(new THREE.Audio(listener.current));
  const hitSound = useRef(new THREE.Audio(listener.current));
  const gameStartSound = useRef(new THREE.Audio(listener.current));
  const gameEndSound = useRef(new THREE.Audio(listener.current));

  useEffect(() => {
    scene.add(listener.current);

    const audioLoader = new THREE.AudioLoader();

    // Load background music
    audioLoader.load('/sounds/background_music.mp3', (buffer) => {
      backgroundMusic.current.setBuffer(buffer);
      backgroundMusic.current.setLoop(true);
      backgroundMusic.current.setVolume(volume.music);
    });

    // Load sound effects
    audioLoader.load('/sounds/attack.mp3', (buffer) => {
      attackSound.current.setBuffer(buffer);
    });
    audioLoader.load('/sounds/hit.mp3', (buffer) => {
      hitSound.current.setBuffer(buffer);
    });
    audioLoader.load('/sounds/game_start.mp3', (buffer) => {
      gameStartSound.current.setBuffer(buffer);
    });
    audioLoader.load('/sounds/game_end.mp3', (buffer) => {
      gameEndSound.current.setBuffer(buffer);
    });

    return () => {
      scene.remove(listener.current);
    };
  }, [scene]);

  useEffect(() => {
    if (gameState === 'playing' && !backgroundMusic.current.isPlaying) {
      backgroundMusic.current.play();
    } else if (gameState !== 'playing' && backgroundMusic.current.isPlaying) {
      backgroundMusic.current.pause();
    }
  }, [gameState]);

  useEffect(() => {
    if (onAttack) {
      attackSound.current.setVolume(volume.sfx);
      attackSound.current.play();
    }
  }, [onAttack, volume.sfx]);

  useEffect(() => {
    if (onHit) {
      hitSound.current.setVolume(volume.sfx);
      hitSound.current.play();
    }
  }, [onHit, volume.sfx]);

  useEffect(() => {
    if (onGameStart) {
      gameStartSound.current.setVolume(volume.sfx);
      gameStartSound.current.play();
    }
  }, [onGameStart, volume.sfx]);

  useEffect(() => {
    if (onGameEnd) {
      gameEndSound.current.setVolume(volume.sfx);
      gameEndSound.current.play();
    }
  }, [onGameEnd, volume.sfx]);

  const handleVolumeChange = (type, value) => {
    setVolume(prev => ({ ...prev, [type]: value }));
    if (type === 'music') {
      backgroundMusic.current.setVolume(value);
    }
  };

  return (
    <div style={{ position: 'absolute', bottom: 10, left: 10, color: 'white' }}>
      <div>
        Music Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume.music}
          onChange={(e) => handleVolumeChange('music', parseFloat(e.target.value))}
        />
      </div>
      <div>
        SFX Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume.sfx}
          onChange={(e) => handleVolumeChange('sfx', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default AudioManager;