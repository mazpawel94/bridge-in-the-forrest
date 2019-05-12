const createTreeCrown = (x, z) => {
    let crownGeometry;
    if (x % 2 === 0)
        crownGeometry = new THREE.SphereBufferGeometry(7, 32, 6);
    else
        crownGeometry = new THREE.CylinderGeometry(3, 7, 14, 25);
    const crownMaterial = new THREE.MeshStandardMaterial({
        color: colors.leaves
    });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 23;
    crown.position.x = x;
    crown.position.z = z;
    scene.add(crown);
};

const createTreeTrunk = (x, z) => {
    const trunkGeometry = new THREE.CylinderGeometry(2, 2.4, 26, 32);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: colors.wood,
        flatShading: true
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.x = x;
    trunk.position.y = 13;
    trunk.position.z = z;
    scene.add(trunk);
};

const createTree = (x, z) => {
    createTreeTrunk(x, z);
    createTreeCrown(x, z);
};

const createTrees = amout => {
    for (let i = 0; i < amout; i++)
        createTree(
            Math.floor(Math.random() * FORREST_WIDTH) - FORREST_WIDTH / 2,
            Math.floor(Math.random() * FORREST_WIDTH) - FORREST_WIDTH / 2
        );
}