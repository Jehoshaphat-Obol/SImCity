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
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let tile = data[x][y];
                if(Math.random() < 0.01){
                    if(tile.buildingId == undefined){
                        tile.buildingId = 'building-1';
                    }else if(tile.buildingId == 'building-1'){
                        tile.buildingId = 'building-2';
                    }else if(tile.buildingId == 'building-2'){
                        tile.buildingId = 'building-3';
                    }
                }

                data[x][y] = tile;
            }
        }
    }

    function createTile(x, y){
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