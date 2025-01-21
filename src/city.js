import * as THREE from 'three';

export function createCity(size) {
    let data = [];

    initialize();

    function initialize() {
        for (let x = 0; x < size; x++) {
            let column = []
            for (let y = 0; y < size; y++) {
                const tile = createTile(x, y);
                column.push(tile);
            }
            data.push(column);
        }
    }


    function update() {

    }

    function createTile(x, y) {
        return {
            x,
            y,
            buildingId: undefined,
            terrainId: 'grass',
        };
    }

    return {
        size,
        data,
        update,
    }
}