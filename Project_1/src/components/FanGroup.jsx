import { useControls } from 'leva'
import React, { useMemo } from 'react'
import { image } from '../Data/images.js'
import ImagePlans from './ImagePlans.jsx'

const FanGroup = () => {
    const {numPlane, spreadAngle, planeHeight, planeWidth, positionY} = useControls("Book fan controls",{
        numPlane:{
            value: 6,
            min: 2,
            max: 40,
            step: 1,
            label: "No. of Planes"
        },
        spreadAngle:{
            value: 120,
            min: 20,
            max: 360,
            step: 1,
            label: "Spread Angle"
        },
        planeWidth: {
            value: 2.5,
            min: 0.4,
            max: 6,
            step: 0.05,
            label: "Plane Width"
        },
         planeHeight: {
            value: 2.5,
            min: 0.4,
            max: 8,
            step: 0.05,
            label: "Plane Height"
        },
        positionY:{
            value: 2.5,
            min: 0.4,
            max: 8,
            step: 0.04,
            label: "Y Position"
        }
    })

    const planes = useMemo(() => {
        const count = numPlane
        const totalArcRad = (spreadAngle * Math.PI) / 180
        const step = totalArcRad / (count - 1)
        const startingAngle = -totalArcRad / 2

        return Array.from({length: count} , (_,i)=>{
            const angle = startingAngle + i *step
            return {
                key: i,
                url: image[i % image.length],
                position: [0,positionY,0],
                rotation: [0,angle,0]
            }
        })
    }, [numPlane, spreadAngle])
  return (
    <group position={[0,positionY,0]}>
        {planes.map((plane) => {
        return <ImagePlans 
        key={plane.key} 
        url={plane.url} 
        position={plane.position} 
        rotation={plane.rotation} 
        planeWidth={planeWidth} 
        planeHeight={planeHeight}
        />
})}
    </group>
  )
}

export default FanGroup
