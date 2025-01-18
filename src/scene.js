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

    //shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.maxDistance = 20;
    controls.minDistance = 10;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;

    let terrain = [];
    let buildings = [];


    // some functions
    function initialize(city) {
        scene.clear();
        terrain = [];
        buildings = [];

        setUpLights();
        for (let x = 0; x < city.size; x++) {
            let column = []
            for (let y = 0; y < city.size; y++) {
                const terrainGeometry = new THREE.BoxGeometry(1, 1, 1);
                const terrainMaterial = new THREE.MeshLambertMaterial({ color: 0x00AA00 });
                const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
                terrainMesh.position.set(x, -0.5, y);

                terrainMesh.receiveShadow = true;
                scene.add(terrainMesh);
                column.push(terrainMesh);
            }

            terrain.push(column);
            buildings.push([...Array(city.size)]);
        }
    }

    function update(city) {
        for (let x = 0; x < city.size; x++) {
            for (let y = 0; y < city.size; y++) {
                const building = city.data[x][y].building;
                if (building && building.startsWith('building')){
                    const height = Number(building.slice(-1));
                    const geo = new THREE.BoxGeometry(1, height, 1);
                    const mat = new THREE.MeshLambertMaterial({ color: 0x777777 });
                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.position.set(x, height / 2, y);
                    mesh.castShadow = true;

                    if(buildings[x][y]){
                        scene.remove(buildings[x][y]);
                    }

                    scene.add(mesh);
                    buildings[x][y] = mesh;
                }
                
            }

        }
    }

    function setUpLights() {
        const lightings = [
            null,
            new THREE.AmbientLight(0xFFFFFF, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
        ];

        lightings[1].position.set(0, 1, 0);
        lightings[1].castShadow = true;
        lightings[2].position.set(10, 10, 0);
        lightings[2].castShadow = true;
        lightings[3].position.set(0, 10, 10);
        lightings[3].castShadow = true;

        scene.add(...lightings);
    }

    function draw() {
        controls.update();
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
        update,
    }
}