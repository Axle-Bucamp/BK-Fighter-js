import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import BurgerCharacter from './BurgerCharacter';
import JeanCharacter from './JeanCharacter';

const Scene = () => {
  const [burgerState, setBurgerState] = useState('idle');
  const [jeanState, setJeanState] = useState('idle');

  const handleKeyDown = (event) => {
    if (event.key === 'a') setBurgerState('attack');
    if (event.key === 'h') setBurgerState('hurt');
    if (event.key === 'j') setJeanState('attack');
    if (event.key === 'k') setJeanState('hurt');
  };

  const handleKeyUp = () => {
    setBurgerState('idle');
    setJeanState('idle');
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />

        <Plane args={[20, 20]} rotation-x={-Math.PI / 2} receiveShadow>
          <meshStandardMaterial color="green" />
        </Plane>

        <BurgerCharacter position={[-3, 0, 0]} animationState={burgerState} />
        <JeanCharacter position={[3, 0, 0]} animationState={jeanState} />

        <Plane args={[20, 10]} position={[0, 5, -5]}>
          <meshStandardMaterial color="lightblue" />
        </Plane>
      </Canvas>
    </div>
  );
};

export default Scene;