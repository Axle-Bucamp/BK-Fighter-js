import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';

const BurgerCharacter = ({ position, animationState }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (animationState === 'idle') {
      ref.current.rotation.y += delta * 0.5;
    } else if (animationState === 'attack') {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.2;
    } else if (animationState === 'hurt') {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 20) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Box args={[1, 0.5, 1]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>
      <Box args={[1.1, 0.2, 1.1]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="brown" />
      </Box>
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