import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/style.scss'


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(document.body.clientWidth, document.body.clientHeight );
document.body.appendChild( renderer.domElement );

//Sphere Properties
let texture = new THREE.TextureLoader().load('src/images/2_no_clouds_16k.jpg');
let bump = new THREE.TextureLoader().load('src/images/EarthBump.jpg');
let specular = new THREE.TextureLoader().load('src/images/EarthSpec.png');

let geometry = new THREE.SphereGeometry(0.5, 32, 32);
let material = new THREE.MeshPhongMaterial({
  map: texture,
  bumpMap: bump,
  bumpScale: 0.005,
  specularMap: specular,
  specular: new THREE.Color(0x111111),
  shininess: 50,
});
let sphere = new THREE.Mesh ( geometry, material );
sphere.rotation.x = 38.3;
sphere.rotation.y = 43.5;

scene.add( sphere );

camera.position.z = 1.3;

// Light
// scene.add(new THREE.AmbientLight(0x333333));
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,3,5);
scene.add(light);

//Star Field
let stars = new THREE.TextureLoader().load('src/images/galaxy_starfield.png');
stars.mapping = THREE.SphericalReflectionMapping;
stars.wrapS = THREE.RepeatWrapping;
stars.wrapT = THREE.RepeatWrapping;
stars.repeat.set( 8, 6 );

let space = new THREE.Mesh(
              new THREE.SphereGeometry(90, 64, 64),
              new THREE.MeshBasicMaterial({
                map: stars,
                side: THREE.BackSide
              })
            );
scene.add(space);


//resize canvas
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//controls

// let controls = new THREE.OrbitControls(camera);
let spin = 0.001;

function animate() {
  // controls.update();
  sphere.rotation.y += spin;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
