import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeJSApp = () => {
  useEffect(() => {
    // Basic parameters
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerWidth > 800) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.needsUpdate = true;
    }
    document.body.appendChild(renderer.domElement);

    // Define onWindowResize function
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
    // camera.position.set(0, 2, 14);
  camera.position.set(0, 10.8, 10); // دوربین بالاتر و دورتر

    const scene = new THREE.Scene();
    const city = new THREE.Object3D();
    const smoke = new THREE.Object3D();
    const town = new THREE.Object3D();

    const uSpeed = 0.001;

    // Fog background
const setcolor = 0xFF7517;
scene.background = new THREE.Color(setcolor);

// برای رقیق‌تر کردن مه، مقدار رنگ را کاهش می‌دهیم
const fogColor = new THREE.Color(setcolor).multiplyScalar(0.5); // کاهش شدت رنگ به نصف

scene.fog = new THREE.Fog(fogColor, 10, 16);  // استفاده از رنگ رقیق‌شده برای مه

    // Random function
    const mathRandom = (num = 8) => {
      return -Math.random() * num + Math.random() * num;
    };

    // Change building colors
    let setTintNum = true;
    const setTintColor = () => {
      let setColor;
      if (setTintNum) {
        setTintNum = false;
        setColor = 0x000000;
      } else {
        setTintNum = true;
        setColor = 0x000000;
      }
      return setColor;
    };

      const colors = [
      '#020212',  
      // '#04041f',
      '#000000',  
      '#02021f',
      '#00001a',
      '#000000',  
      '#000000',  
      '#000000',  
        '#0c111c',
        '#0f131c',
      
    ];

    // Function to create buildings
    const init = () => {
      const segments = 2;

      for (let i = 1; i < 400; i++) {
        const width = Math.random() * 0.5 + 0.5; // Random width
        const height = Math.random() * 1.5 + 1; // Random height
        const depth = Math.random() * 0.5 + 0.5; // Random depth
        const geometry = new THREE.BoxGeometry(width, height, depth, segments, segments, segments);

        // Randomly pick a color from the list
        const color = colors[Math.floor(Math.random() * colors.length)];
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          wireframe: false,
        });

        const cube = new THREE.Mesh(geometry, material);

        cube.castShadow = true;
        cube.receiveShadow = true;

        // Positioning cubes with overlap
        const posX = Math.random() * 20 - 10; // Random X position
        const posZ = Math.random() * 20 - 10; // Random Z position

        cube.position.set(posX, height / 2, posZ);

        town.add(cube); // Add cube to the city
      }

      // Particle system (smoke)
      const gmaterial = new THREE.MeshToonMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
      const gparticular = new THREE.CircleGeometry(0.01, 3);
      const aparticular = 5;

      for (let h = 1; h < 300; h++) {
        const particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(mathRandom(aparticular), mathRandom(aparticular), mathRandom(aparticular));
        particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
        smoke.add(particular);
      }

      const pmaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        roughness: 10,
        metalness: 0.6,
        opacity: 0.9,
        transparent: true,
      });
      const pgeometry = new THREE.PlaneGeometry(60, 60);
      const pelement = new THREE.Mesh(pgeometry, pmaterial);
      pelement.rotation.x = -90 * Math.PI / 180;
      pelement.position.y = -0.001;
      pelement.receiveShadow = true;

      city.add(pelement);
    };

    // Mouse move function
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, false);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
    const lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
    const lightBack = new THREE.PointLight(0xFFFFFF, 0.5);

    lightFront.rotation.x = 45 * Math.PI / 180;
    lightFront.rotation.z = -45 * Math.PI / 180;
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 6000;
    lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0, 6, 0);

    smoke.position.y = 2;

    scene.add(ambientLight);
    city.add(lightFront);
    scene.add(lightBack);
    scene.add(city);
    city.add(smoke);
    city.add(town);

    // Add grid helper
    const gridHelper = new THREE.GridHelper(60, 120, 0xFF0000, 0x000000);
    city.add(gridHelper);

    // Animate function
    const animate = () => {
      const time = Date.now() * 0.00005;
      requestAnimationFrame(animate);

      city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
      city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
      if (city.rotation.x < -0.05) city.rotation.x = -0.05;
      else if (city.rotation.x > 1) city.rotation.x = 1;

      smoke.rotation.y += 0.01;
      smoke.rotation.x += 0.01;

      camera.lookAt(city.position);
      renderer.render(scene, camera);
    };

    init();
    animate();
  }, []);

  return <div />;
};

export default ThreeJSApp;
