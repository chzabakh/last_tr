import Image from "next/image";
import { useState } from "react";

const FindAFriend = () => {
    const [item, setItem] = useState("6");
  const [input, setInput] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col gap-10 border-2  border-opacity-30 flex-auto h-full  w-[77%] border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="flex border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md spx-5 rounded-[30px]">
          <input
            className="w-full bg-transparent pl-3 focus:outline-none"
            type="text"
            placeholder="Enter the pseudo"
            onChange={handleChange}
            value={input}
          />
          <button
          onClick={() => {}}>
            <svg
              className="h-8 w-8 text-white m-1 p-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />{" "}
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col border-2  border-opacity-30 mx-auto w-[70%] min-h-[300px] h-[70%] border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <Image
            className="object-cover mx-auto rounded-[20px]"
            src={"/ah.jpg"}
            alt="pdp"
            height={80}
            width={80}
          />
          <p className="font-serif text-center py-5 text-xl">adolfy</p>
          <div className="w-full  absolute bottom-10 flex justify-evenly left-0">
            <button className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
              Add as a friend
            </button>
            <button
              onClick={() => setItem("9")}
              className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md py-4 rounded-[30px]"
            >
              See Profile
            </button>
          </div>
        </div>
      </div>
      {item == "9" ? (
        <>
          <div className="absolute z-2 flex justify-evenly border-2  border-opacity-30 w-[98%] h-[90%] border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <div className="w-[40%]">
              <Image
                className="object-cover mx-auto rounded-[20px]"
                src={"/ah.jpg"}
                alt="pdp"
                height={80}
                width={80}
              />
              <p className="font-serif text-center py-5 text-xs">adolfy</p>
              <div className="gap-5 w-full flex flex-col">
                <button className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                  Block user
                </button>
                <button
                  onClick={() => setItem("9")}
                  className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md py-4 rounded-[30px]"
                >
                  Send Message
                </button>
                <button
                  className="hover:text-[#D6B3F1] mx-auto m-0 p-0 w-16"
                  onClick={() => setItem("2")}
                >
                  &larr; Back
                </button>
              </div>
            </div>
            <div className="py-20 pl-40 w-[60%] flex flex-col gap-10">
              <p>Number of matches:</p>
              <p>Wins:</p>
              <p>Loses:</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default FindAFriend;