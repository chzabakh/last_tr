import React, { ChangeEvent, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const ProtectedChannel = () => {
  const [roomName, setChannelName] = useState("");

  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setChannelName(e.target.value);
  }

  function handleSubmit() {
    if (roomName) {
      try {
        const Token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${Token}` };
        axios.post(
          "http://localhost:9000/chat/createroom/",
          { roomName: roomName },
          { headers }
        );
        alert("Room Created");
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          const error = err.message;
          alert(error);
        } else {
          alert(err.message);
        }
      }
    }
  }
  return (
    <>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-white dark:text-white"
      >
        Channel name:
      </label>
      <input
        type="text"
        id="first_name"
        className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/400"
        placeholder="Enter name..."
        value={roomName}
        onChange={handleName}
        required
      ></input>
      <p className="text-sm">Channel password</p>
      <div className="text-xs">Generated pass</div>
      <button
        className="border-opacity-40 border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full w-[150px] self-center text-xs"
        onClick={handleSubmit}
      >
        Create Channel
      </button>
    </>
  );
};

export default ProtectedChannel;
