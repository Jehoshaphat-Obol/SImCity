import * as THREE from 'three';

export function createCity(size) {
    let data = [];

    function initialize() {
        for (let x = 0; x < size; x++) {
            let column = []
            for (let y = 0; y < size; y++) {
                const tile = { x, y };
                column.push(tile);
            }
            data.push(column);
        }
    }

    return {
        size,
        data
    }
}