import * as THREE from "three";
import { anisotropy, skyboxSize } from "../config/config";
import { SKYBOX_CUBE } from "../lib/skyboxConstans";

const createSkybox = (scene: THREE.Scene) => {
  const skyboxGeometry = new THREE.BoxGeometry(
    skyboxSize,
    skyboxSize,
    skyboxSize
  );
  const skyboxMaterialArray = [
    ...Object.values(SKYBOX_CUBE).map((val) => val),
  ].map((image) => {
    const texture = new THREE.TextureLoader().load(image);
    texture.anisotropy = anisotropy;

    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });
  });

  const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterialArray);
  scene.add(skybox);
};

export default createSkybox;
