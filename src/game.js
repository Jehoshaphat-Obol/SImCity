import { createScene } from './scene.js';
import { createCity } from './city.js';

export function createGame() {
    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city);
    scene.onObjectSelected = (selectedObject) => {
        console.log(selectedObject);
    }
    window.scene = scene;

    const game = {
        update() {
            city.update();
            scene.update(city);
        }

    }
    setInterval(()=>{
        game.update();
    }, 1000)

    scene.start();

    window.addEventListener('mousedown',scene.onMouseDown.bind(scene));
}