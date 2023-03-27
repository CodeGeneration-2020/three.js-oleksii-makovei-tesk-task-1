import * as THREE from "three";
import { farPlane, fieldOfView, nearPlane } from "../config/config";

const getCamera = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;

  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.z = 50;
  return camera;
};

export default getCamera;
