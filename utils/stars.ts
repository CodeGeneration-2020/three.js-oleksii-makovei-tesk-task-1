import * as THREE from "three";
import { STARS_AMOUNT, STAR_RADIUS, zoneBoundaries } from "../config/config";
import cameraControls from "./cameraControls";
import getColorForPosition from "./getColorForPositon";
import checkIfStarIsClicked from "./starClick";
import starColors from "./starColors";

const createStarShape = () => {
  const shape = new THREE.Shape();

  const numPoints = 5;
  const outerRadius = STAR_RADIUS;
  const innerRadius = STAR_RADIUS / 2;
  const angle = Math.PI / numPoints;

  for (let i = 0; i < 2 * numPoints; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = r * Math.cos(i * angle);
    const y = r * Math.sin(i * angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
};

const starShape = createStarShape();
const extrudeSettings = { depth: STAR_RADIUS / 2, bevelEnabled: false };

const createAndInjectStars = (scene: THREE.Scene) => {
  new Array(STARS_AMOUNT).fill(0).forEach(() => {
    const star = new THREE.Mesh(
      new THREE.ExtrudeGeometry(starShape, extrudeSettings),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    const position = new THREE.Vector3(
      Math.random() * 1000 - 500,
      Math.random() * 1000 - 500,
      Math.random() * 1000 - 500
    );
    star.position.copy(position);
    const color = getColorForPosition(position, zoneBoundaries);

    let blendFactor = 0;

    Object.entries(zoneBoundaries).map(([zoneKey, zone]) => {
      const xDistance = Math.min(
        Math.abs(position.x - zone.xMin),
        Math.abs(position.x - zone.xMax)
      );
      const yDistance = Math.min(
        Math.abs(position.y - zone.yMin),
        Math.abs(position.y - zone.yMax)
      );
      const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
      const zoneBlendFactor = Math.max(0.17, 1.5 - distance / 130);
      blendFactor += zoneBlendFactor;
      if (zoneBlendFactor > 0) {
        star.material.color.set(starColors[zoneKey as keyof typeof starColors]);
      }
    });

    if (blendFactor > 0) {
      star.material.color.lerp(new THREE.Color(color), blendFactor);
    }

    star.userData = { color, isStar: true };
    star.geometry.addEventListener("click", () => {
      console.log(star);
    });

    scene.add(star);
  });
};

const configureLight = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
};

const createStars = (
  scene: THREE.Scene,
  canvas: HTMLCanvasElement,
  camera: THREE.Camera
) => {
  let isMoving = false;

  let mouseX = 0;
  let mouseY = 0;

  configureLight(scene);

  createAndInjectStars(scene);

  canvas.addEventListener("mousemove", (event) => {
    if (!isMoving) return;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const isStarClicked = checkIfStarIsClicked(
      event,
      mouse,
      camera,
      raycaster,
      scene
    );

    if (isStarClicked) {
      const intersects = raycaster.intersectObjects(scene.children, true);
      const star = intersects[0].object as THREE.Mesh;
      if (star) return;
    }

    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;
    mouseX = event.clientX;
    mouseY = event.clientY;

    const rotationX = -deltaY * 0.01;
    const rotationY = -deltaX * 0.01;

    const quaternionX = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      rotationX
    );
    const quaternionY = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      rotationY
    );

    camera.quaternion.multiply(quaternionX);
    camera.quaternion.multiply(quaternionY);
  });

  canvas.addEventListener("mousedown", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    isMoving = true;
  });

  canvas.addEventListener("mouseup", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    isMoving = false;
  });

  const moveSpeed = 10;
  const targetPosition = new THREE.Vector3();

  cameraControls({ camera, targetPosition, moveSpeed });

  const animate = () => {
    const easing = 0.1;
    camera.position.lerp(targetPosition, easing);

    requestAnimationFrame(animate);
  };

  animate();
  return null;
};
export default createStars;
