import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Channels from "./channels";
const BrowseChannel = () => {
  const [back, setback] = useState(false);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getChannels();
  }, []);

  function handleback() {
    setback(true);
  }

  async function getChannels() {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.get("http://localhost:9000/chat/my-rooms", {
      headers,
    });
    setRooms(res.data);
  }

  return back === true ? (
    <Channels />
  ) : (
    <>
      {
        <>
          {
            <div className="flex flex-col border-2 items-center justify-center gap-10 h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
              <div className="flex flex-col items-center  h-[80%] w-[90%] gap-8">
                <div className="flex justify-between gap-10 w-full">
                  <button
                    className="bg-black/20 self-start w-[100px] border-4 rounded-full"
                    onClick={handleback}
                  >
                    Back
                  </button>
                  <button
                    className="bg-black/20 self-start w-[200px] border-4 rounded-full"
                    onClick={handleback}
                  >
                    Join Private{" "}
                  </button>
                </div>
                <div className=" w-full p-4 h-[100%] overflow-scroll">
                  <div className="grid grid-cols-3 gap-4 ">
                    {rooms.map((channel) => (
                      <div
                        key={channel.id}
                        className="bg-[#3b0764]/80 p-4 rounded-md text-white shadow-md"
                      >
                        <h3 className="text-xl font-semibold">
                          {channel.name}
                        </h3>
                        <button className=" text-white border-4 border-[#7e22ce] rounded-full px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      }
    </>
  );
};

export default BrowseChannel;
