import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProtectedChannel = () => {
  const [roomName, setChannelName] = useState("");
  const [password, setPassword] = useState("");

  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setChannelName(e.target.value);
  }

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit() {
    if (roomName) {
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };

        const requestBody = {
          password,
          isProtected: true,
          name: roomName,
        };

        const response = await axios.post(
          "http://10.30.144.163:9000/chat/createroom/",
          requestBody,
          { headers }
        );

        if (response.status === 201) {
          alert("Room Created");
          setChannelName("");
          setPassword("");
        } else {
          setChannelName("");
          setPassword("");
          alert("Failed to create room");
        }
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          const error = err.response.data.message || err.message;
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
        className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/40"
        placeholder="Enter name..."
        value={roomName}
        onChange={handleName}
        required
      ></input>
      <p className="text-sm">Channel password</p>
      <input
        type="password"
        id="first_name"
        className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/40"
        placeholder="Enter password..."
        value={password}
        onChange={handlePassword}
        required
      ></input>
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
