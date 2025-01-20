import * as THREE from 'three';
const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
    'grass': (x, y) => {
        const mat = new THREE.MeshLambertMaterial({ color: 0x339933 });
        const mesh = new THREE.Mesh(geometry, mat);
        mesh.position.set(x, -0.5, y);
        mesh.receiveShadow = true;

        mesh.userData = {'id': 'grass', x, y};
        return mesh;
    },
    'building-1': (x, y) => {
        const height = 1;
        const mat = new THREE.MeshLambertMaterial({ color: 0xbbbb55 });
        const mesh = new THREE.Mesh(geometry, mat);
        mesh.position.set(x, height / 2, y);
        mesh.scale.set(1, height, 1);
        mesh.castShadow = true;

        mesh.userData = {'id': 'building-1', x, y};
        return mesh;
    },
    'building-2': (x, y) => {
        const height = 2;
        const mat = new THREE.MeshLambertMaterial({ color: 0xbb5555 });
        const mesh = new THREE.Mesh(geometry, mat);
        mesh.position.set(x, height / 2, y);
        mesh.scale.set(1, height, 1);
        mesh.castShadow = true;

        mesh.userData = {'id': 'building-2', x, y};

        return mesh;
    },
    'building-3': (x, y) => {
        const height = 3;
        const mat = new THREE.MeshLambertMaterial({ color: 0x5555bb });
        const mesh = new THREE.Mesh(geometry, mat);
        mesh.position.set(x, height / 2, y);
        mesh.scale.set(1, height, 1);
        mesh.castShadow = true;

        mesh.userData = {'id': 'building-3', x, y};
        return mesh;
    },
}

export function createAsset(assetId, x, y) {
    if(assetId in assets){
        return assets[assetId](x, y);
    }
    return undefined;
}