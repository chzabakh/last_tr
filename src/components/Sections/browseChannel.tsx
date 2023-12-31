import axios from 'axios';
import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react'
import  Channels  from './channels';
const BrowseChannel = () => {

    const defaultStyle = {
        transition: "opacity 0.5s",
        opacity: 1
      };
      
      const fadeOutStyle = {
        transition: "opacity 0.5s",
        opacity: 0
      };

    const [back, setback] = useState(false)
    const [PublicRooms, setPublicRooms] = useState([]);
    const [ProtectedRooms, setProtectedRooms] = useState([]);
    const [isprivate, setPrivate] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    useEffect(()=>
    {
       getPublicChannels();
       getProtectedChannels();
    },[])
    
    function handleback()
    {
        setback(true)
    }
    const handleDelete = () => {
        setFadeOut(true);
        setTimeout(() => {
          setPrivate(false);
          setFadeOut(false); 
        }, 500);
      };

    async function joinPublicRoom()
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

    async function joinProtectedRoom()
    {
        try
        {
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const requestBody = {
                isProtected: true,
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
                    <button className='bg-black/20 self-start w-[200px] border-4 rounded-full' onClick={() => setPrivate(true)}>Join Private </button>
                    
                    {isprivate && 
                    <div 
                        style={fadeOut ? fadeOutStyle : defaultStyle} 
                        className='w-[300px] h-[300px] bg-white/40 rounded-lg absolute top-1/2 left-1/2 flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]'>
                        <button onClick={handleDelete} className=' self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg'>X</button>
                        <div className='flex flex-col gap-7 items-center'>
                        <h2>Enter the room ID:</h2>
                        <input type="password" className='bg-black/30 h-[20px] p-6 text-white mx-2'></input>
                        </div>
                        <button className='rounded-lg border-4 border-[#3b0764] w-[40%] self-center'>Enter</button>
                    </div>
                    }
                     
                    </div>
                    <div className=' w-full p-4 h-[100%] overflow-scroll'>
                        <p>Public Channels:</p>
                    <div className='grid grid-cols-3 gap-4 '>
                        {PublicRooms.map(channel => (
                            <div key={channel.id} className='bg-[#3b0764]/80 p-4 rounded-md text-white shadow-md'>
                                <h3 className='text-xl font-semibold'>{channel.name}</h3>
                                <button className=' text-white border-4 border-[#7e22ce] rounded-full px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' onClick={joinPublicRoom}>Join</button>
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
                                <button className=' text-white border-4 border-[#7e22ce] rounded-full px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' onClick={joinProtectedRoom}>Join</button>
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