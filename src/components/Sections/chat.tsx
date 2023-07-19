import { useState } from "react";
import FindAFriend from "./findAFriend";
import Channels from "@/components/Sections/channels";
import Dms from "./dms";
import Messages from "./messages";

const Chat = () => {
  const [item, setItem] = useState("6");

  return (
    <>
      <div className="min-h-[500px] items-center justify-center my-20 h-[70%] gap-3 flex flex-row w-[85%] mx-[2rem] border-2  border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="overflow-auto py-20 flex flex-col space-y-10 border-2  border-opacity-30 w-[25%] flex-auto border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <button
            onClick={() => setItem("6")}
            className={`p-0 hover:text-[#D6B3F1] text-left text-xs xl:text-xl transition-all duration-300 ease-in ${
              item === "6" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }
              

              `}
          >
            Find a Friend
          </button>
          <button
            onClick={() => setItem("7")}
            className={`p-0 hover:text-[#D6B3F1] text-left text-xs xl:text-xl transition-all duration-300 ease-in ${
              item === "7" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }
              

              `}
          >
            Direct messages
          </button>
          <button
            onClick={() => setItem("8")}
            className={`p-0 hover:text-[#D6B3F1] text-left text-xs xl:text-xl transition-all duration-300 ease-in ${
              item === "8" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }
              

              `}
          >
            Channels
          </button>
        </div>
        {item == "2" || item == "6" ? <FindAFriend /> : null}
        {/* {item == "7" ? <Dms/> : null} */}
        {item == "7" ? <Messages /> : null}
        {item === "8" ? <Channels /> : null}
      </div>
    </>
  );
};
export default Chat;
