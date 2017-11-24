var camera;
var scene;
var renderer;
var controls;
var spotLight;
var counter = 0;
var sphere;
var objsArray = [];

//var pierrot = new Audio('images/Pierrot_1-1.mp3');
var ligeti = new Audio('sounds/Ligeti.mp3');

init();
animate();

// setTimeout(function(){
//   animate();
// }, 3000);





function init() {
  console.log(ligeti);
  ligeti.currentTime = 4;
  ligeti.play();
  //pierrot.play();
	// Create a scene
    scene = new THREE.Scene();

	// Add the camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 250, 400);

    // Add scene elements
    addSceneElements();

    // Add lights
    addLights();

	// Create the WebGL Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.setClearColor( 'rgb(10,5,30)' );

    // Append the renderer to the body
    document.body.appendChild( renderer.domElement );

    // Add a resize event listener
    window.addEventListener( 'resize', onWindowResize, false );

    // Add the orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 100, 0);
}

function addLights() {

    // var ambientLight = new THREE.AmbientLight( 'rgb(50,25,150)');
    // scene.add( ambientLight, 5 );

    var directionalLight = new THREE.DirectionalLight( 'rgb(50,25,150)', 2 );
    scene.add( directionalLight );

    var light = new THREE.PointLight( 'rgb(200,100,50)', 8, 1000 );
    light.position.set( -500, 0 , 500 );
    scene.add( light );
    scene.add(new THREE.PointLightHelper(light, 3));



    // spotLight = new THREE.SpotLight(0xffffff, 10, 310, 0.5, 500);
    //
    // spotLight.position.set( -500, 0, 100);
    //
    // var targetObject = new THREE.Object3D();
    // scene.add(targetObject);
    //
    // spotLight.target = targetObject;
    //
    // scene.add(spotLight);
    //
    //
    // spotLight.target.position.x = 20;
    // spotLight.target.position.y = 50;
    // spotLight.target.position.z = -100;
    // scene.add( targetObject );
    //
    // scene.add(new THREE.PointLightHelper(spotLight, 1));
    // //
    // var hemLight = new THREE.HemisphereLight(0xffe5bb, 0xFFBF00, 0.1);
    // scene.add(hemLight);
}

function addSceneElements() {
    // Create a cube used to build the floor and walls
    var cube = new THREE.BoxGeometry( 200, 1, 200);

    // create different materials

    var redMat = new THREE.MeshPhongMaterial( { color: 0xff3300, specular: 0x555555, shininess: 30 } );
    var purpleMat = new THREE.MeshPhongMaterial( { color: 0x6F6CC5, specular: 0x555555, shininess: 30 } );
    var greenMat = new THREE.MeshPhongMaterial( { color: 'rgb(20,200,120)', specular: 0x555555, shininess: 30 } );
    var yellowMat = new THREE.MeshPhongMaterial( { color: 'rgb(200,220,120)', specular: 0x555555, shininess: 30 } );

    var shadowMaterial = new THREE.ShadowMaterial( { color: 0xeeeeee } );
    shadowMaterial.opacity = 0.5;
    var groundMesh = new THREE.Mesh(
        new THREE.BoxGeometry( 100, 0.1, 100 ),
        shadowMaterial
    );
    groundMesh.receiveShadow = true;
    scene.add( groundMesh );




      for (let i = 0; i < 500; i++) {
          const obj = new myObject();
          obj.setShape();
          objsArray.push(obj);
          scene.add(obj.shape);
      }
    // Sphere
    // sphere = new THREE.Mesh(new THREE.SphereGeometry(20, 70, 20), redMat);
    // sphere.position.set(70, 25, -20);
    // scene.add(sphere);
    //
    // // Knot thingy
    // var knot = new THREE.Mesh(new THREE.TorusKnotGeometry( 40, 3, 100, 16), purpleMat);
    // knot.position.set(0, 60, 30);
    // scene.add(knot);
}





function animate() {

	  renderer.render( scene, camera );
    requestAnimationFrame( animate );
    controls.update();

    counter += 0.05;
    // spotLight.target.position.x = Math.sin(counter) * 100;

    // moveSphere();
    objsArray.forEach(obj => {
      obj.move();
    });

}










// function to move sphere
// function moveSphere() {
//   if (sphere.position.z <= -100) {
//     comesClose = true;
//     goesFar = false;
//   } else if (sphere.position.z >= 80) {
//     goesFar = true;
//     comesClose = false;
//   }
//   if (goesFar) {
//     sphere.position.z--;
//   } else {
//     sphere.position.z++;
//   }
//
//   if (sphere.position.x >= 80) {
//     goesLeft = true;
//     goesRight = false;
//   } else if (sphere.position.x <= -80) {
//     goesLeft = false;
//     goesRight = true;
//   }
//   if (goesLeft) {
//     sphere.position.x-= 2;
//   } else {
//     sphere.position.x+= 2;
//   }
//
//   if (sphere.position.y <= 25) {
//     goesUp = true;
//     goesDown = false;
//   } else if (sphere.position.y >= 100) {
//     goesUp = false;
//     goesDown = true;
//   }
//   if (goesUp) {
//     sphere.position.y += 1;
//   } else if (goesDown) {
//     sphere.position.y -= 2;
//   }
// }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
