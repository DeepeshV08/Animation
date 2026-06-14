import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const AnimateOnX = ({children}) => {

    const containerRef = useRef(null)
    useGSAP(() => {
        gsap.to(containerRef.current ,{
            x: 600,
            duration: 1.2,
            delay: 0.4
        })
    })
  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

export default AnimateOnX
