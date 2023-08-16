import axios from 'axios';
import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react'
import  Channels  from './channels';
const BrowseChannel = () => {

    const [back, setback] = useState(false)
    const [PublicRooms, setPublicRooms] = useState([]);
    const [ProtectedRooms, setProtectedRooms] = useState([]);

    useEffect(()=>
    {
       getPublicChannels();
       getProtectedChannels();
    },[])
    
    function handleback()
    {
        setback(true)
    }


    async function joinRoom()
    {
        try
        {
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const requestBody = {
                isGroup: true,
              };
            const res = await axios.post('http://localhost:9000/chat/join-room', requestBody,  { headers });
            console.log(res.data)
            if(res.status === 201)
                alert('done');
            else    
                alert('not done');                                                                                                                                                                                                                                                                                                                                                                            
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
    async function getPublicChannels() {

        try{

            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get('http://localhost:9000/chat/isGroup/all',  { headers });
            console.log(res.data)
            setPublicRooms(res.data)
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

    async function getProtectedChannels() {

        try{

            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get('http://localhost:9000/chat/isProtected/all',  { headers });
            setProtectedRooms(res.data)
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
    back === true ? <Channels /> : (
    <>
        {
            <>
                {
                
                    <div className="flex flex-col border-2 items-center justify-center gap-10 h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
                    <div className='flex flex-col items-center  h-[80%] w-[90%] gap-8'>
                        <div className='flex justify-between gap-10 w-full'>
                    <button className='bg-black/20 self-start w-[100px] border-4 rounded-full' onClick={handleback}>Back</button>
                    <button className='bg-black/20 self-start w-[200px] border-4 rounded-full' onClick={handleback}>Join Private </button>
                        </div>
                    <div className=' w-full p-4 h-[100%] overflow-scroll'>
                        <p>Public Channels:</p>
                    <div className='grid grid-cols-3 gap-4 '>
                        {PublicRooms.map(channel => (
                            <div key={channel.id} className='bg-[#3b0764]/80 p-4 rounded-md text-white shadow-md'>
                                <h3 className='text-xl font-semibold'>{channel.name}</h3>
                                <button className=' text-white border-4 border-[#7e22ce] rounded-full px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' onClick={joinRoom}>Join</button>
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className=' w-full p-4 h-[100%] overflow-scroll'>
                        <p>Protected Channels:</p>
                    <div className='grid grid-cols-3 gap-4 '>
                        {ProtectedRooms.map(channel => (
                            <div key={channel.id} className='bg-[#3b0764]/80 p-4 rounded-md text-white shadow-md'>
                                <h3 className='text-xl font-semibold'>{channel.name}</h3>
                                <button className=' text-white border-4 border-[#7e22ce] rounded-full px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' onClick={joinRoom}>Join</button>
                            </div>
                        ))}
                    </div> 
                    </div>
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