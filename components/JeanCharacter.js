import React, { useRef } from 'react';

import {
  Box,
  Sphere,
  Text,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const JeanCharacter = ({ position = [0, 0, 0], animationState }) => {
  const ref = useRef();

  // Use frame-based animations with delta time for smooth transitions
  useFrame((state, delta) => {
    if (!ref.current) return;

    // Idle Animation: Slow rotation to simulate natural movement
    if (animationState === 'idle') {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05; // Idle breathing effect
    } 
    // Attack Animation: Slight rotation and bobbing motion for attack state
    else if (animationState === 'attack') {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.25;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1; // Small attack bobbing motion
    }
    // Hurt Animation: Sudden jerky movement to simulate being hit
    else if (animationState === 'hurt') {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 5) * 0.05; // Slight shake
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Main body (Torso) */}
      <Box args={[0.8, 1.5, 0.5]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>

      {/* Head of Jean */}
      <Sphere args={[0.4, 32, 32]} position={[0, 1.85, 0]}>
        <meshStandardMaterial color="peachpuff" />
      </Sphere>

      {/* Arms (Added arms for better visual realism) */}
      <Box args={[0.2, 0.5, 0.2]} position={[-0.6, 0.85, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>
      <Box args={[0.2, 0.5, 0.2]} position={[0.6, 0.85, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>

      {/* Character's name text */}
      <Text
        position={[0, 2.3, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Jean
      </Text>
    </group>
  );
};

export default JeanCharacter;
