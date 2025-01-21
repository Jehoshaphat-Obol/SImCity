import { createScene } from './scene.js';
import { createCity } from './city.js';

export function createGame() {
    const scene = createScene();
    const city = createCity(16);
    let activeToolId = '';

    scene.initialize(city);
    scene.onObjectSelected = (selectedObject) => {
        let {x, y} = selectedObject.userData;
        let tile = city.data[x][y];

        if(activeToolId == "bulldoze"){
            // remove the building
            tile.buildingId = undefined;
            scene.update(city);
        }else if(!tile.buildingId){
            // add the building
            tile.buildingId = activeToolId;
            scene.update(city);
        }
    }
    window.scene = scene;

    const game = {
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolId(toolId){
            activeToolId = toolId
        }

    }
    setInterval(()=>{
        game.update();
    }, 1000)

    scene.start();

    window.addEventListener('mousedown',scene.onMouseDown.bind(scene));

    return game;
}