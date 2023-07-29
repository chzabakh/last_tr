import React from 'react'

const ProtectedChannel = () => {
  return (
    <>
     <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Channel name:</label>
      <input type="text" id="first_name" className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/400" placeholder="Enter name..." required></input>
      <p className='text-sm'>Channel password</p>
      <div className='text-xs'>Generated pass</div>
      <button className="border-opacity-40 border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full w-[150px] self-center text-xs">Create Channel</button>
    </>
  )
}

export default ProtectedChannel