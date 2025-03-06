import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, OrbitControls, Text } from '@react-three/drei';

const BurgerCharacter = ({ position }) => {
  return (
    <group position={position}>
      <Box args={[1, 1, 1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>
      <Box args={[0.8, 0.2, 0.8]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="saddlebrown" />
      </Box>
      <Text position={[0, 1.5, 0]} fontSize={0.5} color="white">
        Burger
      </Text>
    </group>
  );
};

const JeanCharacter = ({ position }) => {
  return (
    <group position={position}>
      <Box args={[0.8, 1.5, 0.5]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>
      <Sphere args={[0.4, 32, 32]} position={[0, 1.7, 0]}>
        <meshStandardMaterial color="peachpuff" />
      </Sphere>
      <Text position={[0, 2.2, 0]} fontSize={0.5} color="white">
        Jean
      </Text>
    </group>
  );
};

const Floor = () => {
  return (
    <Plane args={[20, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <meshStandardMaterial color="green" />
    </Plane>
  );
};

const Background = () => {
  return (
    <Plane args={[20, 10]} position={[0, 5, -5]}>
      <meshStandardMaterial color="skyblue" />
    </Plane>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <BurgerCharacter position={[-3, 0, 0]} />
      <JeanCharacter position={[3, 0, 0]} />
      <Floor />
      <Background />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;