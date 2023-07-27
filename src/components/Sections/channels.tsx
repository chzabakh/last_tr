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
        <div className="flex px-20 border-2 items-center justify-between h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
          <button className="bg-black/20 p-6 rounded-full" onClick={handleCreate}>
            Create a channel
          </button>
          <button className="bg-black/20 p-6 rounded-full" onClick={handleBrowse}>
            Browse a channel
          </button>
        </div>
      )}
    </>
  );
};

export default Channels;