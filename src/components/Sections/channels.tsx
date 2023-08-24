import Image from "next/image";
import { useState } from "react";
import CreateChannel from "./createChannel";
import BrowseChannel from "./browseChannel";

const Channels = () => {
  const [activeComponent, setActiveComponent] = useState("");

  function handleCreate() {
    setActiveComponent("create");
  }

  function handleBrowse() {
    setActiveComponent("browse");
  }

  return (
    <>
      {activeComponent ? (
        <>
          {activeComponent === "create" && <CreateChannel />}
          {activeComponent === "browse" && <BrowseChannel />}
        </>
      ) : (
        <div className="flex px-20 gap-5 border-2 items-center justify-between h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#49126e33] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
          <button className="border-opacity-40  min-w-[100px] border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full w-[150px] self-center text-xs" onClick={handleCreate}>
            Create a channel
          </button>
          <button className="border-opacity-40  min-w-[100px] border-violet-400 hover:border-[#2dd4bf]
  border-[3px] p-2 rounded-full text-xs" onClick={handleBrowse}>
            Browse a channel
          </button>
        </div>
      )}
    </>
  );
};

export default Channels;