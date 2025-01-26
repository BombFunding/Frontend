import { useEffect } from "react";
import * as THREE from "three";

const ThreeJSApp = () => {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";

    if (window.innerWidth > 800) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    document.body.appendChild(renderer.domElement);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    const camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 8, 14);

    const scene = new THREE.Scene();
    const city = new THREE.Object3D();
    const smoke = new THREE.Object3D();
    const town = new THREE.Object3D();

    scene.add(city);
    city.add(smoke);
    city.add(town);

    const setcolor = 0xff7517;
    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(
      new THREE.Color(setcolor).multiplyScalar(0.5),
      10,
      16
    );

    const mathRandom = (num = 8) => -Math.random() * num + Math.random() * num;

    const colors = ["#020212", "#000000"];

    const init = () => {
      const segments = 2;

      for (let i = 1; i < 400; i++) {
        const width = Math.random() * 0.5 + 0.5;
        const height = Math.random() * 1.5 + 1;
        const depth = Math.random() * 0.5 + 0.5;

        const geometry = new THREE.BoxGeometry(
          width,
          height,
          depth,
          segments,
          segments,
          segments
        );

        const color = colors[Math.floor(Math.random() * colors.length)];
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          wireframe: false,
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;

        const wireframeGeometry = new THREE.EdgesGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
          color: 0x525151,
        });
        const wireframe = new THREE.LineSegments(
          wireframeGeometry,
          wireframeMaterial
        );
        cube.add(wireframe);

        const numWindowsX = Math.min(
          Math.random() < 0.5 ? 3 : 4,
          Math.floor(width / 0.2)
        );
        const numWindowsY = Math.floor(height / 0.2);

        const windowGeometry = new THREE.PlaneGeometry(0.1, 0.1);
        const windowMaterial = new THREE.MeshBasicMaterial({
          color: 0x525151,
        });

        const faces = [0, 1, 2, 3];

        faces.forEach((faceIndex) => {
          const faceWidth = faceIndex < 2 ? width : depth;

          for (let x = 0; x < numWindowsX; x++) {
            for (let y = 0; y < numWindowsY; y++) {
              const window = new THREE.Mesh(windowGeometry, windowMaterial);

              const offsetX =
                -faceWidth / 2 + (x + 0.5) * (faceWidth / numWindowsX);
              const offsetY = -height / 2 + (y + 0.5) * 0.2;

              if (faceIndex === 0)
                window.position.set(offsetX, offsetY, depth / 2 + 0.01);
              if (faceIndex === 1)
                window.position.set(offsetX, offsetY, -depth / 2 - 0.01);
              if (faceIndex === 2)
                window.position.set(width / 2 + 0.01, offsetY, offsetX);
              if (faceIndex === 3)
                window.position.set(-width / 2 - 0.01, offsetY, offsetX);

              if (faceIndex === 2 || faceIndex === 3)
                window.rotation.y = Math.PI / 2;

              cube.add(window);
            }
          }
        });

        const posX = Math.random() * 20 - 10;
        const posZ = Math.random() * 20 - 10;

        cube.position.set(posX, height / 2, posZ);

        town.add(cube);
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
      pelement.rotation.x = (-90 * Math.PI) / 180;
      pelement.position.y = -0.001;
      pelement.receiveShadow = true;

      city.add(pelement);
    };

    const mouse = new THREE.Vector2();
    const onMouseMove = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    const lightFront = new THREE.SpotLight(0xffffff, 20, 10);
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;

    scene.add(ambientLight);
    city.add(lightFront);

     const animate = () => {
      requestAnimationFrame(animate);

      city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * 0.001;

      const minRotationX = -0.05;
       const maxRotationX = 0.1;
      city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * 0.001;
      city.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, city.rotation.x));

      smoke.rotation.y += 0.01;

      camera.lookAt(city.position);
      renderer.render(scene, camera);
    };


    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);

      document.body.removeChild(renderer.domElement);
      renderer.dispose();

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return null;
};

export default ThreeJSApp;
