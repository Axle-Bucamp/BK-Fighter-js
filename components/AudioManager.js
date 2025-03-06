import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AudioManager = ({ gameState, onAttack, onHit, onGameStart, onGameEnd, musicVolume, sfxVolume }) => {
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

    backgroundMusic.current = new THREE.Audio(listener.current);
    attackSound.current = new THREE.Audio(listener.current);
    hitSound.current = new THREE.Audio(listener.current);
    gameStartSound.current = new THREE.Audio(listener.current);
    gameEndSound.current = new THREE.Audio(listener.current);

    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('/sounds/background_music.mp3', (buffer) => {
      backgroundMusic.current.setBuffer(buffer);
      backgroundMusic.current.setLoop(true);
      backgroundMusic.current.setVolume(musicVolume);
    });

    audioLoader.load('/sounds/attack.mp3', (buffer) => {
      attackSound.current.setBuffer(buffer);
      attackSound.current.setVolume(sfxVolume);
    });

    audioLoader.load('/sounds/hit.mp3', (buffer) => {
      hitSound.current.setBuffer(buffer);
      hitSound.current.setVolume(sfxVolume);
    });

    audioLoader.load('/sounds/game_start.mp3', (buffer) => {
      gameStartSound.current.setBuffer(buffer);
      gameStartSound.current.setVolume(sfxVolume);
    });

    audioLoader.load('/sounds/game_end.mp3', (buffer) => {
      gameEndSound.current.setBuffer(buffer);
      gameEndSound.current.setVolume(sfxVolume);
    });

    return () => {
      scene.remove(listener.current);
    };
  }, [scene]);

  useEffect(() => {
    if (gameState === 'fighting') {
      backgroundMusic.current.play();
    } else {
      backgroundMusic.current.pause();
    }
  }, [gameState]);

  useEffect(() => {
    backgroundMusic.current.setVolume(musicVolume);
  }, [musicVolume]);

  useEffect(() => {
    attackSound.current.setVolume(sfxVolume);
    hitSound.current.setVolume(sfxVolume);
    gameStartSound.current.setVolume(sfxVolume);
    gameEndSound.current.setVolume(sfxVolume);
  }, [sfxVolume]);

  useEffect(() => {
    const handleAttack = () => {
      attackSound.current.play();
    };

    const handleHit = () => {
      hitSound.current.play();
    };

    const handleGameStart = () => {
      gameStartSound.current.play();
    };

    const handleGameEnd = () => {
      gameEndSound.current.play();
    };

    onAttack(handleAttack);
    onHit(handleHit);
    onGameStart(handleGameStart);
    onGameEnd(handleGameEnd);

    return () => {
      onAttack(null);
      onHit(null);
      onGameStart(null);
      onGameEnd(null);
    };
  }, [onAttack, onHit, onGameStart, onGameEnd]);

  return null;
};

export default AudioManager;