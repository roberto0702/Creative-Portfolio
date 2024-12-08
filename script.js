
// Import Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// Scene, Camera, Renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#jello-bg"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Plane Geometry with BufferAttributes
const geometry = new THREE.PlaneGeometry(10, 10, 40, 40);
const material = new THREE.MeshStandardMaterial({
  color: 0x3399ff,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 0, 5);
scene.add(light);

// Animation Function
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now() * 0.001;
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);

    const waveX = 0.5 * Math.sin(x + time);
    const waveY = 0.5 * Math.sin(y + time);

    position.setZ(i, waveX + waveY);
  }

  position.needsUpdate = true;
  renderer.render(scene, camera);
}

// Scroll Animation using GSAP
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY * 0.005;
  gsap.to(mesh.rotation, {
    x: scrollY,
    y: scrollY,
    duration: 1.5,
    ease: "power2.out",
  });
});

// Responsive Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();
