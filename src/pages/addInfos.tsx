import React, { useState } from 'react'
import Image from 'next/image'


const addInfos = () => {

    const [Avatar, setAvatar] = useState<File | null>(null);
  return (
    <>
    <div className="my-20 h-[35rem] gap-3 flex justify-center items-center flex-col w-[50%]  mx-auto  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
    
    <div className='flex flex-col justify-center  items-center gap-6'>
            
            <div className="lg:text-lg text-xs max-w-full">Change the Avatar and Username</div>
       
              <Image src="" alt="" width={100} height={100} className="border-2 self-center rounded-full"/>
              <input
                key="avatar"
                type="file"
                accept=".jpg, .jpeg, .png"
                className='my-1 bg-black/20 text-xs'
                // onChange={(e) =>
                // {
                //   handleAvatarChange(e);
                // }}
              />
          </div>

       <div className='px-5 gap-10 items-center border-2 h-[60%] w-[70%] flex  flex-col justify-center border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]'>
       <div className='w-[40%] self-center'>Change username:</div>
        <input className="p-2 rounded-lg w-[50%] text-white bg-black/20" type="text" placeholder='Type new username' />
        </div>
       <button className='border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white  p-3 rounded-2xl' >Save changes</button>
       </div>
  </>
  )
}

export default addInfos;


