import React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

const Background = () => {
  const texture = useLoader(TextureLoader, '/background.jpg')

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 30]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export default Background