import * as THREE from 'three';

export function createCity(size) {
    let data = [];

    initialize();

    function initialize() {
        for (let x = 0; x < size; x++) {
            let column = []
            for (let y = 0; y < size; y++) {
                const tile = {
                    x,
                    y,
                    building: undefined,
                };
                column.push(tile);
            }
            data.push(column);
        }
    }

        
    function update() {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let tile = data[x][y];
                if(Math.random() < 0.01){
                    if(tile.building == undefined){
                        tile.building = 'building-1';
                    }else if(tile.building == 'building-1'){
                        tile.building = 'building-2';
                    }else if(tile.build == 'building-2'){
                        tile.building = 'building-3';
                    }
                }

                data[x][y] = tile;
            }
        }
    }

    return {
        size,
        data,
        update,
    }
}