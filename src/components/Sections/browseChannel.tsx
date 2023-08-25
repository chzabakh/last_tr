import { SocketProvider } from '@/pages/socket_context';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react'
import PrivateChannel from '../../../last_transcendance/src/components/channels/privateChannel';
import  Channels  from './channels';
import ChatRoom from './chatRoom';
const BrowseChannel = () => {

    interface owner 
    {
        FirstLogin: boolean,
        TwoFaAuthEnabled: boolean,
        TwofaAuthSecret: string,
        avatarUrl: string,
        createdaAt: string,
        email: string,
        friendStatus: string,
        hash: string,
        id: number,
        nickname: string,
        provider: string,
        state: string,
        updatedAt: string,
    }
    interface user {
        TwofaAutEnabled: boolean,
        TwofaAutSecret : boolean,
        avatarUrl: string,
        createdAt: string,
        email: string,
        friendStatus: string,
        id: number,
        nickname: string,
        provider: string,
        state: string,
        updatedAt: string,
    }

    interface channel{
        createdAt: string,
        id: number,
        isGroup: boolean,
        isPrivate: boolean,
        isPrivateKey: boolean,
        isProtected: boolean,
        lastMessageAt: string,
        name: string,
        owner: owner,
        ownerID: number,
        password: string,
        uid: string, 
        users: user[],
    }

    interface JoinedRoom {
        id: number;
        name: string;
    }

    const defaultStyle = {
        transition: "opacity 0.5s",
        opacity: 1
      };
      
      const fadeOutStyle = {
        transition: "opacity 0.5s",
        opacity: 0
      };

    const [back, setback] = useState(false)
    const [PublicRooms, setPublicRooms] = useState<channel[]>([]);
    const [ProtectedRooms, setProtectedRooms] = useState<channel[]>([]);
    const [isprivate, setPrivate] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [roomId, setRoomId] = useState("");

    // const [joinedRooms, setJoinedRooms] = useState<JoinedRoom[]>([]);
    const [privJoined, setPrivJoined] = useState(false);
    const [chat, setChat] = useState(false);
    const [email, setUserEmail] = useState("");
    const [hide, setHide] = useState(false);
    const [id, setId] = useState("")

    useEffect(() => {
        console.log("All the public rooms", PublicRooms);
    }, [PublicRooms]);
    

    useEffect(()=>
    {
        async function initialize()
        {
            await getUser();
            await getPublicChannels();
            await getProtectedChannels();
        }
        initialize();
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



    async function joinPublicRoom(uid : string)
    {
        try
        {
            console.log("USER UID: " , uid)
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };

            const requestBody = {
                isGroup: true,
                conversationId: uid, 
            };
            // console.log(requestBody);
            const res = await axios.post('http://localhost:9000/chat/join-room', requestBody,  { headers });
            if (res.status === 201)
            {
                setHide(true);
                console.log("Room successfully joined!");
                console.log(res.data); // Assuming the backend sends the created room details
            }                                                                                                                                                                                                                                                                                                           
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




    async function joinProtectRoom(uid : string)
    {
        try
        {
            console.log("USER UID: " , uid)
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };

            const requestBody = {
                isProtected: true,
                conversationId: uid, 
            };
            // console.log(requestBody);
            const res = await axios.post('http://localhost:9000/chat/join-room', requestBody,  { headers });
            if (res.status === 201)
            {
                setHide(true);
                console.log("Room successfully joined!");
                console.log(res.data); // Assuming the backend sends the created room details
            }                                                                                                                                                                                                                                                                                                           
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


    async function joinPrivate(uid : string)
    {
        try
        {
            console.log("USER UID: " , uid)
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };

            const requestBody = {
                isPrivate: true,
                conversationId: roomId, 
            };
            // console.log(requestBody);
            const res = await axios.post('http://localhost:9000/chat/join-room', requestBody,  { headers });
            if (res.status === 201)
            {
                setChat(true);
                console.log("Room successfully joined!");
                console.log(res.data); // Assuming the backend sends the created room details
            }                                                                                                                                                                                                                                                                                                           
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
    async function LeaveRoomProtect(uid : string)
    {
        try
        {
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const requestBody = {
                isProtected: true,
                conversationId: uid,
            };
            console.log(requestBody)
            console.log("auiiiid", uid)
            const res = await axios.post('http://localhost:9000/chat/leave-room', requestBody,  { headers });
            if (res.status === 201)
            {
                setHide(false);
                console.log("Room Left!");
                console.log(res.data);
                setHide(true);
            }                                                                                                                                                                                                                                                                                                         
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


    async function LeaveRoom(uid : string)
    {
        try
        {
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const requestBody = {
                isGroup: true,
                conversationId: uid,
            };
            console.log(requestBody)
            console.log("auiiiid", uid)
            const res = await axios.post('http://localhost:9000/chat/leave-room', requestBody,  { headers });
            if (res.status === 201)
            {
                setHide(false);
                console.log("Room Left!");
                console.log(res.data);
                setHide(true);
            }                                                                                                                                                                                                                                                                                                         
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
    async function handlePublicRoom(Channel : channel)
    {
        await joinPublicRoom(Channel.uid);
        // console.log("THE CHANNEL ID:" ,Channel.id);
    }

    async function handleLeaveRoom(Channel : channel)
    {
        await LeaveRoom(Channel.uid);
        setHide(false);
    }
  

    async function handleProtectRoom(Channel : channel)
    {
        await joinProtectRoom(Channel.uid);
        // console.log("THE CHANNEL ID:" ,Channel.id);
    }

    async function handleLeaveRoomProtect(Channel : channel)
    {
        await LeaveRoomProtect(Channel.uid);
        setHide(false);
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

    async function getUser() {

        try{

            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get('http://localhost:9000/users/me',  { headers });
            setUserEmail(res.data.email);
            setId(res.data.id)
            console.log(email);
            console.log(res.data.email)
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


    async function joinprivate()
    {

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

    if(chat) {
            return <ChatRoom />;  
    }

  return (
    back === true ? <Channels /> : (
    <>
        {
            <>
                {
                
                    <div className="flex flex-col border-2 items-center justify-center gap-10 h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#3a0e6c33] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
                    <div className='flex flex-col   h-[80%] w-[90%] gap-8'>
                    <div className='flex justify-between gap-10 w-full'>
                    <button className='bg-black/20 self-start w-[100px] border-4 rounded-full' onClick={handleback}>Back</button>
                    <button className='bg-black/20 self-start w-[200px] border-4 rounded-full' onClick={() => setPrivate(true)}>Join Private </button>
                     
                    {isprivate && 
                    <div 
                        style={fadeOut ? fadeOutStyle : defaultStyle} 
                        className='w-[300px] h-[300px]] absolute top-1/2 left-1/2 flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]'>
                        <button onClick={handleDelete} className=' self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg'>X</button>
                        <div className='flex flex-col gap-7 items-center'>
                        <h2>Enter the room ID:</h2>
                        <input type="password" className='bg-black/30 h-[20px] p-6 text-white mx-2' onChange={(e) => setRoomId(e.target.value)}></input>
                        </div>
                        <button className='rounded-lg border-4 border-[#3b0764] w-[40%] self-center' onClick={joinPrivate}>Enter</button>
                    </div>
                    }
                     
                    </div>
                    <p>Public Channels:</p>
                    <div className=' w-full p-4 h-[100%] overflow-scroll'>
                    <div className='grid grid-cols6 gap-4'>
                        {
                       
                        PublicRooms.map((ChannelName: channel) => (
                            <div key={ChannelName.id} className='bg-[#3b0764]/80 p-4 rounded-md text-white shadow-md'>
                                <h3 className='text-xl font-semibold'>{ChannelName.name}</h3>
                            {
                                ((hide) || ((hide) && (email === ChannelName.owner.email))) ?
                                //we have a state called hide, when it is off it means that the user did not join the room yet, so we only get join, then when he does , an enter and leavebutton appear
                                <>
                                        <div className='flex justify-between'>
                                        <button className=' text-white border-4 border-[#7e22ce] rounded-full 
                                        px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' 
                                        onClick={() =>handleLeaveRoom(ChannelName)}>Leave</button>
                                            <button className=' text-white border-4 border-[#7e22ce] rounded-full 
                                        px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' 
                                        onClick={() => setChat(true)}>Enter</button>
                                        </div>
                                </>
                               :
                               <>
                                <button className=' text-white border-4 border-[#7e22ce] rounded-full 
                                px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' 
                                onClick={() =>handlePublicRoom(ChannelName)}>Join</button>
                               </> 
                            }
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className=' w-full p-4 h-[100%] overflow-scroll'>
                        <p>Protected Channels:</p>
                    <div className='grid grid-cols6 gap-4'>
                    {
                       
                       ProtectedRooms.map((ChannelName: channel) => (
                           <div key={ChannelName.id} className='bg-[#3b0764]/80 p-4 rounded-md text-white shadow-md'>
                               <h3 className='text-xl font-semibold'>{ChannelName.name}</h3>
                           {
                               ((hide) || ((hide) && (email === ChannelName.owner.email))) ? 
                               //we have a state called hide, when it is off it means that the user did not join the room yet, so we only get join, then when he does , an enter and leavebutton appear
                               <>
                                       <div className='flex justify-between'>
                                       <button className=' text-white border-4 border-[#7e22ce] rounded-full 
                                       px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' 
                                       onClick={() =>handleLeaveRoomProtect(ChannelName)}>Leave</button>
                                           <button className=' text-white border-4 border-[#7e22ce] rounded-full 
                                       px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' 
                                       onClick={() => setChat(true)}>Enter</button>
                                       </div>
                               </>
                              :
                              <>
                               <button className=' text-white border-4 border-[#7e22ce] rounded-full 
                               px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' 
                               onClick={() =>handleProtectRoom(ChannelName)}>Join</button>
                              </> 
                           }
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