import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AudioManager = ({ gameState, onAttack, onHit, onGameStart, onGameEnd, musicVolume, sfxVolume }) => {
  const { scene } = useThree();
  const listenerRef = useRef();
  const backgroundMusicRef = useRef();
  const attackSoundRef = useRef();
  const hitSoundRef = useRef();
  const gameStartSoundRef = useRef();
  const gameEndSoundRef = useRef();

  useEffect(() => {
    listenerRef.current = new THREE.AudioListener();
    scene.add(listenerRef.current);

    backgroundMusicRef.current = new THREE.Audio(listenerRef.current);
    attackSoundRef.current = new THREE.Audio(listenerRef.current);
    hitSoundRef.current = new THREE.Audio(listenerRef.current);
    gameStartSoundRef.current = new THREE.Audio(listenerRef.current);
    gameEndSoundRef.current = new THREE.Audio(listenerRef.current);

    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('/sounds/background_music.mp3', (buffer) => {
      backgroundMusicRef.current.setBuffer(buffer);
      backgroundMusicRef.current.setLoop(true);
      backgroundMusicRef.current.setVolume(musicVolume);
    });

    audioLoader.load('/sounds/attack.mp3', (buffer) => {
      attackSoundRef.current.setBuffer(buffer);
      attackSoundRef.current.setVolume(sfxVolume);
    });

    audioLoader.load('/sounds/hit.mp3', (buffer) => {
      hitSoundRef.current.setBuffer(buffer);
      hitSoundRef.current.setVolume(sfxVolume);
    });

    audioLoader.load('/sounds/game_start.mp3', (buffer) => {
      gameStartSoundRef.current.setBuffer(buffer);
      gameStartSoundRef.current.setVolume(sfxVolume);
    });

    audioLoader.load('/sounds/game_end.mp3', (buffer) => {
      gameEndSoundRef.current.setBuffer(buffer);
      gameEndSoundRef.current.setVolume(sfxVolume);
    });

    return () => {
      scene.remove(listenerRef.current);
    };
  }, [scene]);

  useEffect(() => {
    if (gameState === 'playing') {
      backgroundMusicRef.current.play();
      gameStartSoundRef.current.play();
    } else {
      backgroundMusicRef.current.pause();
    }

    if (gameState === 'gameOver') {
      gameEndSoundRef.current.play();
    }
  }, [gameState]);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.setVolume(musicVolume);
    }
  }, [musicVolume]);

  useEffect(() => {
    if (attackSoundRef.current) attackSoundRef.current.setVolume(sfxVolume);
    if (hitSoundRef.current) hitSoundRef.current.setVolume(sfxVolume);
    if (gameStartSoundRef.current) gameStartSoundRef.current.setVolume(sfxVolume);
    if (gameEndSoundRef.current) gameEndSoundRef.current.setVolume(sfxVolume);
  }, [sfxVolume]);

  useEffect(() => {
    const attackHandler = () => {
      if (attackSoundRef.current) {
        attackSoundRef.current.play();
      }
    };

    const hitHandler = () => {
      if (hitSoundRef.current) {
        hitSoundRef.current.play();
      }
    };

    onAttack(attackHandler);
    onHit(hitHandler);

    return () => {
      onAttack(null);
      onHit(null);
    };
  }, [onAttack, onHit]);

  return null;
};

export default AudioManager;