import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import images from '../../../public/images.png'
const Footer = () => {
  return (
    <div className="absolute text-xs  bottom-0 left-0 w-full h-1 flex justify-between items-center  ">
        <div>@2023 Made with &lt;3 for Trancendance. All rights reserved</div>
        <Image src={images} width={20} height={20} alt="" />
    </div>
  )
}

export default Footer