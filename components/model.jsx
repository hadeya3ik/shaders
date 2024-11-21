import { useGLTF, MeshTransmissionMaterial, DragControls, OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import { useControls } from 'leva';
import { useTransform } from 'framer-motion';

function Model({ mouse }) {
  const mesh = useRef();
  const { nodes } = useGLTF("/medias/bubble.glb");
  const { viewport } = useThree();

  // const materialProps = {
  //   thickness: 0.2,
  //   roughness: 0,
  //   transmission: 1,
  //   ior: 1,
  //   chromaticAberration: 0.02,
  //   backside: true,
  // };

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });

  useFrame(() => {
    if (mesh.current) {
      const rotationX = (mouse.y.get() - 0.5) * Math.PI * 0.015;
      const rotationY = (mouse.x.get() - 0.5) * Math.PI * 0.015;

      mesh.current.rotation.x += rotationX;
      mesh.current.rotation.y += rotationY;
      mesh.current.rotation.z += 0.019; 
    }
  });

  return (
    <group scale={viewport.width / 10}>
      <mesh ref={mesh} geometry={nodes.Icosphere.geometry}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

export default Model;