import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AudioManager = ({ gameState, onAttack, onHit, onGameStart, onGameEnd }) => {
  const { scene } = useThree();
  const listener = useRef();
  const backgroundMusic = useRef();
  const attackSound = useRef();
  const hitSound = useRef();
  const gameStartSound = useRef();
  const gameEndSound = useRef();

  useEffect(() => {
    listener.current = new THREE.AudioListener();
    scene.add(listener.current);

    // Load audio files
    const audioLoader = new THREE.AudioLoader();

    backgroundMusic.current = new THREE.Audio(listener.current);
    audioLoader.load('/sounds/background_music.mp3', (buffer) => {
      backgroundMusic.current.setBuffer(buffer);
      backgroundMusic.current.setLoop(true);
      backgroundMusic.current.setVolume(0.5);
    });

    attackSound.current = new THREE.Audio(listener.current);
    audioLoader.load('/sounds/attack.mp3', (buffer) => {
      attackSound.current.setBuffer(buffer);
    });

    hitSound.current = new THREE.Audio(listener.current);
    audioLoader.load('/sounds/hit.mp3', (buffer) => {
      hitSound.current.setBuffer(buffer);
    });

    gameStartSound.current = new THREE.Audio(listener.current);
    audioLoader.load('/sounds/game_start.mp3', (buffer) => {
      gameStartSound.current.setBuffer(buffer);
    });

    gameEndSound.current = new THREE.Audio(listener.current);
    audioLoader.load('/sounds/game_end.mp3', (buffer) => {
      gameEndSound.current.setBuffer(buffer);
    });

    return () => {
      scene.remove(listener.current);
    };
  }, [scene]);

  useEffect(() => {
    if (gameState === 'fighting' && !backgroundMusic.current.isPlaying) {
      backgroundMusic.current.play();
    } else if (gameState !== 'fighting' && backgroundMusic.current.isPlaying) {
      backgroundMusic.current.pause();
    }
  }, [gameState]);

  useEffect(() => {
    onAttack(() => {
      attackSound.current.play();
    });

    onHit(() => {
      hitSound.current.play();
    });

    onGameStart(() => {
      gameStartSound.current.play();
    });

    onGameEnd(() => {
      gameEndSound.current.play();
    });
  }, [onAttack, onHit, onGameStart, onGameEnd]);

  const setMusicVolume = (volume) => {
    backgroundMusic.current.setVolume(volume);
  };

  const setSoundEffectsVolume = (volume) => {
    attackSound.current.setVolume(volume);
    hitSound.current.setVolume(volume);
    gameStartSound.current.setVolume(volume);
    gameEndSound.current.setVolume(volume);
  };

  return null;
};

export default AudioManager;