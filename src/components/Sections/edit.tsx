'use client'
import React, { useEffect } from 'react'
import TwoFac from './TwoFac'
import { useState, ChangeEvent} from 'react';
import Image from 'next/image';
import axios from 'axios';
import { League_Script } from 'next/font/google';

const Edit = () => {

    const [showTwoFac, setShowTwoFac] = useState(false);
    const [Preview, setPreview] = useState("");
    const [Avatar, setAvatar] = useState<File | null>(null);
    const [Username, setUsername] = useState('');
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [isUsernameChanged, setIsUsernameChanged] = useState(false);
    const [pass, setpass] = useState('')
    const [oldpass, setoldpass] = useState('')
    const [isPassChanged, setIsPassChanged] = useState(false)
    const [isOldPassChanged, setIsOldPassChanged] = useState(false)
    const [error, seterror] = useState("");

    
    useEffect(() => {
      getAvatar();
     
    }, [Preview]);

    // useEffect(() => {
    //   getNick();
     
    // }, [Username]);
    
    // Function to handle the button click and show the <TwoFac> component


    function handleAuthClick() {
      setShowTwoFac(true);
    }

    
    function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setIsAvatarChanged(true);
        setAvatar(file); // Save the file in the state for later submission
      } else {
        alert('Upload the file you MF!');
      }
    }
    
    function handleNickChange(e: ChangeEvent<HTMLInputElement>)
    {
      setUsername(e.target.value);
      setIsUsernameChanged(true)

    }

    function handlePassChange(e: ChangeEvent<HTMLInputElement>)
    {
        setpass(e.target.value)
        setIsPassChanged(true)
    }


    function handleOldPassChange(e: ChangeEvent<HTMLInputElement>)
    {
        setoldpass(e.target.value)
        setIsOldPassChanged(true)
    }


    async function getAvatar()
    {
      try
      {
          const Token = localStorage.getItem('token');
          const headers = {Authorization: `Bearer ${Token}`}
          const res = await axios.get('http://localhost:9000/users/me', {headers}); 
          const avatar = res.data.avatarPic;
          console.log(res.data)
          console.log(res.data.avatarPic)
          setPreview(avatar);

      }
      catch(err)
      {
        console.log(err);
      }
    }


    async function getNick()
    {
      try
      {
          const Token = localStorage.getItem('token');
          const headers = {Authorization: `Bearer ${Token}`}
          const res = await axios.get('http://localhost:9000/users/me', {headers}); 
          const nickname= res.data.nickname;
          console.log(res.data)
          setUsername(nickname);

      }
      catch(err)
      {
        console.log(err);
      }
    }

    async function handleSaveChanges() {
      try {
        if (isAvatarChanged && Avatar) {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };
        
          const data = new FormData(); 
          data.append('avatar', Avatar);
        
          try {
            await axios.patch('http://localhost:9000/users/upload/avatar', data, {
              headers: {
                ...headers,
              },
            });

            alert('Avatar updated!');
          } 
          catch(err : any)
          {
              if(axios.isAxiosError(err) && err.response)
              {
                  const error = err.response.data.message;
                  seterror(error);
              }
              else
              {
                alert(err.message);
              }
          }
        }
        
    
        if (isUsernameChanged && Username) {

          try{

              const Token = localStorage.getItem('token');
              const headers = { Authorization: `Bearer ${Token}` };
              const data = { nickname: Username };
              await axios.patch('http://localhost:9000/users/me/settings/change-username', data, { headers });
              alert('Username changed!');
          }
          catch(err : any)
          {
              if(axios.isAxiosError(err) && err.response)
              {
                  const error = err.response.data.message;
                  seterror(error);
              }
              else
              {
                alert(err.message);
              }
          }
        }

        if((pass && oldpass) && isPassChanged && isOldPassChanged)
        {

          try{

              const Token = localStorage.getItem('token');
              const headers = { Authorization: `Bearer ${Token}` };
              const data = {
                oldPassword: oldpass,
                newPassword: pass,
              };
              await axios.patch('http://localhost:9000/users/me/settings/new-password', data, { headers });
              alert('Password changed!');
          }
          catch(err : any)
          {
              if(axios.isAxiosError(err) && err.response)
              {
                  const error = err.message;
                  seterror(error);
              }
              else
              {
                alert(err.message);
              }
          }

        }

      } catch (err) {
        alert(err);
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
          <input
            key="avatar"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) =>
            {
              handleAvatarChange(e);
            }}
          />
          </div>
          <div className='flex flex-col gap-10 bg-black/20'>
          <div className='flex flex-row gap-10'>
          <div className='bg-black/20 flex-1 max-w-md'>Change username:</div>
          <input className="p-2 rounded-lg  text-white bg-black/60 flex-1 max-w-sm" value={Username} type="text" placeholder='Type new username' onChange={handleNickChange} />
          </div>
          <div className='flex flex-row gap-10'>
          <div className='bg-black/20 flex-1 max-w-md'>Change email:</div>
          <input className="p-2 rounded-lg  text-white bg-black/60 flex-1 max-w-sm" type="text" placeholder='Type new email'/>
          </div>
          <div className='bg-black/20'>Change password: </div>
          <div  className='flex flex-row gap-10 justify-center'>
              <input className="p-2 rounded-lg text-white bg-black/60" type="password" placeholder='Type old password'  onChange={handleOldPassChange}/>
              <input  className="p-2 rounded-lg text-white bg-black/60" type="password" placeholder='Type new password' onChange={handlePassChange}/>
          </div>
          </div>
  
  
          <div className='flex flex-col justify-between'>
         
          <div className='flex justify-between'>
              <button className='bg-black p-3 rounded-2xl' onClick={handleAuthClick}> Activate auth</button>
              <button className='bg-black p-3 rounded-2xl' onClick={handleSaveChanges} >Save changes</button>
              {error && <p>{error}</p> }
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
