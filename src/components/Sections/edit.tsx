import React from 'react'

const edit = () => {
  return (
    <>
    <div className="my-20 h-[70%] gap-3 justify-center flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
      <div className="border-2 flex flex-col justify-between gap-10  h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className='flex flex-col gap-10 bg-black/20'>
        <div className='bg-black/20'>Change the Avatar:</div>
        <div className='bg-black w-[200px] h-[200px] mx-auto text-center'>Image</div>
        </div>


        <div className='flex flex-col gap-10 bg-black/20'>
        <div className='bg-black/20'>Change username: <input className="p-2 rounded-lg text-white bg-black/60" type="text" placeholder='Type old password'/></div>
        <div className='bg-black/20'>Change email: <input className="p-2 rounded-lg text-white bg-black/60" type="text" placeholder='Type old password'/></div>
        <div className='bg-black/20'>Change password: </div>
        <div  className='flex flex-row gap-10 justify-center'>
            <input className="p-2 rounded-lg text-white bg-black/60" type="password" placeholder='Type old password'/>
            <input  className="p-2 rounded-lg text-white bg-black/60" type="password" placeholder='Type new password'/>
        </div>
        </div>


        <div className='flex flex-col justify-between'>
       
        <div className='flex justify-between'>
            <button className='bg-black p-3 rounded-2xl'>Activate auth</button>
            <button className='bg-black p-3 rounded-2xl'>Save changes</button>
        </div>
        </div>

      </div>
    </div>
  </>
  )
}

export default edit