'use client'
import React, { useEffect } from 'react'
import TwoFac from './TwoFac'
import { useState, ChangeEvent} from 'react';
import Image from 'next/image';
import axios from 'axios';
import { userAgent } from 'next/server';

const Edit = () => {

    const [showTwoFac, setShowTwoFac] = useState(false);
    const [Preview, setPreview] = useState("");
    const [Username, setUsername] = useState('')

    useEffect(() => {
      getAvatar();
    }, []);
    // Function to handle the button click and show the <TwoFac> component
    function handleAuthClick() {
      setShowTwoFac(true);
    }
    function handleAvatarPreview(e: ChangeEvent<HTMLInputElement>)
    {
      const file = e.target.files?.[0];
      if(file)
      {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    }
    
    async function handleAvatarChange(e: ChangeEvent<HTMLInputElement>)
    {
      const file = e.target.files?.[0]; //safe navigation operatoor 
      if(file)
      {
        const data = new FormData();
        try
        {
            data.append('avatarPic', file);
            await axios.patch('http://localhost:9000/users/upload/avatar', data, {headers:{'Content-Type': 'multipart/form-data'},});
            alert('Avatar updated !')
            window.location.reload();
          }
          catch(err)
          {
              console.log(err);
              alert('failed uploading !')
          }
      }
      else
      {
        alert('Uplad the file you MF!')
      }
    }

    async function getAvatar()
    {
      try
      {
          const Token = localStorage.getItem('token');
          const headers = {Authorization: `Bearer ${Token}`}
          const res = await axios.get('http://localhost:9000/users/me', {headers}); 
          const avatar = res.data.avatarPic;
          setPreview(avatar);

      }
      catch(err)
      {
        console.log(err);
      }
    }

  return (
    <>
    {
      !showTwoFac ? (
        <div className="my-20 h-[70%] gap-3 justify-center flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="border-2 flex overflow-scroll flex-col justify-between gap-10  h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className='flex flex-col gap-10 bg-black/20'>
          <div className="bg-black/20">Change the Avatar:</div>
          <Image src={Preview} alt="" width={200} height={200}/>
          <button onClick={getAvatar}>ojfewhbwjl</button>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) =>
            {
              handleAvatarChange(e);
              handleAvatarPreview(e);
            }}
          />
          </div>
          <div className='flex flex-col gap-10 bg-black/20'>
          <div className='flex flex-row gap-10'>
          <div className='bg-black/20 flex-1 max-w-md'>Change username:</div>
          <input className="p-2 rounded-lg  text-white bg-black/60 flex-1 max-w-sm" value={Username} type="text" placeholder='Type new username' onChange={(e) => setUsername(e.target.value)}/>
          </div>
          {/* <div className='flex flex-row gap-10'>
          <div className='bg-black/20 flex-1 max-w-md'>Change email:</div>
          <input className="p-2 rounded-lg  text-white bg-black/60 flex-1 max-w-sm" type="text" placeholder='Type new email'/>
          </div>
          <div className='bg-black/20'>Change password: </div>
          <div  className='flex flex-row gap-10 justify-center'>
              <input className="p-2 rounded-lg text-white bg-black/60" type="password" placeholder='Type old password'/>
              <input  className="p-2 rounded-lg text-white bg-black/60" type="password" placeholder='Type new password'/>
          </div> */}
          </div>
  
  
          <div className='flex flex-col justify-between'>
         
          <div className='flex justify-between'>
              <button className='bg-black p-3 rounded-2xl' onClick={handleAuthClick}> Activate auth</button>
              <button className='bg-black p-3 rounded-2xl'>Save changes</button>
          </div>
          </div>
  
        </div>
        </div>

      ) :    <div className="h-screen w-full md:w-[90%] flex mx-auto ">
      {showTwoFac && <TwoFac />} </div>
    }
  </>
  );
}

export default Edit;
