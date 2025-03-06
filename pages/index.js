import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('../components/Scene'), { ssr: false });

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}