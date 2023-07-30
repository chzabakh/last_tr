import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import Dashboard from './dashboard';
const addInfos = () => {

    const [Avatar, setAvatar] = useState<File | null>(null);
    const [Preview, setPreview] = useState("");
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [error, seterror] = useState("");
    const [Username, setUsername] = useState('');
    const [isUsernameChanged, setIsUsernameChanged] = useState(false);

    const router = useRouter();

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

      async function handleSaveChanges() 
      {
        try {
          if (isAvatarChanged && Avatar) 
          {
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
                    const error = err.message;
                    seterror(error);
                }
                else
                {
                  alert(err.message);
                }
            }
          }
          router.push('/dashboard')

        }
        catch(e)
        {
                alert(e)
        }
    }
    
      

     
    
    return (
    <>
    <div className="my-20 h-[35rem] gap-3 flex justify-center items-center flex-col w-[50%]  mx-auto  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
    
    <div className='flex flex-col justify-center  items-center gap-6'>
            
            <div className="lg:text-lg text-xs max-w-full">Change the Avatar and Username</div>
       
              <Image src="" alt="" width={100} height={100} className="border-2 self-center rounded-full"/>
              <input
                key="avatar"
                type="file"
                accept=".jpg, .jpeg, .png"
                className='my-1 bg-black/20 text-xs'
                onChange={(e) =>
                {
                  handleAvatarChange(e);
                }}
              />
          </div>

       <div className='px-5 gap-10 items-center border-2 h-[60%] w-[70%] flex  flex-col justify-center border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]'>
       <div className='w-[40%] self-center'>Change username:</div>
        <input className="p-2 rounded-lg w-[50%] text-white bg-black/20" type="text" placeholder='Type new username' onChange={handleNickChange} />
        </div>
       <button className='border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white  p-3 rounded-2xl' onClick={handleSaveChanges}>Save changes</button>
       </div>
  </>
  );
}

export default addInfos;
