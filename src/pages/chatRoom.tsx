import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import React, {useEffect, useState, useTransition} from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import Channels from './channels';
import BrowseChannel from '@/components/Sections/browseChannel';
import Loading from './loading';
import { initialize } from 'next/dist/server/lib/render-server';



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

interface ChatRoomProps {
  room: channel,
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  room
}) => {

  interface User {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    nickname: string;
    hash: string;
    TwofaAutSecret: null | string;
    TwofaAutEnabled: boolean;
    FirstLogin: boolean;
    avatarUrl: string;
    state: string;
    provider: string;
    friendStatus: string;
  }
  
  interface Message {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    roomID: string;
    senderID: number;
  }
  
  interface RoomDetails {
    id: number;
    createdAt: string;
    lastMessageAt: string;
    name: string;
    isPrivate: null | boolean;
    isPrivateKey: null | string;
    isProtected: null | boolean;
    isGroup: boolean;
    password: null | string;
    uid: string;
    ownerID: number;
    users: User[];
    admins: User[];
    owner: User;
    messages: Message[];
  }
  
  
  
  const optionsMember = [
    'Bane',
    'Mute',
    'Kick',
    'Send Private Message',
    'Invite to Game',
    'See Profile',
    'Set New Admin'
  ];
  
  
  const optionsChannel = [
    'Add password',
  ];
  console.log(room)
  const ITEM_HEIGHT = 30;
  
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [back, setBack] = useState(false);
  const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const [details, setDetails] = useState<RoomDetails | null>(null);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const openIt = Boolean(anchorElement);
    
    const handleClickChannel = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElement(event.currentTarget);
    };
  
    const handleCloseChannel = () => {
      setAnchorElement(null);
      console.log(rooms)
    };

    
    async function handleBane()
    {
      alert("bane");
    }
    
    async function handleMute()
    {
      alert("Mute");
    }
    
    
    async function handleKick()
    {
      alert("Kick")
    }
    
    async function handleMessage()
    {
      alert("Message");
    }
    
    async function handleInvite()
    {
      alert("Invite")
    }


    async function handleProfile()
    {
      alert ("Profile")
    }

    async function handleAdmin()
    {
      alert ("Admin")
    }
    
    async function handlePassword()
    {
      alert ("Password")
    }
    

    const handleOptions = (option : string) => {
      switch(option)
      {
        case ("Bane"):
          handleBane();
          break;
        case ("Mute"):
          handleMute();
          break;
        case ("Kick"):
          handleKick();
          break;
        case ("Send Private Message"):
          handleMessage();
          break;
        case ("Invite to Game"):
          handleInvite();
          break;
        case ("See Profile"):
          handleProfile();
          break;
        case("Set As Admin"):
          handleAdmin();
          break;
      }
    };


    const handleOptionsChannel = (option : string) => {
      switch(option)
      {
        case ("Add passowrd"):
          handlePassword();
          break;

      }
  };

    useEffect(() =>
    {
      async function initialize()
      {

        await getAllRooms();
        await getDetails()
        setIsLoading(false);
      }
      initialize()
    },[])

    async function handleChat()
    {
      try
      {
          const token = Cookies.get('token')
          const headers = { Authorization: `Bearer ${token}` };

          const requestBody = {
              message: message,
              RoomId: room.uid, 
          };
          console.log(message + ' ' + room.uid);
          const res = await axios.post('http://localhost:9000/chat/send-message', requestBody,  { headers });
          if (res.status === 201)
          {
            setChatMessages([...chatMessages, message]);
            setMessage('')
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

    async function getDetails()
    {
      try
      {
          const token = Cookies.get('token')

          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            },
          };
          console.log(config)
          const res: AxiosResponse<RoomDetails> = await axios.get(`http://localhost:9000/chat/channel/${room.uid}/details`, config);
          setDetails(res.data)
          if (res.status === 200)
          {
            console.log("Hahia res" , details)
            console.log(res); // Assuming the backend sends the created room details
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

    async function getAllRooms()
    {
        try
        {
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get('http://localhost:9000/chat/my-rooms', { headers });            
            setRooms(res.data)
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
    if(isLoading)
    {
        return <Loading />
    }
  return (
    back ? <BrowseChannel /> : (
    <>
       <div className="absolute top-0 z-2 flex justify-evenly border-2 rounded-3xl  border-opacity-30 w-[99.9%] h-full border-violet-400  bg-[#571d86]  bg-blur-md backdrop-filter backdrop-blur-md p-4">
          <div className="w-[40%] flex flex-xol justify-center">
            <div className="w-[90%] mt-2">
          <button className='border-2 p-2 rounded-lg' onClick={() => setBack(true)}>Back</button>
              <div className="flex flex-col gap-9  h-[80%] w-full justify-center">
                <div className='text-lg self-center'>Group members:</div>
              
                <div className='flex gap-4 flex-col'>
                  <div className='flex flex-row justify-between w-full'>
                  {
                    
                    //NOT THE FUCKING ROOM, I HAVE TO RENDER HERE THE MEMBERS OF THE CURRENT CHANNNEL, SOMEHOW I NEED TO KNOW IN WHICH CHANNEL I AM 
                    //THEN I NEED TO RENDER ITS INFORMATION

                //     rooms.map((room) => <div>{
                //       room.name   
                //     }
                //     <IconButton
                //   style={{color: "white"}}
                //   aria-label="more"
                //   id="long-button"
                //   aria-controls={open ? 'long-menu' : undefined}
                //   aria-expanded={open ? 'true' : undefined}
                //   aria-haspopup="true"
                //   onClick={handleClick}
                // >
                //   <MoreHorizIcon />
                // </IconButton>
                // <Menu
                //   id="long-menu"
                //   MenuListProps={{
                //     'aria-labelledby': 'long-button',
                //   }}
                //   anchorEl={anchorEl}
                //   open={open}
                //   onClose={handleClose}
                //   PaperProps={{
                //     style: {
                //       maxHeight: ITEM_HEIGHT * 4.5,
                //       width: '20ch',
                //       backgroundColor: '#3c005a', 
                //       color: 'white'
                //       // useTransition: '2sec'
                //     },
                //   }}
                // >
                //   {optionsMember.map((option) => (
                //     <MenuItem key={option}  onClick={() => handleOptions(option)}>
                //       {option}
                //     </MenuItem>
                //   ))}
                // </Menu>
                // </div>)
                  }
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-opacity-30 border-violet-400 h-full my-0 mr-5 w-[1px] "></div>
          <div className='flex flex-col w-[60%]'>
          <div className="flex flex-col  p-0 m-0 justify-start w-full h-full pt-">
            <div className='flex flex-row justify-between'>
             <div className='self-center w-[60%]  flex felx-row justify-end'>
              Channel Name
            </div>
            <IconButton
                  style={{color: "white"}}
                  aria-label="more-again"
                  id="long-button-channel"
                  aria-controls={openIt ? 'long-menu-channel' : undefined}
                  aria-expanded={openIt ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClickChannel}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  id="long-menu-channel"
                  MenuListProps={{
                    'aria-labelledby': 'long-button-channel',
                  }}
                  anchorEl={anchorElement}
                  open={openIt}
                  onClose={handleCloseChannel}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                      backgroundColor: '#3c005a', 
                      color: 'white'
                    },
                  }}
                >
                  {optionsChannel.map((optionTwo) => (
                    <MenuItem key={optionTwo}  onClick={() => handleOptionsChannel(optionTwo)}>
                      {optionTwo}
                    </MenuItem>
                  ))}
                </Menu>
            </div>

          <div className="mb-16 overflow-auto" />
          <div className="mb-16 overflow-auto flex-col items-end flex">
            {chatMessages.map((msg, index) => (
              <div key={index} className="max-w-[300px] p-[10px] m-[5px] bg-purple-500 rounded-[50px] self-end">
                {msg}
              </div>
            ))}
          </div>
            </div>
            <div className="flex bottom-4 w-full border border-opacity-30  border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md rounded-[15px]">
              <input
                className="w-[100%] bg-transparent pl-3 py-4 focus:outline-none"
                onKeyDown={(e) => {
                //   handleKeyDown(e);
                  // setReload(!reload);
                }}
                type="text"
                placeholder="Type Message.."
                onChange={(e) =>setMessage(e.target.value)}
                // onChange={handleChange}
                // value={input}
              />
              <button
                onClick={() => {handleChat()}}
              >
                <svg
                  className="text-white m-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
                </svg>
              </button>
            </div>
          </div>
          </div>
        {/* </div> */}
        </>
    )
  )
}

export default ChatRoom