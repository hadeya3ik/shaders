'use client'
import React, {useEffect} from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from '@react-three/drei';
import Model from "./model"
import { OrbitControls, DragControls } from '@react-three/drei';
import {motion, useMotionValue} from 'framer-motion'

function Scene() {

  const mouse = {
    x : useMotionValue(0), 
    y : useMotionValue(0)
  }

  const manageMouseMove = (e) => {
    const {clientX, clientY} = e;
    const {innerWidth, innerHeight} = window; 
    const x = clientX / innerWidth;
    const y = clientY / innerHeight;
    mouse.x.set(x)
    mouse.y.set(y)
  }

  useEffect( () => {
    window.addEventListener("mousemove", manageMouseMove)
    return () => {window.removeEventListener("mousemove", manageMouseMove)}
  }, [])

  return (
    <Canvas>
      <color attach="background" args={["Black"]} />
      <ambientLight intensity={0.5} />
        <directionalLight intensity={3} position={[0,3,2]}/>
        <Environment preset='city'/>
        <Model mouse={mouse} />
    </Canvas>
  )
}

export default Scene