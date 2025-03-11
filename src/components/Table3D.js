import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Table3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // === Scene ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);

    // === Camera ===
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 20, 30);

    // === Renderer ===
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // === Orbit Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // === Lights ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // === Table ===
    const tableGeometry = new THREE.BoxGeometry(20, 1, 10);
    const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.y = 0;
    scene.add(table);

    // === Floor (optional) ===
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.51;
    scene.add(floor);

    // === Drop Item Handler ===
    const handleDrop = (event) => {
      event.preventDefault();
      const src = event.dataTransfer.getData('item-src');
      if (!src) return;

      const loader = new THREE.TextureLoader();
      loader.load(src, (texture) => {
        const box = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const item = new THREE.Mesh(box, material);
        item.position.set(Math.random() * 10 - 5, 2, Math.random() * 5 - 2.5);
        scene.add(item);
      });
    };

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    renderer.domElement.addEventListener('drop', handleDrop);
    renderer.domElement.addEventListener('dragover', handleDragOver);

    // === Animation Loop ===
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // === Resize Handler ===
    const handleResize = () => {
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // === Cleanup ===
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('drop', handleDrop);
      renderer.domElement.removeEventListener('dragover', handleDragOver);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default Table3D;
