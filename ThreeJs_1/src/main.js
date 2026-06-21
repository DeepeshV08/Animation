import './style.css'

import * as THREE from 'three'



// Scene
const scene = new THREE.Scene();

//  Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight ,0.01 , 100)

camera.position.z = 5
// mesh

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
})

const cube = new THREE.Mesh(geometry, material)


scene.add(cube)


// canvas {parda}

const canvas = document.querySelector('canvas')


// Renderer

const renderer = new THREE.WebGLRenderer({
  canvas,
})

renderer.setSize(window.innerWidth, window.innerHeight)


renderer.render(scene, camera)


const animate = () => {
  cube.rotation.y += 0.02
  cube.rotation.x += 0.02
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()