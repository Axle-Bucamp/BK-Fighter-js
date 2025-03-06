import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Text } from '@react-three/drei';

const JeanCharacter = ({ position, animationState }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (animationState === 'idle') {
      ref.current.rotation.y -= delta * 0.5;
    } else if (animationState === 'attack') {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * -0.2;
    } else if (animationState === 'hurt') {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 20) * -0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Box args={[0.8, 1.5, 0.5]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>
      <Sphere args={[0.4, 32, 32]} position={[0, 1.85, 0]}>
        <meshStandardMaterial color="peachpuff" />
      </Sphere>
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