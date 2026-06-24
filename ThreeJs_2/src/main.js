import { OrbitControls } from 'three/examples/jsm/Addons.js';
import './style.css'

import * as THREE from 'three'


const size = {
  width : window.innerWidth,
  height: window.innerHeight
}
// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader()

const texture = textureLoader.load("https://images.unsplash.com/photo-1781348424213-468c60e1c76a?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
const clock = new THREE.Clock()
//  Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height ,0.01 , 100)

camera.position.z = 5
// mesh

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
  map: texture
})

const cube = new THREE.Mesh(geometry, material)

cube.scale.x = 1.5
scene.add(cube)


// canvas {parda}

const canvas = document.querySelector('canvas')


// Renderer

const renderer = new THREE.WebGLRenderer({
  canvas,
})

renderer.setSize(size.width, size.height)


renderer.render(scene, camera)


const control = new OrbitControls(camera, renderer.domElement)

control.enableDamping = true

renderer.setSize(size.width, size.height)

window.addEventListener('resize' ,() => {
  size.width = window.innerWidth,
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
})
const animate = () => {

  const delta = clock.getElapsedTime()

  cube.rotation.y = delta * 0.3
  cube.rotation.x = delta * 0.2

  control.update()

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()