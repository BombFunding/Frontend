import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const City3D = () => {
  const city3DRef = useRef(null);

  useEffect(() => {
    // Three.js Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9); // Adjust size to 90% of viewport
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      20,
      (window.innerWidth * 0.9) / (window.innerHeight * 0.9),
      1,
      500
    );
    camera.position.set(0, 2, 14);

    const city3DObject = new THREE.Object3D();
    const city3DSmoke = new THREE.Object3D();
    const city3DTown = new THREE.Object3D();

    scene.add(city3DObject);
    city3DObject.add(city3DSmoke);
    city3DObject.add(city3DTown);

    scene.background = new THREE.Color(0x0C0C42);
    scene.fog = new THREE.Fog(0xFF7517, 10, 16);
// const colors = [
//   '#FF7517',  
//   '#024CAA',  
//   '#821131',  
//   '#C7253E',  
//   '#E2A701', 
//   '#556B2F',
//   '#87A922',  
//   '#9B3922',  
//   '#0C084B',  
// ];
    const mathRandom = (num = 8) => -Math.random() * num + Math.random() * num;

    const setTintColor = (() => {
      let setTintNum = true;
      return () => {
        setTintNum = !setTintNum;
        return setTintNum ? 0x000000 : 0x222222;
      };
    })();

    const initCity3D = () => {
      for (let i = 1; i < 100; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: setTintColor(),
        });
        const wireMaterial = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.03,
        });

        const cube = new THREE.Mesh(geometry, material);
        const wire = new THREE.Mesh(geometry, wireMaterial);

        cube.add(wire);
        cube.castShadow = true;
        cube.receiveShadow = true;

        cube.scale.y = 0.1 + Math.abs(mathRandom(8));
        cube.position.set(mathRandom(), 0, mathRandom());

        city3DTown.add(cube);
      }
    };

    const initCity3DSmoke = () => {
      const smokeMaterial = new THREE.MeshToonMaterial({
        color: 0xffff00,
      });
      const smokeGeometry = new THREE.CircleGeometry(0.01, 3);

      for (let i = 0; i < 300; i++) {
        const particle = new THREE.Mesh(smokeGeometry, smokeMaterial);
        particle.position.set(mathRandom(5), mathRandom(5), mathRandom(5));
        city3DSmoke.add(particle);
      }
    };

    const initCity3DGround = () => {
      const groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        opacity: 0.9,
        transparent: true,
      });
      const groundGeometry = new THREE.PlaneGeometry(60, 60);
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.001;
      ground.receiveShadow = true;
      city3DObject.add(ground);
    };

    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(5, 5, 5);
    spotLight.castShadow = true;

    scene.add(ambientLight);
    scene.add(spotLight);

    // Mouse Interaction
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      city3DObject.rotation.y += (mouse.x * 0.1 - city3DObject.rotation.y) * 0.05;
      city3DObject.rotation.x += (-mouse.y * 0.1 - city3DObject.rotation.x) * 0.05;

      if (city3DObject.rotation.x < -0.05) city3DObject.rotation.x = -0.05;
      if (city3DObject.rotation.x > 0.1) city3DObject.rotation.x = 0.1;

      city3DSmoke.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    const onResize = () => {
      camera.aspect = (window.innerWidth * 0.9) / (window.innerHeight * 0.9);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
    };
    window.addEventListener("resize", onResize);

    // Append renderer to DOM
    if (city3DRef.current) {
      city3DRef.current.appendChild(renderer.domElement);
    }

    initCity3D();
    initCity3DSmoke();
    initCity3DGround();
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (city3DRef.current) {
        city3DRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        ref={city3DRef}
        style={{
          width: "90%",
          height: "90%",
          border: "2px solid #ccc",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default City3D;
