import { useState,useRef } from "react"
import { TiLocationArrow } from "react-icons/ti"

const BentoTilt = ({children,className=''})=>{
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef();
  const handleMouseMove = (e) => {
    if(!itemRef.current) return;
    const {left,top,width,height} = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) /height ;
    
    const tiltX = (relativeX + 0.5)* 5;
    const tiltY = (relativeY + 0.5)* -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98)`;
    setTransformStyle(newTransform);
;  }
  const handleMouseLeave = () => {
    setTransformStyle('');
  }

  return(
    <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{transform : transformStyle}}>
      {children}
    </div>
  )
}
const BentoCard = ({src,title,description})=>{
  return (
    <div className="relative size-full">
      <video 
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
const Features = () => {
  return (
    <section className='bg-black pb-52'>
      <div className='container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
          <p className='font-circular-web text-lg text-blue-50'>Explore the Zentry Universe</p>
          <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>Immerse yourself in an IP-rich product universe where players, agentic AI and blockchain lead the new economic paradigm.
          </p>
        </div>
        <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
          <BentoCard
            src="videos/feature-1.mp4"
            title={<><b>radint</b></>}
            description="The game of games app transforming moments across Web2 & Web3 titles into rewards"
          />
        </BentoTilt>
        <div className="grid h-[190vh] grid-cols-2 grid-row-3 gap-7">
          <BentoTilt className="bento-titl_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={<><b>zigma</b></>}
              description="The NFT collection merging Zentry’s IP, AI, and gaming—pushing the boundaries of NFT innovation."
            />
          </BentoTilt>
          <BentoTilt className="bento-titl_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={<><b>Nexus</b></>}
              description="The metagame portal uniting humans & AI to play, compete and earn"
            />
          </BentoTilt>
          <BentoTilt className="bento-titl_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={<><b>azul</b></>}
              description="The agent of agents elevating agentic AI experience to be more fun and productive"
            />
          </BentoTilt>
          <div className="bento-titl_2">
            <div className="height-[100%] flex flex-col justify-between bg-[#5724ff] p-5 py-20">
              <h1 className="bento-title special-font max-w-64 text-black "><b>More coming soon</b></h1>
              <TiLocationArrow className="m-5 scale-[5] self-end"/>
            </div>
          </div>
          <div className="bento-titl_2 ">
            <video 
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="height-[100%] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features