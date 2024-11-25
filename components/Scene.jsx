'use client'
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { Vector2, Color } from "three";
import { Leva, useControls } from "leva";

import vertexShader from "!!raw-loader!./vert.glsl";
import fragmentShader from 'raw-loader!glslify-loader!./my-shader.glsl'

const Gradient = () => {
  const mesh = useRef();
  const { viewport } = useThree();

  const { amplitude, speed, progress, color1, color2, color3 } = useControls({
    amplitude: { value: 0.1, min: 0.0, max: 1.0, step: 0.01 },
    speed: { value: 1.0, min: 0.1, max: 10.0, step: 0.1 },
    progress: { value: 0.0, min: 0.0, max: 10.0, step: 0.1 },
    color1: "#ff0000",
    color2: "#00ff00",
    color3: "#0000ff",
  });

  const uniforms = useMemo(
    () => ({
      uAmplitude: { value: amplitude },
      uSpeed: { value: speed },
      uProgress: { value: progress },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uColor3: { value: new Color(color3) },
    }),
    [amplitude, speed, progress, color1, color2, color3]
  );

  useFrame((state) => {
    // Update the progress uniform to create animation
    uniforms.uProgress.value += speed * 0.01;
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <Leva collapsed={false} />
      <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0.0, 0.0, 1.5] }}>
        <Gradient />
      </Canvas>
    </>
  );
};

export default Scene;