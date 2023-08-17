'use client'
import React, { useEffect } from 'react'
import { useState, ChangeEvent} from 'react';
import Image from 'next/image';
import axios from 'axios';
import TwoFac from './twoFac';
import Cookies from 'js-cookie';
import Place from '../../../public/Place.png'
import { initialize } from 'next/dist/server/lib/render-server';

const Edit = () => {

    const [showTwoFac, setShowTwoFac] = useState(false);
    const [error, seterror] = useState<string | undefined>();
    const [Preview, setPreview] = useState("");
    const [Avatar, setAvatar] = useState<File | null>(null);
    const [Username, setUsername] = useState('');
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [isUsernameChanged, setIsUsernameChanged] = useState(false);
    const [pass, setpass] = useState('')
    const [oldpass, setoldpass] = useState('')
    const [isPassChanged, setIsPassChanged] = useState(false)
    const [isOldPassChanged, setIsOldPassChanged] = useState(false)
    const [status, setStatus] = useState<"enabled" | "disabled">();

    
    useEffect(() => {
      async function initialize()
      {
        await getStatus();
        await getAvatar();

      }
      initialize();
    }, []);


    function handleAuthClick() {
      setShowTwoFac(true);
    }

    
    async function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        const maxFileSize = 1024 * 1024 * 5; // 5 MB

        if (file.size > maxFileSize) {
          alert('File is too large. Please upload a file smaller than 5 MB.');
          return ;
        }
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl)
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
      const token = Cookies.get('token')
    
      console.log("afyter: ", token )
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get('http://localhost:9000/users/me',  { headers });
        if (res.data.provider === "intra") {
          setPreview(res.data.avatarUrl);
        } else {
          const avatarRes = await axios.get('http://localhost:9000/users/my-avatar', { headers, responseType: 'blob' });
          const blob = new Blob([avatarRes.data], { type: 'image/png' });
          const previewUrl = URL.createObjectURL(blob);
          setPreview(previewUrl);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }


    async function handleSaveChanges() {
      try {
        if (isAvatarChanged && Avatar) {
          const Token =  Cookies.get('token')
          const headers = {
            Authorization: `Bearer ${Token}`,
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
                  const error = err.message;
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

              const Token = Cookies.get('token')
              const headers = { Authorization: `Bearer ${Token}` };
              const data = { nickname: Username };
              await axios.patch('http://localhost:9000/users/me/settings/change-username', data, { headers });
              alert('Username changed!');
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

        if((pass && oldpass) && isPassChanged && isOldPassChanged)
        {

          try{

              const Token = Cookies.get('token')
              const headers = { Authorization: `Bearer ${Token}` };
              const data = {
                password: oldpass,
                new_password: pass,
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
    


  const getStatus = async () =>
  {
    try{

        const Token = Cookies.get('token')
        const headers = {Authorization: `Bearer ${Token}`}
        const auth = await axios.get('http://localhost:9000/2fa/status', {headers});
        console.log(auth.data)
        auth.data === true ? setStatus("enabled") : setStatus("disabled");
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



  const handleDisable = async () =>
  {
    try{

        const Token = Cookies.get('token')
        const headers = {Authorization: `Bearer ${Token}`}
        const auth = await axios.post('http://localhost:9000/2fa/disable', {},  {headers});
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
    {
      !showTwoFac ? (
        <div className="my-20 h-[80%] gap-3 justify-center flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="border-2 flex overflow-scroll flex-col justify-between  h-[97%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className='flex'>
              <div className="flex-1 w-[50%]">Change the Avatar:</div>
            <div className='w-[50%]'>
              <Image src={Preview  || Place} alt="" width={200} height={200} className="border-2 self-center"/>
              <input
                key="avatar"
                type="file"
                accept=".jpg, .jpeg, .png"
                className='my-5 bg-black/20'
                onChange={(e) =>
                {
                  handleAvatarChange(e);
                }}
              />
            </div>
          </div>
          <div className='flex flex-col gap-10 '>
          <div className='flex  w-full flex-row '>
          <div className='w-[50%]'>Change username:</div>
          <input className="p-2 rounded-lg w-[50%] text-white bg-black/20" value={Username} type="text" placeholder='Type new username' onChange={handleNickChange} />
          </div>
          <div className='flex w-full flex-row '>
          <div className='  w-[50%]'>Change email:</div>
          <input className="p-2 rounded-lg w-[50%] text-white bg-black/20" type="text" placeholder='Type new email'/>
          </div>
          <div className=''>Change password: </div>
          <div  className='flex flex-row justify-center flex-wrap'>
              <input className="p-2 rounded-lg text-white m-4 bg-black/20" type="password" placeholder='Type old password'  onChange={handleOldPassChange}/>
              <input  className="p-2 rounded-lg text-white m-4 bg-black/20 mb-5" type="password" placeholder='Type new password' onChange={handlePassChange}/>
          </div>
          </div>
  
  
          <div className='flex flex-col justify-between'>
         
          <div className='flex justify-between'>
            {status === "enabled" ? <button className='border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white p-3 rounded-2xl ' onClick={handleDisable}> Desactivate auth</button> : <button className='border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white p-3 rounded-2xl ' onClick={handleAuthClick}> Activate auth</button>}
              <button className='border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white  p-3 rounded-2xl' onClick={handleSaveChanges} >Save changes</button>
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
