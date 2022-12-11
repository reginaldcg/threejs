import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


/* Base
*/
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/* Object
*/
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* Sizes
*/
const sizes = {
  width: 800,
  height: 600,
};

/* Camera
*/
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/* Renderer
*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/* Animate
*/
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();


/*
PERSPECTIVE CAMERA:

  The `PerspectiveCamera` class requires parameters to be instantiated.

    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      sizes.width / sizes.height, // Aspect ratio
      1, // Near clipping plane
      100 // Far clipping plane
    );
    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 2;
    camera.lookAt(mesh.position);
    scene.add(camera);


FIELD OF VIEW:

  The first parameter, field-of-view, correspond to our camera view's `vertical amplitude angle` via degrees. A small angle, will end with a longer scope effect. A wide angle will end up with a fish eye effect. Note: between 45 and 75 generally works best.


ASPECT RATIO:

  The second parameter, aspect ratio, correspond to the width divided by the height saved in an object.


NEAR AND FAR:

  The third and fourth parameters, near and far, correspond to how close and how far the camera can see. Any part (or part-of) an object that is closer to the camera; nearer or further away, will not show up on the render. Note: 0.1 and 100.


ORTHOGRAPHIC CAMERA:

  The `OrthographicCamera` is used to create orthographic renders of our scene without perspective. Useful in making a RTS game such as Age of Empires. Elements will have equal size on the screen, regardless of camera distance. The `OrthographicCamera` differs from `PerspectiveCamera` solely by the lack of perspective. In other words, objects will have equal sizes regardless of camera distance.

    const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0.1, 100)

  Create a variable named `aspectRatio` and store said ratio.

    const aspectRatio = sizes.width / sizes.height
    const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

  To control the camera with our mouse, we need mouse coordinates. Use native JavaScript by listening to the `mousemove` event in unison with `addEventListener`. Coordinates are located in the argument of the callback function as `event.clientX` and `event.clientY`:

    Cursor
    window.addEventListener("mousemove", (event) => {
      console.log(event.clientX, event.clientY);
    });


JAVASCRIPT:

  Adjust, as needed, for an amplitude of `1`. Note: Value may be negative or positive.

    Value of `x`:
      cursor = LEFT = -0.5
      cursor = CNTR = +0.0
      cursor = RGHT = +0.5

  Create a cursor variable with a default `x` and `y` properties. Then update said properties via a `mousemove` callback:
  
    const cursor = {
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;

      console.log(cursor.x, cursor.y);
    });


BUILT-IN:

  `DeviceOrientationControls`: DeviceOrientationControls will automatically retrieve the device orientation if your device, OS, and browser allow it and rotate the camera accordingly. You can use it to create immersive universes or VR experiences if you have the right equipment.
  `FlyControls`: FlyControls enable moving the camera like if you were on a spaceship. You can rotate on all 3 axes, go forward and go backward.
  `FirstPersonControls`: FirstPersonControls is just like FlyControls, but with a fixed up axis. You can see that like a flying bird view where the bird cannot do a barrel roll. While the FirstPersonControls contains "FirstPerson," it doesn't work like in FPS games
  `PointerLockControls`: PointerLockControls uses the pointer lock JavaScript API. This API hides the cursor, keeps it centered, and keeps sending the movements in the mousemove event callback. With this API, you can create FPS games right inside the browser. While this class sounds very promising if you want to create that kind of interaction, it'll only handle the camera rotation when the pointer is locked. You'll have to handle the camera position and game physics by yourself.
  `OrbitControls`: OrbitControls is very similar to the controls we made in the previous lesson. You can rotate around a point with the left mouse, translate laterally using the right mouse, and zoom in or out using the wheel.
  `TrackballControls`: TrackballControls is just like OrbitControls but there are no limits in terms of vertical angle. You can keep rotating and do spins with the camera even if the scene gets upside down.
  `TransformControls`: TransformControls has nothing to do with the camera. You can use it to add a gizmo to an object to move that object.
  `DragControls`: Just like the TransformControls, DragControls has nothing to do with the camera. You can use it to move objects on a plane facing the camera by drag and dropping them.
*/
