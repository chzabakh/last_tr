'use client'
import axios from 'axios';
import React from 'react'
import { useState , ChangeEvent} from 'react'

const PublicChannel = () => {

  const [roomName, setChannelName] = useState("");

  function handleName(e : ChangeEvent<HTMLInputElement>)
  {
    setChannelName(e.target.value);
  }

  function handleSubmit()
  {
    if(roomName)
    {
      try{
          const Token = localStorage.getItem('token');
          const headers = {Authorization: `Bearer ${Token}`}
          axios.post('http://localhost:9000/chat/createroom/', {roomName: roomName}, {headers})
          alert("Room Created");
      }
      catch(err : any)
      {
          if(axios.isAxiosError(err) && err.response)
          {
              const error = err.message;
              alert(error);
          }
          else
          {
            alert(err.message);
          }
      }
    }
  }
  return (
    <>
    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Channel name:</label>
    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name..." value={roomName} onChange={handleName}  required>
    </input>
    <button className="bg-black/20 p-2 rounded-full w-[200px] self-center" onClick={handleSubmit}>Create Channel</button></>
  )
}

export default PublicChannel