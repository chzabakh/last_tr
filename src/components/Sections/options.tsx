import React from 'react'
import { Button } from '@mui/base'

const Options = () => {
  return (
    <div className="my-6 h-[90%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
   <div className='flex w-[80%]  justify-center '>
    <Button className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3 ">Try Playing</Button>
    <Button className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3">Play</Button>
    <Button className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3">Invite</Button>
    </div>
  </div>
  )
}

export default Options