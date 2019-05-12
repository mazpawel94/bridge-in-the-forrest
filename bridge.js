const coordinateX = 20;
const coordinateZ = 10;

const createColumn = (x, z, height) => {
    const columnGeometry = new THREE.CylinderGeometry(4, 4, height, 4);
    const columnMaterial = new THREE.MeshStandardMaterial({
        color: colors.bridge,
        flatShading: true
    });
    const column = new THREE.Mesh(columnGeometry, columnMaterial);
    column.position.y = height / 2;
    column.position.x = x;
    column.position.z = z;
    column.rotation.y = Math.PI / 4;
    return column;
}


const createSlab = (x, z, width, length, height) => {
    const slabGeometry = new THREE.BoxGeometry(width, length, 3);
    const slabMaterial = new THREE.MeshStandardMaterial({
        color: 0x777777,
        flatShading: true,
        side: THREE.DoubleSide
    });
    const slab = new THREE.Mesh(slabGeometry, slabMaterial);
    slab.position.y = height;
    slab.position.x = x;
    slab.position.z = z;
    slab.rotation.x = 3.14159265358979 / 2;
    return slab;
}

const createBridge = (height, length, width) => {
    scene.add(createColumn(coordinateX, coordinateZ, height));
    scene.add(
        createColumn(coordinateX + length, coordinateZ, height)
    );
    scene.add(
        createColumn(
            coordinateX + length,
            coordinateZ + width,
            height
        )
    );
    scene.add(
        createColumn(coordinateX, coordinateZ + width, height)
    );
    scene.add(
        createSlab(
            (coordinateX + coordinateX + length) / 2,
            (coordinateZ * 2 + width) / 2,
            length + 8,
            width + 8,
            height
        )
    );
}