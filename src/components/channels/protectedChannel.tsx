import React from 'react'

const ProtectedChannel = () => {
  return (
    <>
     <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Channel name:</label>
      <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name..." required></input>
      <p className='text-sm'>Channel password</p>
      <div className='text-xs'>Generated pass</div>
      <button className="bg-black/20 p-2 rounded-full w-[200px] self-center">Create Channel</button>
    </>
  )
}

export default ProtectedChannel