import { useGLTF, MeshTransmissionMaterial, Text, DragControls, OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react'
import { useControls } from 'leva';
import { useTransform } from 'framer-motion';
import {useMotionValue} from 'framer-motion'

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

  // const materialProps = useControls({
  //   thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
  //   roughness: { value: 0, min: 0, max: 1, step: 0.1 },
  //   transmission: { value: 1, min: 0, max: 1, step: 0.1 },
  //   ior: { value: 1, min: 0, max: 3, step: 0.1 },
  //   chromaticAberration: { value: 0.02, min: 0, max: 1 },
  //   backside: { value: true },
  // });

  useFrame(() => {
    if (mesh.current) {
      const rotationX = (mouse.y.get() - 0.5) * Math.PI * 0.009;
      const rotationY = (mouse.x.get() - 0.5) * Math.PI * 0.009;

      mesh.current.rotation.x += rotationX;
      mesh.current.rotation.y += rotationY;
      mesh.current.rotation.z += 0.009; 
    }
  });

  useEffect(() => {console.log(viewport)}, [viewport])

  return (
    // <group scale={ viewport.width / 10}>
    //  <group scale={viewport.width > 22  ? viewport.width / 19 : viewport.width / 11}> 
     <group scale={Math.max(0.9, viewport.width / 20)}> 
    {/* <group scale={viewport.width / 10}> */}
      <Text position={[0, 0, 1.25]} color="White" font="fonts/PPNeueMontreal-Book.otf" >
        Hadeya Ikram
      </Text>
      <mesh ref={mesh} geometry={nodes.Icosphere.geometry} position={[0, 0, 1.25]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

export default Model;