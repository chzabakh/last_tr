import React from 'react'

const TwoFac = () => {
  return (
        <>
        <div className="my-20 h-[70%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="px-5 gap-10 items-center border-2 h-[40%] w-[70%] flex justify-between border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <div className='w-[300px] h-[300px] bg-black flex-1 text-center'>
                QRCODE
            </div>
            <div className='flex flex-col justify-between flex-1 gap-20'>
                <div className='self-center text-2xl font-extrabold'>
                    <h1>Enable Two Factors</h1>
                </div>
                <div className='flex flex-col gap-4 justify-between'>
                   <p className='text-xs'>Scan the following QR Code and enter the the verification number you will find</p> 
                    <input className="p-5 rounded-2xl bg-black/60" type="password" placeholder='Enter the digits'></input>
                    <button className='border-2 w-[200px] self-center p-2 rounded-2xl'>Activate</button>
                </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default TwoFac