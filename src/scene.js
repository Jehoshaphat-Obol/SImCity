import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createAsset } from './assets.js';

export function createScene() {
    // initial scene setup
    const gameWindow = document.getElementById('render-target');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.add(new THREE.AxesHelper(4));

    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
    
    camera.position.set(20,11, 0);
    
    const initialLookAt = new THREE.Vector3(10, 1, 10); 
    camera.lookAt(initialLookAt)
    
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


    // ray casting
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let selectedObject = undefined;
    let onObjectSelected = undefined;

    // some functions
    function initialize(city) {
        scene.clear();
        terrain = [];
        buildings = [];
        setUpLights();
        for (let x = 0; x < city.size; x++) {
            let column = []
            for (let y = 0; y < city.size; y++) {
                let grass = createAsset('grass', x, y);
                scene.add(grass);
                column.push(grass);
            }

            terrain.push(column);
            buildings.push([...Array(city.size)]);
        }

    }

    function update(city) {
        for (let x = 0; x < city.size; x++) {
            for (let y = 0; y < city.size; y++) {
                const currentBuilding = buildings[x][y]?.userData.id;
                const newBuilding = city.data[x][y].buildingId;

                // if player removes a building from city model, remove from the scene
                if(!newBuilding && currentBuilding){
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = undefined;
                }

                // if the city data model is updated, update the mesh
                if(newBuilding && (newBuilding !== currentBuilding)){
                    let mesh = createAsset(newBuilding, x, y);
                    
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = mesh;

                    scene.add(buildings[x][y]);
                }
            }

        }
    }

    function setUpLights() {
        const lightings = [
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

    function onMouseDown(event){
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        
        let intersects = raycaster.intersectObjects(scene.children, false);

        if(intersects.length > 0){
            selectedObject ? selectedObject.material.emissive.setHex(0) : null;

            selectedObject = intersects[0].object;

            selectedObject.material.emissive.setHex(0x555555);
        
            if(this.onObjectSelected){
                this.onObjectSelected(selectedObject);
            }
        }
    }

    return {
        start,
        stop,
        initialize,
        update,
        onMouseDown,
        onObjectSelected,
    }
}