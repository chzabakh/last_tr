import React, {useState} from 'react'
import  Channels  from './channels';
const BrowseChannel = () => {

    const [back, setback] = useState(false)
    function handleback()
    {
        setback(true)
    }

  return (
    back === true ? <Channels /> : (
    <>
        {
            <>
                {
                    
                        <div className="flex flex-col border-2 items-center justify-center gap-10 h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
                        <div className='flex flex-col items-center justify-between h-[80%] w-[90%] gap-9 '>
                        <button className='bg-black/20 self-start w-[100px] border-4 rounded-full' onClick={handleback}>Back</button>
                        <div className='bg-black/20 w-full p-4 h-[50%]'>Public channels:</div>
                            <div className='bg-black/20 w-full p-4 h-[50%]'>Protected channels:</div>
                        </div>
                        </div>
                    
                }
            </>
        }   
    </>
  )
  )
}

export default BrowseChannel