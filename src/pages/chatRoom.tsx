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
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getImageSize } from 'next/dist/server/image-optimizer';
import { getSupportedBrowsers } from 'next/dist/build/utils';
import Avatar from '../components/Avatar'


interface Owner 
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
export interface Users {
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
    Owner: Owner,
    OwnerID: number,
    password: string,
    uid: string, 
    Users: Users[],
}

export interface User {
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
}

interface ChatRoomProps {
  room: channel,
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  room
}) => {
  type User = {
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
  };

  // type Sender = {
  //   avatarUrl: string;
  //   nickname: string;
  //   provider: string;
  //   id : number;
  // }
  
  type Message = {
    content: string;
    roomID: string;
    seen: User[];
    createdAt: string;
    sender: User;
  };
  
  type ChatRoom = {
    id: number;
    createdAt: string;
    lastMessageAt: string;
    name: string;
    isPrivate: null | boolean;
    isPrivateKey: null | boolean;
    isProtected: null | boolean;
    isGroup: boolean;
    password: null | string;
    uid: string;
    ownerID: number;
    users: User[];
    admins: User[];
    owner: User;
    messages: Message[];
  };
  
  
  
  
  const optionsMember = [
    'Ban',
    'Mute',
    'Kick',
    'Send Private Message',
    'Invite to Game',
    'See Profile',
    'Set New Admin'
  ];

  type Images =
  {
    id: number;
    avatarUrl: string;
  }
  
  
  const optionsChannel = [
    'Add password',
  ];
  const ITEM_HEIGHT = 30;
  
  const [rooms, setRooms] = useState([]);
  const [image, setImage] = useState<(string | undefined)[]>([]);
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [back, setBack] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [details, setDetails] = useState<ChatRoom | null>(null);

    
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

    
    useEffect(() => {
    }, [])

    const handleOptionsChannel = (option : string) => {
      switch(option)
      {
        case ("Add passowrd"):
          handlePassword();
          break;

      }
  };

    useEffect(() => {
      async function fetchAvatrs() {
      const getImages = users.map(async (user) => {
          const token = Cookies.get('token')
          const headers = { Authorization: `Bearer ${token}` };
          // console.log(message + ' ' + room.uid);
          const response = await axios.get(`http://localhost:9000/users/${user.id}/avatar`,{ headers, responseType: "blob"});
          if (user.provider === 'email') {
            return URL.createObjectURL(response.data);
          }
          console.log("Im Here EMAI!");
          return user.avatarUrl;
        })
        const images = await Promise.all(getImages);
        setImage(images);
        console.log("IMAGES ", images);
      }
      
      fetchAvatrs();
    }, [users])

    useEffect(() =>
    {
      async function initialize()
      {

        await getAllRooms();
        await getDetails();
        await  getUser();
        setIsLoading(false);
      }
      initialize()
    },[])


    // useEffect(() =>
    // {
    //   async function initialize()
    //   {
    //     users.map((user) =>
    //     {
    //         await findImage(user);
    //     })

    //   }
    //   initialize();

    // },[])

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


    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();  
        // setMessage('')
        handleChat();
      }
    };



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
          console.log(room.uid)
          const res: AxiosResponse<ChatRoom> = await axios.get(`http://localhost:9000/chat/channel/${room.uid}/details`, config);
          if (res.status === 200)
          {
            setDetails(res.data);
            setUsers(res.data.users);
            console.log("Users: ", users)
            console.log("Hahia details" , details)
            console.log("This is the data" , res.data);
            setChatMessages(res.data.messages);
            console.log("Hahome l messagat", chatMessages);
            // console.log(res); // Assuming the backend sends the created room details
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

   

    async function getUser()
    {
      try
      {
          const token = Cookies.get('token')

          const headers = { Authorization: `Bearer ${token}` };
          const res = await axios.get("http://localhost:9000/users/me", { headers });
          if (res.status === 200)
          {
            setNickname(res.data.nickname);
            console.log(nickname);
            // console.log(res); // Assuming the backend sends the created room details
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
                  <div className='flex flex-col justify-between w-full h-full items-center gap-5'>
                  {
                    
                    //NOT THE FUCKING ROOM, I HAVE TO RENDER HERE THE MEMBERS OF THE CURRENT CHANNNEL, SOMEHOW I NEED TO KNOW IN WHICH CHANNEL I AM 
                    //THEN I NEED TO RENDER ITS INFORMATION

               users.map((user, index) => 
                    
            <div className='w-full flex '>
               <div className='flex-1 w-[50%] '>
               {user.provider === 'intra' ? (<>
                    <Image src={user.avatarUrl || "/place.png"} alt={details!.owner.avatarUrl}  height={50} width={50} className='rounded-full max-w-[50px] max-h-[50px]' />
                  </>) : (<>
                  <Avatar currentUser={user}/>
                  </>)}
              </div>
              <div className='flex-1 w-[50%] pt-3 '>
              {user.nickname}
              </div>
              
                <div className='flex justify-end  w-[50%] self-end'>
                <IconButton
                style={{color: "white"}}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                className="bg-white"
              >
                <MoreHorizIcon />
              </IconButton>
      <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                    backgroundColor: '#3c005a', 
                    color: 'white'
                    // useTransition: '2sec'
                  },
                }}
              >
              {optionsMember.map((option) =>
              (
                <MenuItem key={option}  onClick={() => handleOptions(option)}>
                  {option}
                </MenuItem>
              ))}
                </Menu>
                            </div>
                       
            </div>)
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
              {details?.name}
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
                  {optionsChannel.map((optionTwo, index) => (
                    <MenuItem key={index}  onClick={() => handleOptionsChannel(optionTwo)}>
                      {optionTwo}
                    </MenuItem>
                  ))}
                </Menu>
            </div>

          <div className="mb-16 overflow-auto" />
          <div className="mb-16 flex-col items-end flex overflow-y-auto max-h-[400px]" >
                {
                chatMessages.map((msg, index) => (
                  nickname === msg.sender.nickname ?
                   (
                  <>
                  <div className='flex gap-2 '>
                  <div 
                    key={index} 
                    className="max-w-[300px] p-[10px] m-[5px] bg-purple-500 rounded-[50px] self-end break-words "
                  >
                    <div className='flex flex-col '>{msg.content}</div>                  
                  </div>
                  {msg.sender.provider === 'intra' ? (<>
                    <Image src={msg.sender.avatarUrl || "/place.png"} alt={details!.owner.avatarUrl}  height={50} width={50} className='rounded-full max-w-[50px] max-h-[50px]' />
                  </>) : (<>
                  <Avatar currentUser={msg.sender}/>
                  </>)}
                    </div>
                  <div className='text-xs opacity-[0.3]' > {msg.createdAt}</div>
                    </>
                  
                  ) 
                  :
                  (
                    <>
                    <div className='flex  self-start gap-2 '>
            
                    {msg.sender.provider === 'intra' ? (<>
                    <Image src={msg.sender.avatarUrl || "/place.png"} alt={details!.owner.avatarUrl}  height={50} width={50} className='rounded-full max-w-[50px] max-h-[50px]' />
                  </>) : (<>
                  <Avatar currentUser={msg.sender}/>
                  </>)}
                    <div 
                    key={index} 
                    className="max-w-[300px] p-[10px] m-[5px] bg-purple-400 rounded-[50px] self-start break-words"
                  >
                    {msg.content}
                  </div>
                    </div>
                  <div className='text-xs opacity-[0.3] self-start' > {msg.createdAt}</div>
                    </>
                  )
                )
                )}
              </div>

            </div>
            <div className="flex bottom-4 w-full border border-opacity-30  border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md rounded-[15px]">
              <input
                className="w-[100%] bg-transparent pl-3 py-4 focus:outline-none"
                onKeyDown={(e) => {
                handleKeyDown(e)

                }}
                type="text"
                placeholder="Type Message.."
                onChange={(e) =>setMessage(e.target.value)}
                // onChange={handleChange}
                // value={input}
              />
              <button
                 onClick={() => 
                  {  
              
                   handleChat();
                   setMessage('')
                 }}
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