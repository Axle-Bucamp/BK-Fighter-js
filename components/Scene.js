import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Plane, OrbitControls, Text } from '@react-three/drei'

const BurgerCharacter = () => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.y += delta
  })
  return (
    <group position={[-3, 1, 0]}>
      <Box ref={ref} args={[1, 0.5, 1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>
      <Box args={[1, 0.2, 1]} position={[0, 1, 0]}>
        <meshStandardMaterial color="saddlebrown" />
      </Box>
      <Text position={[0, 1.5, 0]} fontSize={0.5} color="black">
        Burger
      </Text>
    </group>
  )
}

const JeanCharacter = () => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.y -= delta
  })
  return (
    <group position={[3, 1, 0]}>
      <Box ref={ref} args={[1, 2, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="peachpuff" />
      <Text position={[0, 1.5, 0]} fontSize={0.5} color="black">
        Jean
      </Text>
    </group>
  )
}

const Floor = () => {
  return (
    <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <meshStandardMaterial color="green" />
    </Plane>
  )
}

const Background = () => {
  return (
    <Plane args={[20, 10]} rotation={[0, -Math.PI / 2, 0]} position={[5, 5, 0]}>
      <meshStandardMaterial color="lightblue" />
    </Plane>
  )
}

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <BurgerCharacter />
      <JeanCharacter />
      <Floor />
      <Background />
      <OrbitControls />
    </Canvas>
  )
}

export default Scene