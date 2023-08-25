import axios from "axios";
import Cookies from "js-cookie";
import React, { ChangeEvent, useState } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    outline: "none",
    color: "white",
    border: "none",
    boxShadow: "#800080",
    borderRadius: "29px",
    background: "transparent",
  }),
  option: (provided: any) => ({
    ...provided,
    color: "rgba(0, 0, 0, 43)",
    backgroundColor: "white",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "black",
    opacity: "60%",
  }),
};

interface Friend {
  value: number;
  label: string;
}

const PrivateChannel = () => {
  const [roomName, setChannelName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Friend[] | null>(null);

  async function handleSubmit() {
    if (roomName) {
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };

        const requestBody = {
          isPrivate: true,
          name: roomName,
        };

        const response = await axios.post(
          "http://10.30.163.120:9000/chat/createroom/",
          requestBody,
          { headers }
        );

        if (response.status === 201) {
          alert("Room Created");
        } else {
          alert("Failed to create room");
        }
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          const error = err.response.data.message || err.message;
          alert(error);
        } else {
          alert(err.message);
        }
      }
    }
  }

  //get friends from charaf

  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setChannelName(e.target.value);
  }

  const friends: Friend[] = [
    { value: 1, label: "oumaima" },
    { value: 2, label: "oum" },
    { value: 3, label: "oumma" },
    { value: 4, label: "oum" },
    { value: 5, label: "ouima" },
    { value: 6, label: "oum" },
    { value: 7, label: "oumaima" },
    { value: 8, label: "oum" },
    { value: 9, label: "omaima" },
    { value: 10, label: "oum" },
    { value: 11, label: "oumaima" },
    { value: 12, label: "om" },
  ];

  function setHandle(
    selected: MultiValue<Friend>,
    actionMeta: ActionMeta<Friend>
  ) {
    setSelectedOptions(selected as Friend[]);
  }

  return (
    <>
      <label
        htmlFor="channelname"
        className="block mb-2 text-sm font-medium text-white dark:text-white"
      >
        Channel name:
      </label>

      <input
        type="text"
        id="first_name"
        className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/40"
        onChange={handleName}
        placeholder="Enter name..."
        required
      ></input>

      <label
        htmlFor="friendstoinvite"
        className="block mb-2 text-sm font-medium text-white dark:text-white"
      >
        Select friends to invite:
      </label>

      <Select
        options={friends}
        onChange={setHandle}
        isMulti
        className="text-black bg-black/40"
        styles={customStyles}
      />

      <button
        className="border-opacity-40 border-violet-400 hover:border-[#2dd4bf]
     border-[3px] p-2 rounded-full w-[150px] self-center text-xs mt-3"
        onClick={handleSubmit}
      >
        Create Channel
      </button>
    </>
  );
};

export default PrivateChannel;
