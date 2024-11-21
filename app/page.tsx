import dynamic from 'next/dynamic'

const Scene = dynamic(() => import("@/components/Scene"), {
  loading : () => <p></p>,
  ssr :false
},);

export default function Home() {
  return (
    <main className="">
      <div className='relative'>
        <Scene BgCol="#ff0EEE" TextCol = "#000000"/>
      </div>
      
      <div>hell</div>
    </main>
  );
}
