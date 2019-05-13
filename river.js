function CustomSinCurve(scale) {
    THREE.Curve.call(this);

    this.scale = scale === undefined ? 1 : scale;
}

createRiver = () => {

    CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
    CustomSinCurve.prototype.constructor = CustomSinCurve;

    CustomSinCurve.prototype.getPoint = function (t) {
        const tx = t * 20;
        const ty = Math.sin(2 * Math.PI * t) - Math.cos((Math.PI / 2) * t);
        return new THREE.Vector3(tx, ty, 0).multiplyScalar(this.scale);
    };
    const path = new CustomSinCurve(100);
    const geometry = new THREE.TubeGeometry(path, 40, 20, 20);

    const material = new THREE.MeshBasicMaterial({ color: colors.water });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(-1000, -15, 120);
    return mesh;
}


