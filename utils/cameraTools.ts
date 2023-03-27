import * as THREE from "three";
import {
  lightPositionX,
  lightPositionY,
  lightPositionZ,
} from "../config/config";
import { overallColors } from "../theme/colors";

export const initScene = (canvasRef: any) => {
  const scene = new THREE.Scene();

  const light = new THREE.PointLight(overallColors.white, 1, 0);
  light.position.set(lightPositionX, lightPositionY, lightPositionZ);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.current as any,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  return { scene, renderer };
};

export const animate = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
) => {
  requestAnimationFrame(() => animate(renderer, scene, camera));
  renderer.render(scene, camera);
};
