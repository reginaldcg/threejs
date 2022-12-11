import "./style.css";

import * as THREE from "three";

// CANVAS
const canvas = document.querySelector("canvas.webgl");

// SCENE
const scene = new THREE.Scene();

// OBJECT
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// SIZES
const sizes = {
  width: 800,
  height: 600,
};

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/*
ANIMATION:

  Animations are nonstop. We move objects by rendering an equal amount. The more we move between renders, the faster objects appear to move. Every screen runs at a specific frequency. E.g., Frame rates. Most screens, generally, run at 60 frames per second. Mathematically, this means 1 frame equals 16 ms. However, some screens may run much faster. E.g., 120 fps. We want to execute a function that will move objects and render each frame REGARDLESS of frame rates. Let's use the `window.requestAnimationFrame(...)` method.


USING `requestAnimationFrame`:

  The primary purpose of `requestAnimationFrame` is not to run on each frame but to execute a function provided on the next frame. If this function also uses `requestAnimationFrame` to execute said same function on the next frame; then we end with our function being executed forever on each frame. Create a function named `loop` and call this function once. In this function, use `window.requestAnimationFrame(...)` to call said same function on the next frame:

    const loop = () => {
      console.log('loop') // debugging

      mesh.rotation.y += 0.01; // Update objects
      renderer.render(scene, camera); // Render

      window.requestAnimationFrame(loop); // Avoid calling `loop()` but instead provide as a parameter.
    };

    loop();


ADAPTING TO THE FRAMERATE:

  To adapt an animation to the framerate, we need to know how much time it's been since the last loop. First, we need a way to measure time. We can use `Date.now()` for a current timestamp.

    const time = Date.now();

  We now need to subtract the current timestamp to that of the previous frame to be able to get `deltaTime` when animating objects.

    let time = Date.now();

    const loop = () => {

    const currentTime = Date.now(); // Time
    const deltaTime = currentTime - time;
    time = currentTime;

    mesh.rotation.y += 0.001 * deltaTime; // Update objects

    renderer.render(scene, camera); // Render
    window.requestAnimationFrame(loop);
    };

    loop();

  Now that we've based the rotation on the time spent since the last frame; the rotation speed will now be identical across all users regardless of unique frame rates.


USING CLOCK:

  There's a built-in solution in Three.js named `Clock` that handles time calculations. We instantiate a `Clock` variable in unison with any built-in methods such as `getElapsedTime()`. This method returns how many seconds have passed since the `Clock` was created. Use this value to rotate the object:

    const clock = new THREE.Clock();

    const loop = () => {
      const elapsedTime = clock.getElapsedTime();

      mesh.rotation.y = elapsedTime; // Update objects
      // mesh.position.x = Math.cos(elapsedTime);
      // mesh.position.y = Math.sin(elapsedTime);

      renderer.render(scene, camera); // Render

      window.requestAnimationFrame(loop);
    };

    loop();
*/