import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {Renderer} from 'three/examples/jsm/postprocessing/RenderPass.js'


// shader for god rays of light through fog
const godRayShader = {


    uniforms: {},

    vertexShader: ``,
    fragmentShader: ``
}




/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//** create fog */
const fogColor = new THREE.Color(0x000000);
const nearFog = 1;
const farFog = 100;
scene.fog = new THREE.Fog(fogColor, nearFog, farFog);


/**
 * Lights
 */

//const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
//scene.add(directionalLight)


const light = new THREE.SpotLight(0xffffff, 1);
light.position.set(0, 10, 0);
light.angle = Math.PI / 4;
light.penumbra = 0.5;
light.decay = 2;
light.distance = 50;
scene.add(light);
const lightHelper = new THREE.SpotLightHelper(light);
scene.add(lightHelper);


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)


const planeMaterial = new THREE.MeshStandardMaterial()
planeMaterial.roughness = 0.4
planeMaterial.color = 'white'
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
scene.add(cube, plane)


function createSpotLight(){

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 2, 2);
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 500;
    spotLight.shadow.camera.fov = 30;

    //scene.add(spotLight);
}

function createLineMath(){




}

const particleSetOne = []
const particleSetTwo = []

function createParticles(){


}





/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

camera.position.set(-0.0367778152660409, -0.04173980824294908, 2.7135458646651416);



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // ==== update objects ====

    // rotate cube
    cube.rotation.y = 0.1 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
   


   
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

function initialize() {
    //createSpotLight();
    //createParticles();
    tick();
}

initialize()
