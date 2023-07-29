import React from 'react'

const PrivateChannel = () => {
  return (
    <>
     <label htmlFor="channelname" className="block mb-2 text-sm font-medium text-white dark:text-white">Channel name:</label>
    <input type="text" id="first_name" className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/40" placeholder="Enter name..." required></input>
    <label htmlFor="friendstoinvite" className="block mb-2 text-sm font-medium text-white dark:text-white">Select friends to invite:</label>
    <input type="text" id="first_name" className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/40" placeholder="I want to invite..." required></input>
    <button className="border-opacity-40 border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full w-[150px] self-center text-xs mt-3">Create Channel</button>
    </>

  )
}

export default PrivateChannel