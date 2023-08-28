import Image from "next/image";
import { useState } from "react";
import CreateChannel from "./createChannel";
import BrowseChannel from "./browseChannel";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import ChatRoom from "@/pages/chatRoom";
import chat from "./chat";

const Channels = () => {

  
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

  const [activeComponent, setActiveComponent] = useState("");
  const [PrivateRooms, setPrivateRooms] = useState<channel[]>([]);
  const [chat, setChat] = useState(false);
  const [channel, setChannel] = useState<channel>()

  function handleCreate() {
    setActiveComponent("create");
  }

  function handleBrowse() {
    setActiveComponent("browse");
  }

  useEffect(() =>
  {
    getMyChannels();
  }, [])
  
  async function getMyChannels() {

    try{

        const token = Cookies.get('token')
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get('http://localhost:9000/chat/my-rooms',  { headers });
        setPrivateRooms(res.data)
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


async function handleLeaveRoom(channel : channel)
{
    try
    {
        const token = Cookies.get('token')
        const headers = { Authorization: `Bearer ${token}` };
        let requestBody;

        if(channel.isGroup)
        {
          requestBody = {
              isGroup: true,
              conversationID: channel.uid,
          };
        }
        else if(channel.isPrivate)
        {
          requestBody = {
            isPrivate: true,
            conversationId: channel.uid,
        };
        }
        else if(channel.isProtected)
        {
          requestBody = {
            isProtected: true,
            conversationId: channel.uid,
        };
        }
        console.log(requestBody)
        const res = await axios.post('http://localhost:9000/chat/leave-room', requestBody,  { headers });
        if (res.status === 201)
        {
            console.log("Room Left!");
            console.log(res.data);
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



function handleChat(Channel: channel)
{
        console.log("Hhia channel" , Channel)
        setChannel(Channel)
        setChat(true)
        
  }    



  return (

    <>
      
      {
      chat ?  <ChatRoom  room={channel!} /> :
      activeComponent ? (
        <>
          {activeComponent === "create" && <CreateChannel />}
          {activeComponent === "browse" && <BrowseChannel />}
        </>
      ) : (
        <>
        <div className="flex flex-col p-20 gap-1 border-2  justify-between h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#49126e33] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
          <div className="">
            <div>My joined channels:</div>
            <div className="grid grid-cols6 gap-4">
                  {
                    PrivateRooms.map((ChannelName: channel) => (
                      <div key={ChannelName.id} className='bg-[#3b0764]/80 p-4 rounded-md text-white shadow-md'>
                          <h3 className='text-xl font-semibold'>{ChannelName.name}</h3>
                          <>
                                  <div className='flex justify-between'>
                                  <button className=' text-white border-4 border-[#7e22ce] rounded-full 
                                  px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' 
                                  onClick={() =>handleLeaveRoom(ChannelName)}>Leave</button>
                                      <button className=' text-white border-4 border-[#7e22ce] rounded-full 
                                        px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' 
                                        onClick={() => handleChat(ChannelName)}>Enter</button>
                                  </div>
                          </>
                      </div>
                  ))
                  }
            </div>
          </div>
          <div className="flex justify-between w-full m-4">
          <button className="border-opacity-40  min-w-[100px] border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full w-[150px] self-center text-xs" onClick={handleCreate}>
            Create a channel
          </button>
          <button className="border-opacity-40  min-w-[100px] border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full text-xs" onClick={handleBrowse}>
            Browse a channel
          </button>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Channels;