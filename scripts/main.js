import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { World } from './world'

const stats = new Stats()
document.body.append(stats.dom)

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x87ceeb);
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
  const light1 = new THREE.DirectionalLight()
  light1.position.set(1, 1, 1)
  scene.add(light1)
  
  const light2 = new THREE.DirectionalLight()
  light2.position.set(-1, 1, -0.5)
  scene.add(light2)
  
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
animate()