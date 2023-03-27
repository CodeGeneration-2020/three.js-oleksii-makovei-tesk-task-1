const checkIfStarIsClicked = (
  event: any,
  mouse: THREE.Vector2,
  camera: THREE.Camera,
  raycaster: THREE.Raycaster,
  scene: THREE.Scene
) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0 && intersects[0].object.userData.isStar) {
    return true;
  }
  return false;
};

export default checkIfStarIsClicked;
