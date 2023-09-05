import Image from "next/image";
import { useRef, useState } from "react";
import CreateChannel from "./createChannel";
import BrowseChannel from "./browseChannel";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import ChatRoom from "@/pages/chatRoom";
import chat from "./chat";
import { Channel } from "./types/types";
const Channels = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const [myRooms, setmyRooms] = useState<Channel[]>([]);
  const [chat, setChat] = useState(false);
  const [channel, setChannel] = useState<Channel>();

  function handleCreate() {
    setActiveComponent("create");
  }

  function handleBrowse() {
    setActiveComponent("browse");
  }

  useEffect(() => {
    getMyChannels();
  }, []);

  async function getMyChannels() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://10.30.144.163:9000/chat/my-rooms", {
        headers,
      });
      setmyRooms(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function handleLeaveRoom(channel: Channel) {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      let requestBody;

      requestBody = {
        conversationId: channel.uid,
      };
      const res = await axios.post(
        "http://10.30.144.163:9000/chat/leave-room",
        requestBody,
        { headers }
      );
      console.log(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  function handleChat(Channel: Channel) {
    console.log("Hhia channel", Channel);
    setChannel(Channel);
    setChat(true);
  }

  return (
    <>
      {chat && channel ? (
        <ChatRoom room={channel} />
      ) : activeComponent ? (
        <>
          {activeComponent === "create" && <CreateChannel />}
          {activeComponent === "browse" && <BrowseChannel />}
        </>
      ) : (
        <>
          <div className="flex flex-col p-20 gap-1 border-2  justify-between h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#49126e33] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
            <div>My joined channels:</div>
            <div className="h-[60%]  overflow-scroll ">
              <div className="grid grid-cols6 gap-4">
                {myRooms.map((ChannelName: Channel) => (
                  <div
                    key={ChannelName.id}
                    className="bg-gradient-to-r from-black to-purple-500 my-3 p-4 rounded-md text-white shadow-md"
                  >
                    <h3 className="text-xl font-semibold ">
                      {ChannelName.name}
                    </h3>
                    <>
                      <div className="flex justify-end  gap-3">
                        <button
                          className=" text-white border-4 border-black  rounded-full 
                                  py-2 px-4 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                          onClick={() => handleLeaveRoom(ChannelName)}
                        >
                          Leave
                        </button>
                        <button
                          className=" text-white border-4 border-black  rounded-full 
                                        py-2 px-4 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                          onClick={() => handleChat(ChannelName)}
                        >
                          Enter
                        </button>
                      </div>
                    </>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <button
                className="border-opacity-40  min-w-[100px] border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full w-[150px] self-center text-xs"
                onClick={handleCreate}
              >
                Create a channel
              </button>
              <button
                className="border-opacity-40  min-w-[100px] border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full text-xs"
                onClick={handleBrowse}
              >
                Browse a channel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Channels;
