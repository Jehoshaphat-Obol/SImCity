import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createScene() {
    // initial scene setup
    const gameWindow = document.getElementById('render-target');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.add(new THREE.AxesHelper(4));

    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
    camera.position.set(9, 9, 9);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);


    //controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.maxDistance = 20;
    controls.minDistance = 10;

    let meshes = [];


    // some functions
    function initialize(city) {
        scene.clear();
        setUpLights();
        for (let x = 0; x < city.size; x++) {
            let column = []
            for (let y = 0; y < city.size; y++) {
                // test object
                const geo = new THREE.BoxGeometry(1, 1, 1);
                const mat = new THREE.MeshLambertMaterial({ color: 0x00AA00 });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(x, 0, y);
                scene.add(mesh);
                column.push(mesh);
            }

            meshes.push(column);
        }
    }

    function setUpLights(){
        const lightings = [
            new THREE.AmbientLight(0xFFFFFF, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
        ];

        lightings[1].position.set(0,1,0);
        lightings[2].position.set(1,1,0);
        lightings[3].position.set(0,1,1);

        scene.add(...lightings);
    }

    function draw() {
        renderer.render(scene, camera);
    }

    function start() {
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }

    return {
        start,
        stop,
        initialize,
    }
}