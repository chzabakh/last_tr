import React, { useEffect, useState } from 'react'
import { Button } from '@mui/base'
import Router from 'next/router'
import Play from './play';
import Cookies from 'js-cookie';
import axios from 'axios';
import {Friend} from '../../components/Sections/types'
import { initialize } from 'next/dist/server/lib/render-server';


const Options = () => {
    const [tryIt, setTryIt] = useState(false);
    const [play, setPlay] = useState(false);
    const [invite, setInvite] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [friends, setFriends] = useState<Friend[]>([]);

const defaultStyle = {
    transition: "opacity 0.5s",
    opacity: 1
    };
    
    const fadeOutStyle = {
    transition: "opacity 0.5s",
    opacity: 0
    };
    


    const handleDelete = () => {
        setFadeOut(true);
        setTimeout(() => {
         setInvite(false);
          setFadeOut(false); 
          
        }, 500);
      };

      useEffect(() => 
      {
        async function initialize()
        {
            await getFriends()

        }
        initialize();
      }, [])



      async function getFriends()
      {
          try
          {
              const token = Cookies.get('token')
              const headers = { Authorization: `Bearer ${token}` };
              const res = await axios.get('http://localhost:9000/users/friendlist', { headers });            
              setFriends(res.data)
              console.log(friends)
            }
          catch(e)
          {
              if(axios.isAxiosError(e))
              {
                  if(e.request)
                      console.log("No response received!", e.request);
                  else if(e.response)
                      console.log("Error status: ", e.response?.status);
                      console.log("Error data: ", e.response?.data);
              }
              else
              {
                  console.log("Error: ", e);
              }
          }
      }



  return (

    tryIt ? <Play/> :
    play ? <Play/ > :      
    <>
    <div className="my-6 h-[90%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
   <div className='flex w-[80%]  justify-center '>
    <Button className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3 " onClick={() => setTryIt(true)}>Try Playing</Button>
    <Button className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3" onClick={ () =>setPlay(true)}>Play</Button>
    <Button className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3" onClick={() => setInvite(true)}>Invite</Button>
    </div>
  </div>
    {
        invite ?
        <div 
        style={fadeOut ? fadeOutStyle : defaultStyle} 
        className='w-[300px] h-[300px] absolute top-1/2 left-[60%] flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2  border-opacity-10 border-violet-400 bg-opacity-2 bg-gradient-to-l from-[#ffffff33] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]'>
        <button  onClick={handleDelete} className=' self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg'>X</button>
        <div className='flex flex-col gap-7 items-center'>
        <h2>Invite friends:</h2>
        </div>
        <div className='flex flex-col gap-2 '>
            {
                friends.map((friend) => (
                <div key={friend.id} className="flex justify-evenly">
                    <div className='text-[purple-500]'>{friend.nickname}</div>
                    <button className='border-4 border-[#3b0764] px-2 rounded-full'>Invite</button>
                </div>
                ))
            }
            </div>
        </div>
        :
        null
    }
    </>
  )
}

export default Options