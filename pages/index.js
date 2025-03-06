import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'

// Dynamically import the Scene component with SSR disabled
const Scene = dynamic(() => import('../components/Scene'), { ssr: false })

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}