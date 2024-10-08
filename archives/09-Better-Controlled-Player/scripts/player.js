import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

export class Player {
  maxSpeed = 10
  input = new THREE.Vector3()
  velocity = new THREE.Vector3()
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200)
  controls = new PointerLockControls(this.camera, document.body)

  /**
   * @param {THREE.Scene} scene 
   */

  constructor(scene) {
    this.position.set(32, 16, 32)
    scene.add(this.camera)
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    document.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  applyInputs(dt) {
    if (this.controls.isLocked) {
      this.velocity.x = this.input.x
      this.velocity.z = this.input.z
      this.controls.moveRight(this.velocity.x * dt)
      this.controls.moveForward(this.velocity.z * dt)
      document.getElementById('player-position').innerHTML = this.toString()
    }
  }

  /**
   * @type {THREE.Vector3}
   */
  get position() {
    return this.camera.position
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    if (!this.controls.isLocked) {
      this.controls.lock()
    }
    switch (event.code) {
      case 'KeyW':
        this.input.z = this.maxSpeed
        break
      case 'KeyA':
        this.input.x = -this.maxSpeed
        break
      case 'KeyS':
        this.input.z = -this.maxSpeed
        break
      case 'KeyD':
        this.input.x = this.maxSpeed
        break
    }
  }
  
  /**
   * @param {KeyboardEvent} event
   */
  onKeyUp(event) {
    switch (event.code) {
      case 'KeyW':
        this.input.z = 0
        break
      case 'KeyA':
        this.input.x = 0
        break
      case 'KeyS':
        this.input.z = 0
        break
      case 'KeyD':
        this.input.x = 0
        break
    }
  }

  /**
   * Returns player position
   * @returns (string)
   */
  toString() {
    let str = ''
    str += `X: ${this.position.x.toFixed(3)}`
    str += `Y: ${this.position.y.toFixed(3)}`
    str += `X: ${this.position.z.toFixed(3)}`
    return str
  }
}