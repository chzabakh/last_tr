import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import images from '../../../public/images.png'
const Footer = () => {
  return (
    // text-xs w-full flex justify-between right-4 flex-end absolute opacity-[0.5]
    <div className="flex justify-between w-full">
        <div>@2023 Made with &lt;3 for Trancendance.</div>
        <Image src={images} width={20} height={20} alt="" />
    </div>
  )
}

export default Footer