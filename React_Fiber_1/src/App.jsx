import { Canvas } from '@react-three/fiber'
import React from 'react'
import Experience from './components/Experience'
import { OrbitControls } from '@react-three/drei'

const App = () => {
  return (
    <div className='parent'>
      <Canvas camera={{position: [0,9,0]}}>
        <OrbitControls></OrbitControls>
        <Experience></Experience>
      </Canvas>
    </div>
  )
}

export default App
