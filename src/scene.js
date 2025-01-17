import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.172.0/build/three.module.js';

export function createScene() {
    // initial scene setup
    const gameWindow = document.getElementById('render-target');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight,0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    // test object
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshBasicMaterial({color: 0xFFFF00});
    const mesh = new THREE.Mesh(geo, mat);

    scene.add(mesh);
    console.log(scene);

    // some functions
    function draw(){
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        mesh.rotation.z += 0.01;
        renderer.render(scene, camera);
    }

    function start(){
        renderer.setAnimationLoop(draw);
    }

    function stop(){
        renderer.setAnimationLoop(null);
    }

    return {
        start,
        stop,
    }
}