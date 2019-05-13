const coordinateX = 0;
const coordinateZ = 0;

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
    slab.rotation.x = Math.PI / 2;
    slab.add(createRamp(width, length, height, 1)); //czwarty parametr odpowiada za umieszczenie podjazdu z przodu lub tyłu płyty głównej
    slab.add(createRamp(width, length, height, -1));
    return slab;
}

const createRamp = (width, length, height, front) => {

    const rampGeometry = new THREE.BoxGeometry(width, height * 1.5, 3);
    const rampMaterial = new THREE.MeshStandardMaterial({
        color: 0x777777,
        flatShading: true,
        side: THREE.DoubleSide
    });
    const rampY = front * (length / 2 + height / 2);
    const rampZ = height / 2;
    const ramp = new THREE.Mesh(rampGeometry, rampMaterial);
    ramp.position.set(0, rampY, rampZ);
    ramp.rotation.x = front * (Math.PI / 4);
    ramp.rotation.y = Math.PI;
    return ramp;
}

const createSpan = (width, length, height, i) => {

    const position = i / (spansAmount + 1);
    const spanGeometry = new THREE.BoxGeometry(width, 3, height);
    const spanMaterial = new THREE.MeshStandardMaterial({
        color: 0x777777,
        flatShading: true,
        side: THREE.DoubleSide
    });
    const span = new THREE.Mesh(spanGeometry, spanMaterial);
    span.rotation.x = Math.PI / 2;
    span.position.x = width / 2;
    span.position.y = height / 2;
    span.position.z = length * position;
    return span;
}

const createBridge = (height, width, length, spansAmount) => {
    bridge = new THREE.Group();
    bridge.add(createColumn(coordinateX, coordinateZ, height));
    bridge.add(
        createColumn(coordinateX + width, coordinateZ, height)
    );
    bridge.add(
        createColumn(
            coordinateX + width,
            coordinateZ + length,
            height
        )
    );
    bridge.add(
        createColumn(coordinateX, coordinateZ + length, height)
    );
    bridge.add(
        createSlab(
            (coordinateX + coordinateX + width) / 2,
            (coordinateZ * 2 + length) / 2,
            width + 8,
            length + 8,
            height
        )
    );
    for (let i = 1; i <= spansAmount; i++)
        bridge.add(createSpan(width, length, height, i));
    scene.add(bridge);
}


rebuildBridge = () => {
    scene.remove(bridge);
    createBridge(bridgeHeight, bridgeWidth, bridgeLenght, spansAmount);
    renderer.render(scene, camera);
}