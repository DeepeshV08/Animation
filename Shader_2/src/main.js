import gsap from "gsap";
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader, RGBELoader } from "three/examples/jsm/Addons.js";

// -------------------- SIZE --------------------
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// -------------------- SCENE --------------------
const scene = new THREE.Scene();
const clock = new THREE.Clock();

// -------------------- TEXTURES --------------------
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load(
  "https://images.unsplash.com/photo-1777356363419-1f38e0f05700?q=80&w=774&auto=format&fit=crop",
);

const texture2 = textureLoader.load(
  "https://images.unsplash.com/photo-1777464888411-9b7ef6366d67?q=80&w=1325&auto=format&fit=crop",
);

// -------------------- ENV MAP --------------------
const envMap = new RGBELoader();
envMap.load("./envMap.hdr", (hdr) => {
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = hdr;
});

// -------------------- CAMERA --------------------
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100
);
camera.position.z = 2;

// -------------------- LIGHTS --------------------
scene.add(new THREE.AmbientLight("#ffffff", 1.2));

// -------------------- GEOMETRY --------------------
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// -------------------- SHADER MATERIAL --------------------
const material = new THREE.ShaderMaterial({
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;

    uniform sampler2D uTexA;
    uniform sampler2D uTexB;
    uniform float uProgress;

    vec3 permute(vec3 x) {
      return mod(((x*34.0)+1.0)*x, 289.0);
    }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.2113, 0.3660, -0.5773, 0.02439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.7928 - 0.8537 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;

      vec2 dir = normalize(vec2(0.5, 0.8));

      float ripple = sin(uProgress * 3.1415) * 0.05;

      float gradient = dot(uv - 0.5, dir) + 0.5;

      float n = snoise(uv * 6.0) * 0.25;

      float localGradient = gradient + n;

      float edge = 0.06;

      float sweep = uProgress * (1.0 + edge * 2.0) - edge;

      float mixer = smoothstep(localGradient - edge, localGradient + edge, sweep);

      vec2 uvA = uv - dir * ripple;
      vec2 uvB = uv + dir * ripple;

      vec4 colorA = texture2D(uTexA, uvA);
      vec4 colorB = texture2D(uTexB, uvB);

      gl_FragColor = mix(colorA, colorB, mixer);
    }
  `,
  uniforms: {
    uTime: { value: 0 },
    uTexA: { value: texture },
    uTexB: { value: texture2 },
    uProgress: { value: 0.0 },
  },
  side: THREE.DoubleSide,
});

// -------------------- MESH --------------------
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// -------------------- RAYCASTER --------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// click interaction
window.addEventListener("click", () => {
  raycaster.setFromCamera(mouse, camera);
  const intersect = raycaster.intersectObject(cube);

  if (intersect.length > 0) {
    gsap.to(material.uniforms.uProgress, {
      value: 1,
      duration: 5,
      ease: "power3.out",
    });
  }
});

// -------------------- CANVAS (FIXED CRASH HERE) --------------------
const canvas = document.querySelector("canvas");

if (!canvas) {
  throw new Error("Canvas not found. Make sure <canvas> exists in HTML before this script runs.");
}

// -------------------- RENDERER --------------------
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(window.devicePixelRatio);

// -------------------- CONTROLS --------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// -------------------- RESIZE --------------------
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
});

// -------------------- ANIMATE LOOP --------------------
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;

  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};

animate();