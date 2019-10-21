let fs = require('fs');
let path = require('path');

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

let camera, scene, renderer, mesh, cav;
let loader;

function init(canvas, url) {

    camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
    camera.position.set(0, 10, 35);
    camera.up.set(0, 0, 1);

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0x666666);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0x887766);
    directionalLight.position.set(-1, 1, 1).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(512, 512);
    renderer.setClearColor(new THREE.Color(0x000000));

    loader = new THREE.MMDLoader();
    loader.loadModel(url, (obj) => {
        mesh = obj;
        scene.add(mesh);
    }, null, null, path.dirname(url) + '/', path.extname(url).substring(1));
}

function animate() {
    if (!cav) return;
    if (!document.body.contains(cav)) {
        scene.remove(mesh);
        mesh.dispose();
        renderer.dispose();
        cav = camera = scene = renderer = mesh = loader = null;
        return;
    }
    scene.rotation.y = new Date().getTime() * 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

module.exports = {
    createMmd(canvas, url) {
        cav = canvas;
        init(canvas, url);
        animate();
    },
    infoMmd(url) {
        try {
            loader = new THREE.MMDLoader();
            let model = loader.parseModel(toArrayBuffer(fs.readFileSync(url)), path.extname(url).substring(1));
            return {
                name: model.metadata.modelName,
                comment: model.metadata.comment
            }
        } catch (e) {
            console.error(e)
        } finally {
        }
    }
};