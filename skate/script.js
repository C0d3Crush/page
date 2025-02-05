let scene, camera, renderer, skater, ramp, world, skaterBody;
let canJump = false;
let velocity = 5;
const keys = {};

// Initialize the game
function init() {
  if (!window.WebGLRenderingContext) {
    alert('Your browser does not support WebGL');
    return;
  }

  // Create scene, camera, and renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true }); // Added antialiasing
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Set up Cannon.js physics world
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0); // Gravity towards negative Y-axis
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  // Create a grid to help visualize the scene
  const gridHelper = new THREE.GridHelper(50, 50);
  scene.add(gridHelper);

  // Create the skater (a simple box)
  const skaterGeometry = new THREE.BoxGeometry(1, 0.2, 0.5);
  const skaterMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  skater = new THREE.Mesh(skaterGeometry, skaterMaterial);
  skater.position.set(0, 1, 0);
  scene.add(skater);

  // Cannon.js body for the skater
  const skaterShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.1, 0.25));
  skaterBody = new CANNON.Body({ mass: 1 });
  skaterBody.addShape(skaterShape);
  skaterBody.position.set(0, 1, 0);
  world.addBody(skaterBody);

  // Create the ramp
  const rampGeometry = new THREE.PlaneGeometry(10, 10);
  const rampMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  ramp = new THREE.Mesh(rampGeometry, rampMaterial);
  ramp.rotation.x = -Math.PI / 4;
  ramp.position.set(0, -1, -5);
  scene.add(ramp);

  // Cannon.js body for ramp
  const rampShape = new CANNON.Plane();
  const rampBody = new CANNON.Body({ mass: 0 });
  rampBody.addShape(rampShape);
  rampBody.position.set(0, -1, -5);
  rampBody.quaternion.setFromEuler(-Math.PI / 4, 0, 0);
  world.addBody(rampBody);

  // Set camera position and look at the skater
  camera.position.set(0, 5, 15);
  camera.lookAt(0, 1, 0);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7.5).normalize();
  scene.add(directionalLight);

  // Event listeners for keyboard and mouse controls
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  document.addEventListener('mousedown', handleMouseClick);
}

// Handle keyboard inputs
function handleKeyDown(event) {
  keys[event.code] = true;
}

function handleKeyUp(event) {
  keys[event.code] = false;
}

// Handle mouse click for jump
function handleMouseClick(event) {
  if (canJump) {
    skaterBody.velocity.y = 5; // Jump velocity
    canJump = false;
  }
}

// Main animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update physics
  world.step(1 / 60);

  // Sync skater's position with physics body
  skater.position.copy(skaterBody.position);
  skater.quaternion.copy(skaterBody.quaternion);

  // Move the skater with keyboard input
  const moveSpeed = 5;
  if (keys['ArrowUp']) skaterBody.velocity.z = -moveSpeed; // Forward
  if (keys['ArrowDown']) skaterBody.velocity.z = moveSpeed; // Backward
  if (keys['ArrowLeft']) skaterBody.velocity.x = -moveSpeed; // Left
  if (keys['ArrowRight']) skaterBody.velocity.x = moveSpeed; // Right

  // Apply friction
  skaterBody.velocity.x *= 0.98;
  skaterBody.velocity.z *= 0.98;

  // Check if skater is on the ground to allow jumping again
  if (skaterBody.position.y <= 1.01) {
    canJump = true;
  }

  // Update camera to follow skater
  camera.position.lerp(
    new THREE.Vector3(skater.position.x, skater.position.y + 5, skater.position.z + 15),
    0.05
  );
  camera.lookAt(skater.position);

  // Render the scene
  renderer.render(scene, camera);
}

// Initialize and start animation loop
init();
animate();
