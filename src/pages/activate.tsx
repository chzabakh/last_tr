import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Dashboard from "./dashboard";
import Place from "../../public/place.png";
import Cookies from "js-cookie";

const activate = () => {
  
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="h-[35rem] w-[50rem] gap-3 flex justify-center items-center
       flex-col  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white
        bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            
       </div>
    </div>
  )
}
    
export default activate;
