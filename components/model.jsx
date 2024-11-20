import { useGLTF, Text, MeshTransmissionMaterial, DragControls, OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import { useControls } from 'leva';
import { useTransform } from 'framer-motion';

function Model({ mouse }) {
  const mesh = useRef();
  const { nodes } = useGLTF("/medias/bubble.glb");
  const { viewport } = useThree();

  const materialProps = {
    thickness: 0.2,
    roughness: 0,
    transmission: 1,
    ior: 1,
    chromaticAberration: 0.02,
    backside: true,
  };

  useFrame(() => {
    if (mesh.current) {
      // Rotate based on mouse position
      const rotationX = (mouse.y.get() - 0.5) * Math.PI * 0.02; // Adjust Y-axis rotation
      const rotationY = (mouse.x.get() - 0.5) * Math.PI * 0.02; // Adjust X-axis rotation

      mesh.current.rotation.x += rotationX;
      mesh.current.rotation.y += rotationY;
      mesh.current.rotation.z += 0.019; // Constant Z-axis rotation
      // mesh.current.rotation.y += 0.019;
      // mesh.current.rotation.y += 0.019;
    }
  });

  return (
    <group scale={viewport.width / 10}>
      <Text fontSize={0.35} position={[0, 0, 1.25]}>
        Hadeya Ikram
      </Text>
      <mesh ref={mesh} geometry={nodes.Icosphere.geometry}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

export default Model;