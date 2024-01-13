import * as THREE from 'three';
import {STLLoader} from '/node_modules/three/examples/jsm/loaders/STLLoader.js';

const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,1,1000);
cam.position.set(0,0,10);

console.log("scene set")

const rend=new THREE.WebGLRenderer();
rend.setSize(window.innerWidth,window.innerHeight);
//document.body.appendChild(rend.domElement);
document.getElementById("model-container").appendChild(rend.domElement);

console.log("appended to HTML element")

const loader=new STLLoader();
var mesh
loader.load('/enterprise.stl',function(geometry){
    const material=new THREE.MeshBasicMaterial({color:0x00ff00});
    mesh=new THREE.Mesh(geometry,material);
    mesh.rotation.x=-Math.PI/4;
    scene.add(mesh);
    mesh.material = new THREE.MeshPhongMaterial({ color: 'blueviolet' });
});

console.log("STL loaded with geometry and material")

const lighting=new THREE.AmbientLight(0x404040);
scene.add(lighting);
const dirlighting=new THREE.DirectionalLight(0xffffff);
dirlighting.position.set(1,1,1).normalize();
scene.add(dirlighting);

console.log("lighting set")

cam.position.z = 35;

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.z+=0.01;
    rend.render(scene, cam);
}

animate();
