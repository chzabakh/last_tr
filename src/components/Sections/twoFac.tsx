import React from 'react'

const TwoFac = () => {
  return (
        <>
        <div className="my-20 h-[70%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="px-5 gap-10 items-center border-2 h-[90%] w-[70%] flex lg:flex-row  flex-col-reverse justify-between border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <div className='lg:w-[20rem] lg:h-[20rem] h-[10rem] w-[10rem] bg-black flex-1 text-center'>
                QRCODE
            </div>
            <div className='flex flex-col justify-between flex-1 lg:gap-20'>
                <div className='self-center lg:text-2xl text-md font-extrabold'>
                    <h1>Enable Two Factor</h1>
                </div>
                <div className='flex flex-col lg:gap-4  gap-1 justify-between'>
                   <p className='text-xs'>Scan the QR Code and enter the code:</p> 
                    <input className="lg:p-5 p-3 rounded-2xl bg-black/40" type="password" placeholder='Enter the digits'></input>
                    <button className='border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white p-3 rounded-2xl w-[70%] self-center'>Activate</button>
                </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default TwoFac