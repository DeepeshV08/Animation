import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Experience = () => {
    const cubeRef = useRef(null)

    useFrame((state , delta) => {
        cubeRef.current.rotation.y += delta
    })

    const {texture, texture2} = useTexture({
        texture:"https://plus.unsplash.com/premium_photo-1782249091560-38b59f6fcc32?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        texture2: "https://images.unsplash.com/photo-1779006887604-d7bdf88f0da6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    })

   const [scene] = useGLTF('./model.glb')
  return (
    <>
   {/* <mesh ref={cubeRef}>
        <boxGeometry></boxGeometry>
        <meshBasicMaterial map={texture2}></meshBasicMaterial>
    </mesh> */}
    <ambientLight intensity={3} color={'white'}></ambientLight>
    <primitive object={scene}></primitive>
    </>
  )
}

export default Experience
