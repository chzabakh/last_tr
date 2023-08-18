import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Dashboard from "./dashboard";
import Place from "../../public/place.png";
import Cookies from "js-cookie";


const activate = () => {
  
  
  const [code, setCode] = useState("");
  const [error, setError] = useState("");




  const submitCode = async () =>
  {

    try{
      const Token = Cookies.get('token')
      console.log('Token ', Token)
      const data = 
      {
        code : code,
      }

      const headers = {Authorization: `Bearer ${Token}`, 'Content-Type': 'application/json'}
      const auth = await axios.post('http://localhost:9000/2fa/enable', {}, {headers});
      console.log("the data" , auth.data)
      try
      {
       
        const res = await axios.post('http://localhost:9000/2fa/verify', data, {headers});
        console.log("DATA " , res.data);
        if(res.data === true)
        {
            Router.push('/dashboard')
        }
        else
        {
          setError("Wrong code. Please try again.");
        }
      }
      catch(e)
      {
        console.log("error: ", e);
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
  
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="h-[35rem] w-[50rem] gap-3 flex justify-center items-center
       flex-col  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white
        bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <div className='flex flex-col justify-center flex-1 lg:gap-20'>
            <div className='self-center lg:text-2xl text-md font-extrabold'>
                <h1>Enable Two Factor</h1>
            </div>
            <div className='flex flex-col lg:gap-4  gap-1 justify-between'>
               <p className='text-xs'>Enter the code in your Auth App:</p> 
                <input className="lg:p-5 p-3 rounded-2xl bg-black/40" type="text" placeholder='Enter the digits' onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}></input>
                <button className='border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white p-3 rounded-2xl w-[70%] self-center' onClick={submitCode}>Submit</button>
            </div>
     {error && <p>{error}</p>}
        </div>
       </div>
    </div>
  )
}
    
export default activate;
