import Leaderboard from "@/components/Sections/leaderboard";
import Chat from "@/components/Sections/chat";
import Edit from "@/components/Sections/edit";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "./auth_context";

const Dashboard = () => {
  const [item, setItem] = useState("1");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  // const { accessToken } = useAuth();

  // console.log(accessToken);

  return (
    <>
      <div className="flex flex-row h-full">
        {windowWidth > 768 ? (
          <div className=" flex flex-col border-2  border-opacity-30 border-violet-400 min-h-screen h-full w-[30%] lg:w-[20%] bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-lg">
            <div>
              <Image
                className="object-cover flex-auto mx-auto rounded-[30px]"
                src={"/ah.jpg"}
                alt="pdp"
                height={200}
                width={200}
              />
              <p className="font-serif text-center py-5 text-xl">adolfy</p>
            </div>
            <div className="w-full flex flex-col pt-[2rem]">
              <button
                onClick={() => setItem("1")}
                className={`hover:text-[#D6B3F1] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in ${
                  item === "1" ? "text-[#D6B3F1] bg-white" : ""
                }
              
              ${item !== "1" ? "hover:bg-white/30" : ""}

              `}
              >
                LeaderBoard
              </button>
              <button
                onClick={() => setItem("2")}
                className={`hover:text-[#D6B3F1] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in ${
                  item === "2" ? "text-[#D6B3F1] bg-white" : ""
                }
              
              ${item !== "2" ? "hover:bg-white/30" : ""}

              `}
              >
                Chat
              </button>
              <button
                onClick={() => setItem("3")}
                className={`hover:text-[#D6B3F1] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in ${
                  item === "3" ? "text-[#D6B3F1] bg-white" : ""
                }
              
              ${item !== "3" ? "hover:bg-white/30" : ""}

              `}
              >
                Play Game
              </button>
              <button
                onClick={() => setItem("4")}
                className={`hover:text-[#D6B3F1] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in ${
                  item === "4" ? "text-[#D6B3F1] bg-white" : ""
                }
              
              ${item !== "4" ? "hover:bg-white/30" : ""}

              `}
              >
                Match
              </button>
              <button
                onClick={() => setItem("5")}
                className={`hover:text-[#D6B3F1] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in ${
                  item === "5" ? "text-[#D6B3F1] bg-white" : ""
                }
              
              ${item !== "5" ? "hover:bg-white/30" : ""}

              `}
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : null}
        <div className="h-screen w-full md:w-[90%] flex mx-auto ">
          {item === "1" ? <Leaderboard /> : null}
          {item === "2" ? <Chat /> : null}
          {item == "5" ? <Edit /> : null}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
