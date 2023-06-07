import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import helvetiker from "./helvetiker_regular.typeface.json";
import * as TWEEN from "@tweenjs/tween.js";
import { LoadingSpinner } from "../components/molecules/loading-spinner";

export class Scene {
  root: HTMLElement;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  textobj!: THREE.Mesh;

  constructor(attachmentNode: HTMLElement) {
    this.root = attachmentNode;
  }

  zoom(dir = 10) {
    const pos = new THREE.Vector3().copy(this.camera.position);
    const topos = new THREE.Vector3(0, 0, pos.z + dir);

    new TWEEN.Tween(pos)
      .to(topos, 1000)
      .easing(TWEEN.Easing.Back.InOut)
      .onUpdate(() => {
        this.camera.position.copy(pos);
      })
      .onComplete(() => {
        this.camera.position.copy(topos);
      })
      .start();
  }

  translate(amt:number) {
    const pos = new THREE.Vector3().copy(this.textobj.position);
    const topos = new THREE.Vector3(this.textobj.position.x+amt, 0, 0);

    new TWEEN.Tween(pos)
      .to(topos, 1000)
      .easing(TWEEN.Easing.Back.InOut)
      .onUpdate(() => {
        this.textobj.position.copy(pos);
      })
      .onComplete(() => {
        this.textobj.position.copy(topos);
      })
      .start();
  }

  run() {
    console.log("running THREE");
    this.scene = new THREE.Scene();

    const fov = 75;
    const aspect = window.innerHeight / window.innerWidth;
    const near = 1;
    const far = 10000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.root.appendChild(this.renderer.domElement);

    const width = 1;
    const height = 1;
    const depth = 1;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0x205090 });
    const cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);

    this.camera.position.z = 1000;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      TWEEN.update();

      this.renderer.render(this.scene, this.camera);
    };

    window.addEventListener("keydown", (evt: KeyboardEvent) => {
      switch (evt.key) {
        case "w":
          this.zoom(800);
          break;
        case "s":
          this.zoom(-800);
          break;
        case "a":
          this.translate(-200);
          break;
        case "d":
          this.translate(200);
          break;
      }
    });

    const font = new Font(helvetiker);

    const textgeometry = new TextGeometry("Hello, World!", {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    this.textobj = new THREE.Mesh(textgeometry, material);
    this.textobj.position.copy(new THREE.Vector3(-200, 0, 0));
    this.textobj.rotation.z += 2*Math.PI;

    this.scene.add(this.textobj);

    animate();
  }
}
