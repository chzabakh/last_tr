import Image from "next/image";

const Test = () => {
    return (
        <>
       <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#47365ad6] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4">
          <div className="w-[400px] flex flex-xol justify-center">
            <div className="w-[50%] mt-10">
              <div className="chat-image avatar mx-auto">
                <div className="w-50 rounded-full">
                
                </div>
              </div>
              <p className="text-center">
                {/* {chat.users[0].nickname} STATUS: Playing */}
              </p>
              <div className="flex flex-col">
                <button className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-full py-1 my-3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                  Invite to a game
                </button>
                <button
                //   onClick={() => setProfile(true)}
                  className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-full py-1 my-3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                >
                  View Profile
                </button>
                <button
                  className="hover:text-[#D6B3F1] mx-auto m-0 p-0 w-16"
                  onClick={() => {
                    // updateItem("7", "0");
                  }}
                >
                  &larr; Back
                </button>
              </div>
            </div>
          </div>
          <div className="border border-opacity-30 border-violet-400 h-full my-0 mr-5 w-[1px]"></div>
          <div className="flex flex-col p-0 m-0 justify-center w-full h-full pt-5">
            <div className="mb-16 overflow-auto " />
             
            </div>
            <div className="flex absolute bottom-4 w-[45%] lg:w-[50%] xl:w-[60%] border border-opacity-30  border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md rounded-[15px]">
              <input
                className="w-full bg-transparent pl-3 py-4 focus:outline-none"
                onKeyDown={(e) => {
                //   handleKeyDown(e);
                  // setReload(!reload);
                }}
                type="text"
                placeholder="Type Message.."
                // onChange={handleChange}
                // value={input}
              />
              <button
                onClick={(e) => {
                //   sendMsg(e);
                  // setReload(!reload);
                }}
              >
                <svg
                  className="text-white m-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
                </svg>
              </button>
            </div>
          </div>
        {/* </div> */}
        </>
    );
}

export default Test;