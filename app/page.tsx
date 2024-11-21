import dynamic from 'next/dynamic'

const Scene = dynamic(() => import("@/components/Scene"), {
  loading : () => <p></p>,
  ssr :false
},);

export default function Home() {
  return (
    <main className="">
      <div className='relative border-4 p-0 m-0]'>
        <Scene/>
      </div>
      
      <div>hell</div>
    </main>
  );
}
