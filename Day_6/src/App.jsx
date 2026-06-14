import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import AnimateOnX from './component/AnimateOnX'

const App = () => {

  const boxRef = useRef(null)
  const containerRef = useRef(null)
  const {contextSafe} = useGSAP(()=>{
    gsap.to(boxRef.current,{
      x: 600,
      duration: 1.2,
      delay: 0.4
    });
  },{scope: containerRef.current, dependencies: [], revertOnUpdate: true})
  return (
    <div ref={containerRef}>
      <div ref ={boxRef} className="box"></div>

      <AnimateOnX>
        <div className="box"></div>
        <div className="box1"></div>
      </AnimateOnX>

    </div>
  )
}

export default App
