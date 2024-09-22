import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Stats from 'three/examples/jsm/libs/stats.module.js'
import { World } from './world'
import { createUI } from './ui'

const stats = new Stats()
document.body.append(stats.dom)

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x87ceeb);
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.set(-32, 16, -32)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(16, 0, 16)
controls.update()

const scene = new THREE.Scene()
const world = new World()
world.generate()
scene.add(world)

function setUpLights() {
  const sun = new THREE.DirectionalLight()
  sun.position.set(50, 50, 50)
  sun.castShadow = true
  sun.shadow.camera.left = -50
  sun.shadow.camera.right = 50
  sun.shadow.camera.bottom = -50
  sun.shadow.camera.top = 50
  sun.shadow.camera.near = 0.1
  sun.shadow.camera.far = 100
  sun.shadow.bias = -0.0005
  // sun.shadow.mapSixe = new THREE.Vector2(256, 256)
  sun.shadow.mapSixe = new THREE.Vector2(512, 512)
  // sun.shadow.mapSixe = new THREE.Vector2(2048, 2048)
  scene.add(sun)

  const shadowHelper = new THREE.CameraHelper(sun.shadow.camera)
  scene.add(shadowHelper)

  const ambient = new THREE.AmbientLight()
  ambient.intensity = 0.1
  scene.add(ambient)
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  stats.update()
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth / window.innerHeight)
})

setUpLights()
createUI(world)
animate()