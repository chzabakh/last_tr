import React from 'react'

const CreateChannel = () => {
  return (
    <>
        <div className="flex p-3 flex-col px-20 border-2 items-center gap-2 h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
            <button className='bg-black/20 self-start w-[100px] border-4 rounded-full'>Back</button>
        <h1 className='self-start my-10'>Create a channel:</h1>
        <div className='bg-black/20 w-full  h-[70%]  flex justify-between items-center px-5'>
            <div>
                <p>Select type of channel:</p>
                <div className="flex flex-col gap-1 flex-1">
                    <div>
                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                    </div>
                    <div>
                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                    </div>

                    <div>
                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                    </div>
                </div>
    
            </div>
            <div className='bg-black/20 p-5 flex flex-col h-[70%] gap-10  w-[50%]'>
                <div>
                    <h1>Channel Information:</h1>
                </div>
                <div className='bg-black/20 p-5 h-full flex flex-col justify-evenly'>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Channel name:</label>
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name..." required></input>
                <button className="bg-black/20 p-2 rounded-full w-[200px] self-center">Create Channel</button>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default CreateChannel