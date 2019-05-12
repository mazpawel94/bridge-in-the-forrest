
window.addEventListener("keydown", e => {
    if (e.keyCode == 37) camera.position.x -= 1;
    if (e.keyCode == 39) camera.position.x += 1;
    if (e.keyCode == 40) camera.position.y -= 1;
    if (e.keyCode == 38) camera.position.y += 1;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

window.addEventListener("mousedown", e => {
    active = true;
    clientX = e.clientX;
    clientY = e.clientY;
});

window.addEventListener("mouseup", e => {
    active = false;
});

window.addEventListener("wheel", e => {
    const sign = Math.sign(e.deltaY);
    camera.position.z += sign * 10;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

window.addEventListener("mousemove", e => {
    if (active) {
        deltaY = e.clientY - clientY;
        deltaX = e.clientX - clientX;
        Math.abs(deltaX) > Math.abs(deltaY)
            ? (camera.rotation.y += deltaX > 0 ? 0.03 : -0.03)
            : (camera.rotation.x += deltaY > 0 ? 0.03 : -0.03);

        clientY = e.clientY;
        clientX = e.clientX;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.set(80, 100, 25);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});