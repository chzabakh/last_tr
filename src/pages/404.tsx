import React from 'react'
import error from '../../public/404.jpeg'
import Image from 'next/image'
import Stars from '@/components/Sections/stars'
const Error = () => {
  return (
    <div className='relative'>
      <div className='bg-black/80 absolute inset-0 z-1'></div>
      <div className="absolute left-0 z-[-1] w-[50%] h-screen max-h-screen max-w-screen overflow-hidden">
      <div id="stars"></div>
      </div>
      <Image src={error} alt="boobker" className='w-screen h-screen z-0' />
    </div>
  )
}
export default Error