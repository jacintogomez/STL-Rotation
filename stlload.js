import * as THREE from 'three';
import {STLLoader} from '/node_modules/three/examples/jsm/loaders/STLLoader.js';

const scenes=[];
const cams=[];
const rends=[];
const numcontainers=3;

for(let i=0;i<numcontainers;i++){
    const scene=new THREE.Scene();
    const cam=new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,1,1000);
    cam.position.set(0,0,10);
    const rend=new THREE.WebGLRenderer();
    rend.domElement.style.width='100%';
    rend.domElement.style.height='100%';
    document.getElementById('mc'+(i+1)).appendChild(rend.domElement);
    scenes.push(scene);
    cams.push(cam);
    rends.push(rend);
}

const stlfiles=['/enterprise.stl','/enterprise.stl','/enterprise.stl'];
const meshes=[];

for(let i=0;i<numcontainers;i++){
    const loader=new STLLoader();
    loader.load(stlfiles[i],function(geometry){
        const material=new THREE.MeshPhongMaterial({color:'blue'});
        const mesh=new THREE.Mesh(geometry,material);
        mesh.rotation.x=-Math.PI/4;
        scenes[i].add(mesh);
        meshes.push(mesh);
    });
}

const lightings=[];
const dirlightings=[];

for(let i=0;i<numcontainers;i++){
    const lighting=new THREE.AmbientLight(0x404040);
    scenes[i].add(lighting);
    lightings.push(lighting);
    const dirlighting=new THREE.DirectionalLight(0xffffff);
    dirlighting.position.set(1,1,1).normalize();
    scenes[i].add(dirlighting);
    dirlightings.push(dirlightings);
}

for(let i=0;i<numcontainers;i++){cams[i].position.z=35;}

function animate(){
    requestAnimationFrame(animate);
    meshes.forEach(mesh=>{
        mesh.rotation.z+=0.01;
    });
    rends.forEach((rend,i)=>{
        rend.render(scenes[i],cams[i]);
    });
}

animate();
// const loader=new STLLoader();
// var mesh
//
// loader.load('/enterprise.stl',function(geometry){
//     const material=new THREE.MeshBasicMaterial({color:0x00ff00});
//     mesh=new THREE.Mesh(geometry,material);
//     mesh.rotation.x=-Math.PI/4;
//     scene.add(mesh);
//     mesh.material = new THREE.MeshPhongMaterial({ color: 'blue' });
// });
//
// console.log("STL loaded with geometry and material")
//
// const lighting=new THREE.AmbientLight(0x404040);
// scene.add(lighting);
// const dirlighting=new THREE.DirectionalLight(0xffffff);
// dirlighting.position.set(1,1,1).normalize();
// scene.add(dirlighting);
//
// console.log("lighting set")
//
// cam.position.z=35;
//
// function animate() {
//     requestAnimationFrame(animate);
//     mesh.rotation.z+=0.01;
//     rend.render(scene, cam);
// }
//
// animate();
