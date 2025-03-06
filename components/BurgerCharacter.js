import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function BurgerCharacter({ position, rotation }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/burger_character.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Start the idle animation by default
    actions.idle.play();
  }, [actions]);

  const [animationState, setAnimationState] = React.useState('idle');

  useFrame((state) => {
    // Add any frame-by-frame updates here
  });

  const triggerAnimation = (animationName) => {
    if (animationState !== animationName) {
      actions[animationState].fadeOut(0.5);
      actions[animationName].reset().fadeIn(0.5).play();
      setAnimationState(animationName);
    }
  };

  return (
    <group ref={group} position={position} rotation={rotation}>
      <primitive object={nodes.BurgerArmature} />
      <skinnedMesh
        geometry={nodes.BurgerMesh.geometry}
        material={materials.BurgerMaterial}
        skeleton={nodes.BurgerMesh.skeleton}
      />
      <mesh position={[0, 2, 0]}>
        <textGeometry args={['Burger', { font: '/fonts/helvetiker_regular.typeface.json', size: 0.5, height: 0.1 }]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

useGLTF.preload('/burger_character.glb');