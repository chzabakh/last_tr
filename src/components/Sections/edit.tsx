import React from 'react'
import TwoFac from './TwoFac'
import { useState } from 'react';

const edit = () => {

    const [showTwoFac, setShowTwoFac] = useState(false);
  
    // Function to handle the button click and show the <TwoFac> component
    function handleAuthClick() {
      setShowTwoFac(true);
    }
  
  return (
    <>
    {
      !showTwoFac ? (
        <div className="my-20 h-[70%] gap-3 justify-center flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="border-2 flex flex-col justify-between gap-10  h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className='flex flex-col gap-10 bg-black/20'>
          <div className='bg-black/20'>Change the Avatar:</div>
          <div className='bg-black w-[200px] h-[200px] mx-auto text-center'>Image</div>
          </div>
  
  
          <div className='flex flex-col gap-10 bg-black/20'>
          <div className='flex flex-row gap-10'>
          <div className='bg-black/20 flex-1 max-w-md'>Change username:</div>
          <input className="p-2 rounded-lg  text-white bg-black/60 flex-1 max-w-sm" type="text" placeholder='Type new username'/>
          </div>
          
          <div className='flex flex-row gap-10'>
          <div className='bg-black/20 flex-1 max-w-md'>Change email:</div>
          <input className="p-2 rounded-lg  text-white bg-black/60 flex-1 max-w-sm" type="text" placeholder='Type new email'/>
          </div>
          <div className='bg-black/20'>Change password: </div>
          <div  className='flex flex-row gap-10 justify-center'>
              <input className="p-2 rounded-lg text-white bg-black/60" type="password" placeholder='Type old password'/>
              <input  className="p-2 rounded-lg text-white bg-black/60" type="password" placeholder='Type new password'/>
          </div>
          </div>
  
  
          <div className='flex flex-col justify-between'>
         
          <div className='flex justify-between'>
              <button className='bg-black p-3 rounded-2xl' onClick={handleAuthClick}> Activate auth</button>
              <button className='bg-black p-3 rounded-2xl'>Save changes</button>
          </div>
          </div>
  
        </div>
        </div>

      ) :    <div className="h-screen w-full md:w-[90%] flex mx-auto ">
      {showTwoFac && <TwoFac />} </div>
    }
  </>
  );
}

export default edit;
