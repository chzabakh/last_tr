import Image from "next/image";
import { useEffect, useState } from "react";
import Dms from "../Sections/dms";

interface MessageProps {
  dm: string;
  updateItem: (newValue: string, newDm: string) => void;
}

const Dmpreview: React.FC<MessageProps> = ({ dm, updateItem }) => {

//   const [dm, setDm] = useState<string>("0");
// useEffect(() => {
// console.log("here " + dm )
// },[dm]
// )

  return (
    <>
      {dm == "1" ? (
        <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#47365ad6] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <Dms dm={dm} updateItem={updateItem}/>
        </div>
      ) : (
        <button
          onClick={() => {
            // setDm("1");
            updateItem("7", "1");
          }}
          className="cursor-pointer flex mx-10 gap-5 flex-row hover:bg-white hover:text-black"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image src="/jjjj.png" width={100} height={100} alt="friend" />
            </div>
          </div>
          <p>ZAsfsdfsdfsdfswewewewewewep</p>
        </button>
      )}
    </>
  );
};
export default Dmpreview;
