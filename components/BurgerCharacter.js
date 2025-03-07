import React, { useRef } from 'react';

import {
  Box,
  Text,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const BurgerCharacter = ({ position = [0, 0, 0], animationState }) => {
  const ref = useRef();

  // Use frame-based animations with delta time for smooth transitions
  useFrame((state, delta) => {
    if (!ref.current) return;

    // Rotate slowly when idle
    if (animationState === 'idle') {
      ref.current.rotation.y += delta * 0.5;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1; // Slight idle tilt
    } 
    // Smooth 'attack' animation
    else if (animationState === 'attack') {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05; // Small bobbing effect for attack animation
    }
    // 'Hurt' state with position oscillation
    else if (animationState === 'hurt') {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 5) * 0.05; // Up-and-down motion for hurt state
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Main body of the Burger Character */}
      <Box args={[1, 0.5, 1]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>
      
      {/* The "bun" part of the burger (Top) */}
      <Box args={[1.1, 0.2, 1.1]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="brown" />
      </Box>

      {/* Adding a "bun" (Bottom) */}
      <Box args={[1.1, 0.2, 1.1]} position={[0, -0.35, 0]}>
        <meshStandardMaterial color="brown" />
      </Box>

      {/* Adding eyes for personality */}
      <group position={[0, 0.75, 0]}>
        <Box args={[0.15, 0.15, 0.1]} position={[-0.25, 0, 0.1]}>
          <meshStandardMaterial color="white" />
        </Box>
        <Box args={[0.15, 0.15, 0.1]} position={[0.25, 0, 0.1]}>
          <meshStandardMaterial color="white" />
        </Box>
      </group>

      {/* Burger character name */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Burger
      </Text>
    </group>
  );
};

export default BurgerCharacter;
