import { Canvas } from '@react-three/fiber'
import React from 'react'
import Experience from './components/Experience'

const App = () => {
  return (
    <div className='parent'>
      <Canvas>
        <Experience/>
      </Canvas>
    </div>
  )
}

export default App
