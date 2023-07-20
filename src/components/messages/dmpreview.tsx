import Image from "next/image";
import { useEffect, useState } from "react";
import Dms from "../Sections/dms";

interface MessageProps {
  updateItem: (newValue: string) => void;
}

const Dmpreview: React.FC<MessageProps> = ({ updateItem }) => {


  const [dm, setDm] = useState<string>("0");
  return (
    <>
      {dm == "1" ? (
        <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[98%] h-full border-yellow-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <Dms />
        </div>
      ) : (
        <div
          onClick={() => {
            setDm("1");
            updateItem("0");
          }}
          className="cursor-pointer flex mx-10 gap-5 flex-row hover:bg-white hover:text-black"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image src="/zuck.jpg" width={10} height={10} alt="friend" />
            </div>
          </div>
          <p>ZAsfsdfsdfsdfswewewewewewep</p>
        </div>
      )}
    </>
  );
};
export default Dmpreview;
