let active = false,
    mouseX,
    mouseY,
    deltaY,
    deltaX;

const colors = {
    wood: 0x8b5a2b,
    leaves: 0x1c4502,
    forrest: 0x1c4552,
    bridge: 0x777777
};
const FORREST_WIDTH = 2000;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 20, 100);

const globalLight = new THREE.AmbientLight(0xffffff, 0.1);
const shadowLight = new THREE.DirectionalLight(0xffffff);
shadowLight.position.set(10, 10, 10).normalize();
shadowLight.castShadow = true;
scene.add(globalLight);
scene.add(shadowLight);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#2286E8");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const forrestGeometry = new THREE.PlaneGeometry(
    FORREST_WIDTH,
    FORREST_WIDTH,
    10,
    10
);
const forrestTexture = new THREE.TextureLoader().load(
    "./forest-floor-terrain_0046_01_S_thr.jpg"
);
forrestTexture.wrapS = THREE.RepeatWrapping;
forrestTexture.wrapT = THREE.RepeatWrapping;
forrestTexture.repeat.set(150, 150);
const forrestMaterial = new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    map: forrestTexture
});
const forrest = new THREE.Mesh(forrestGeometry, forrestMaterial);
forrest.rotation.x = Math.PI / 2;
forrest.receiveShadow = true;
scene.fog = new THREE.Fog(0x2286e8, 1, 800);
scene.add(forrest);

createTrees(350);
createBridge(30, 15, 155);

renderer.render(scene, camera);