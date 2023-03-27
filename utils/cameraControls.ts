import * as THREE from "three";
import { KEYBOARD_KEYS } from "../lib/constants";

const cameraControls = ({
  camera,
  targetPosition,
  moveSpeed,
}: {
  camera: THREE.Camera;
  targetPosition: any;
  moveSpeed: number;
}) => {
  document.addEventListener("keydown", (event) => {
    const direction = new THREE.Vector3();

    switch (event.key.toLowerCase()) {
      case KEYBOARD_KEYS.UP:
        camera.getWorldDirection(direction);
        targetPosition.addScaledVector(direction, moveSpeed);
        break;
      case KEYBOARD_KEYS.DOWN:
        camera.getWorldDirection(direction);
        targetPosition.addScaledVector(direction, -moveSpeed);
        break;
      case KEYBOARD_KEYS.LEFT:
        camera.getWorldDirection(direction);
        direction.cross(camera.up);
        targetPosition.addScaledVector(direction, -moveSpeed);
        break;
      case KEYBOARD_KEYS.RIGHT:
        camera.getWorldDirection(direction);
        direction.cross(camera.up);
        targetPosition.addScaledVector(direction, moveSpeed);
        break;
    }
  });
};

export default cameraControls;
