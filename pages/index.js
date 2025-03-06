import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Scene = dynamic(() => import('../components/Scene'), { ssr: false })

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Scene />
      </Suspense>
    </div>
  )
}