import axios from 'axios';
import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react'

const ChatRoom = () => {

    const [friends, setFriends] = useState([]);

    useEffect(() =>
    {
        getFriends();

    }, [])

    async function getFriends()
    {
        try
        {
            const token = Cookies.get('token')
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get('http://localhost:9000/users/friendlist', { headers });
            console.log({nickname : "oumaima"});
            setFriends(res.data)
            
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
    <>
       <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400  bg-[#571d86]  bg-blur-md backdrop-filter backdrop-blur-md p-4">
          <div className="w-[40%] flex flex-xol justify-center">
            <div className="w-[90%] mt-2">
              <div className="chat-image avatar mx-auto ">
                <div className="w-50 rounded-full">
              </div>
              </div>
              <p className="text-center">
                {/* {chat.users[0].nickname} STATUS: Playing */}
              </p>
              <div className="flex flex-col gap-9  h-[80%] w-full justify-center">
                <div className='text-xs self-center'>Group members:</div>
                {/* {
                  friends.map(friend =>{
                    return <div className='text-white'>{friend.nickname}</div>
                  })
                } */}
                <div className='flex gap-4 flex-col'>
                  <div className='flex flex-row justify-between w-full'>
                  <div>Oumaima </div> 
                    <div className='flex cursor-pointer gap-1'><div className='rounded-full w-1 h-1 bg-white my-3'></div><div className='rounded-full w-1 h-1 bg-white my-3'></div><div className='rounded-full w-1 h-1 bg-white my-3'></div></div>
                  </div>
                  <div className='flex flex-row justify-between w-full'>
                <div>Charaf </div><div className='flex gap-1 cursor-pointer'><div className='rounded-full w-1 h-1 bg-white my-3'></div><div className='rounded-full w-1 h-1 bg-white my-3'></div><div className='rounded-full w-1 h-1 bg-white my-3'></div></div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-opacity-30 border-violet-400 h-full my-0 mr-5 w-[1px] "></div>
          <div className='flex flex-col w-[60%]'>
          <div className="flex flex-col  p-0 m-0 justify-start w-full h-full pt-">
          <div className="mb-16 overflow-auto" />
             ekwjhfbwkfjbewf
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
                // onChange={handleChange}
                // value={input}
              />
              <button
                onClick={(e) => {
                //   sendMsg(e);
                  // setReload(!reload);
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
}

export default ChatRoom