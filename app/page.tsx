import dynamic from 'next/dynamic'

const Scene = dynamic(() => import("@/components/Scene"), {
  loading : () => <p></p>,
  ssr :false
},);

export default function Home() {
  return (
    <main className="relative h-screen">
      <Scene/>
    </main>
  );
}
