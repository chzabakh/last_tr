import Layout from '@/components/Layout/layout'
import { Card } from '@mui/material';
import React, { useState } from 'react'
import Image from 'next/image';
import ReactCardFlip from 'react-card-flip';
import oufisaou from "../../public/oufisaou.jpeg"
import Stars from '@/components/Sections/stars';
const About = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseEnter = () => {
      if (!isFlipped) {
        setIsFlipped(true);
      }
    };
  
    const handleMouseLeave = () => {
      if (isFlipped) {
        setIsFlipped(false);
      }
    };
  
  return (
    <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen  max-h-screen">
    <Layout>
      <div>
         <Stars />
      </div>
        <div className="flex flex-row items-center justify-evenly max-h-ful w-full h-full">
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card-content front w-[300px] h-[300px] bg-rose-300 rounded-lg"  onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
          <div className='flex flex-col justify-center w-full items-center'>
            <Image alt="" width={100} height={100} src={oufisaou} className="relative w-full rounded-lg h-full" style={{
    boxShadow: 'inset 0px 10px 10px rgba(0, 0, 0, 0.5)', 
  }}/>
  <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] "></div>
            <div className='absolute bottom-4 font-inter font-bold text-xl'>
oufisaou
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 w-[300px]  h-[300px] rounded-lg bg-[#0000008b]">
          <div className='flex flex-col justify-center gap-4 items-center font-inter' >
            <button className='rounded-full border-2 border-white m-2 w-[200px] px-6 py-4' >My Github</button>
            <button className='rounded-full border-2 border-white m-2 w-[200px] px-6 py-4' >My LinkedIn</button>
          </div>
        </div>
    </ReactCardFlip>
        </div>
      <div/>
    </Layout>
    </div>
  )
}

export default About
