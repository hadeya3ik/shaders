'use client';
import React from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import("@/components/Scene"), {
  loading : () => <p></p>,
  ssr :false
},);

export default function Home() {
  return (
    <main className="bg-primary text-primary-foreground w-screen h-screen">
      <Scene />
    </main>
  );
}