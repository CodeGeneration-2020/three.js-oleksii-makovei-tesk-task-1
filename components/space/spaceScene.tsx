import * as THREE from "three";
import { useRef, useEffect, useState } from "react";

import getCamera from "../../utils/camera";
import createStars from "../../utils/stars";
import { animate, initScene } from "../../utils/cameraTools";
import createSkybox from "../../utils/createSkyBox";
import Modal from "../modal/modal";
import checkIfStarIsClicked from "../../utils/starClick";

const SpaceScene = () => {
  const canvasRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedStar, setClickedStar] = useState<THREE.Mesh | null>(null);

  useEffect(() => {
    const { scene, renderer } = initScene(canvasRef);
    createSkybox(scene);

    const camera = getCamera();

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    createStars(scene, canvasRef.current as any, camera);

    animate(renderer, scene, camera);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function handleClick(event: any) {
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
        setClickedStar(star);
        setIsModalOpen(true);
      }
    }

    if (canvasRef.current) {
      (canvasRef.current as any).addEventListener("click", handleClick);
    }

    return () => {
      if (canvasRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        (canvasRef.current as any).removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        {clickedStar && (
          <>
            <h2>Star Information</h2>
            <p>
              Position:{" "}
              {`x: ${clickedStar.position.x.toFixed(
                2
              )}, y: ${clickedStar.position.y.toFixed(
                2
              )}, z: ${clickedStar.position.z.toFixed(2)}`}
            </p>
            <p>Color: {clickedStar.userData.color}</p>
            <span>
              Here might be info about the payload according to the data from
              the star
            </span>
          </>
        )}
      </Modal>
    </>
  );
};
export default SpaceScene;
