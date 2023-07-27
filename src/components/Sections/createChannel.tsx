"use client";
import React, { useState } from "react";
import PublicChannel from "../channels/publicChannel";
import PrivateChannel from "../channels/privateChannel";
import BrowseChannel from "./browseChannel";
import ProtectedChannel from "../channels/protectedChannel";
import Channels from "./channels";
import Description from "../channels/description";
const CreateChannel = () => {
  const [active, setActive] = useState("null");
  const [back, setback] = useState(false);

  function activatePublic() {
    setActive("public");
  }

  function activatePrivate() {
    setActive("private");
  }

  function activateProtected() {
    setActive("protected");
  }

  function handleback() {
    setback(true);
  }
  return (
    <>
      {back ? (
        <Channels />
      ) : (
        <>
          {
            <div className="flex p-3 flex-col px-20 border-2 items-center gap-2 h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
              <button
                className="bg-black/20 self-start w-[100px] border-4 rounded-full"
                onClick={handleback}
              >
                Back
              </button>
              <h1 className="self-start my-10">Create a channel:</h1>
              <div className="bg-black/20 w-full  h-[70%]  flex justify-between items-center px-5">
                <div className="flex flex-col justify-between gap-10">
                  <div>Select type of channel:</div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div>
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="public"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={activatePublic}
                      ></input>
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                      >
                        Public channel
                      </label>
                    </div>
                    <div>
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="private"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={activatePrivate}
                      ></input>
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                      >
                        Private channel
                      </label>
                    </div>

                    <div>
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="protected"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={activateProtected}
                      ></input>
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                      >
                        Protected channel
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-black/20 p-5 flex flex-col h-[70%] gap-10  w-[50%]">
                  <div>
                    <h1>Channel Information:</h1>
                  </div>
                  <div className="bg-black/20 p-5 h-full flex flex-col justify-evenly">
                    {active && active === "public" && <PublicChannel />}
                    {active && active === "private" && <PrivateChannel />}
                    {active && active === "protected" && <ProtectedChannel />}
                    {active === "null" && <Description />}
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      )}
    </>
  );
};

export default CreateChannel;
