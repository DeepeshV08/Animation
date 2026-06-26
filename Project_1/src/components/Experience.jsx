import { useControls } from 'leva'
import React from 'react'
import FanGroup from './FanGroup'
import { OrbitControls } from '@react-three/drei'

const Experience = () => {
    const {x,y} = useControls("Box Position",{
        x: {value: 0 ,min: -4 , max: 4, step: 0.01, label: 'X-Position'},
        y: {value: 0 ,min: -4 , max: 4, step: 0.01, label: "Y-Position"}
    })
  return (
    <>
    <ambientLight  intensity={2} color={'#ffffff'}></ambientLight>
    <FanGroup/>
    <OrbitControls></OrbitControls>
    </>
  )
}

export default Experience
