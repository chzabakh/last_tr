import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState, useTransition } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import Channels from './channels';
import BrowseChannel from "@/components/Sections/browseChannel";
import Loading from "./loading";

import Image from "next/image";
import pong from "../../public/pong.png";
import Avatar from "@/components/avatar";
import { io, Socket } from "socket.io-client";
import crone from "../../../public/crone.png";
import {
  ChatRoomProps,
  Message,
  User,
  ChatRoom,
} from "@/components/Sections/types/index";
import Channels from "@/components/Sections/channels";

const ChatRoom: React.FC<ChatRoomProps> = ({ room }) => {
  const optionsMember = [
    "Ban",
    "Mute",
    "Kick",
    "Send Private Message",
    "Invite to Game",
    "See Profile",
    "Set New Admin",
  ];

  const optionsChannel = ["Add password"];

  const ITEM_HEIGHT = 30;

  const [rooms, setRooms] = useState([]);
  const [image, setImage] = useState<(string | undefined)[]>([]);
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [back, setBack] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [details, setDetails] = useState<ChatRoom | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const messageRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    if (messageRef.current)
      messageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollDown();
  }, [chatMessages]);

  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );
  const openIt = Boolean(anchorElement);

  const handleClickChannel = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseChannel = () => {
    setAnchorElement(null);
    console.log(rooms);
  };

  async function handleBane() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      let requestBody;

      requestBody = {
        conversationId: room.uid,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/ban",
        requestBody,
        { headers }
      );
      console.log(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function handleMute() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      let requestBody;

      requestBody = {
        conversationId: room.uid,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/mute",
        requestBody,
        { headers }
      );
      console.log(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function handleKick() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      let requestBody;

      requestBody = {
        conversationId: room.uid,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/kick",
        requestBody,
        { headers }
      );
      console.log(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function handleMessage() {
    alert("Message");
  }

  async function handleInvite() {
    alert("Invite");
  }

  async function handleProfile() {
    alert("Profile");
  }

  async function handleAdmin() {
    alert("Admin");
  }

  async function handlePassword() {
    alert("Password");
  }

  const handleOptions = (option: string) => {
    switch (option) {
      case "Bane":
        handleBane();
        break;
      case "Mute":
        handleMute();
        break;
      case "Kick":
        handleKick();
        break;
      case "Send Private Message":
        handleMessage();
        break;
      case "Invite to Game":
        handleInvite();
        break;
      case "See Profile":
        handleProfile();
        break;
      case "Set As Admin":
        handleAdmin();
        break;
    }
  };

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:9000/chat");
    setSocket(socket);

    const conversationId = room.uid;
    console.log("CONVERSATION", conversationId);
    socket?.emit("joinRoom", { conversationId });

    return () => {
      socket?.off("joinRoom");
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const newMessageHandler = (message: Message) => {
        console.log(message);
        setChatMessages((cur) => [...cur, message]);
      };

      socket.on("message:new", newMessageHandler);
      return () => {
        socket.off("message:new");
      };
    }
  }, [socket]);

  const handleOptionsChannel = (option: string) => {
    switch (option) {
      case "Add passowrd":
        handlePassword();
        break;
    }
  };

  useEffect(() => {
    async function fetchAvatars() {
      const getImages = users.map(async (user) => {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };
        // console.log(message + ' ' + room.uid);
        const response = await axios.get(
          `http://localhost:9000/users/${user.id}/avatar`,
          { headers, responseType: "blob" }
        );
        if (user.provider === "email") {
          return URL.createObjectURL(response.data);
        }
        console.log("Im Here EMAI!");
        return user.avatarUrl;
      });

      const images = await Promise.all(getImages);
      setImage(images);
      console.log("IMAGES ", images);
    }

    fetchAvatars();
  }, [users]);

  useEffect(() => {
    async function initialize() {
      await getAllRooms();
      await getDetails();
      await getUser();
      setIsLoading(false);
    }
    initialize();
  }, []);

  function handleCopy() {
    if (keyRef.current) {
      const text = keyRef.current.textContent;
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text!)
          .then(() => {
            alert(text);
            console.log("Text copied to clipboard");
          })
          .catch((error) => {
            console.error("Failed to copy text: ", error);
          });
      }
    }
  }

  async function handleChat() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const requestBody = {
        message: message,
        RoomId: room.uid,
      };
      console.log(message + " " + room.uid);
      const res = await axios.post(
        "http://localhost:9000/chat/send-message",
        requestBody,
        { headers }
      );
      if (res.status === 201) {
        // setMessage('')
        console.log(res.data); // Assuming the backend sends the created room details
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function getDetails() {
    try {
      const token = Cookies.get("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(room.uid);
      const res: AxiosResponse<ChatRoom> = await axios.get(
        `http://localhost:9000/chat/channel/${room.uid}/details`,
        config
      );
      if (res.status === 200) {
        setDetails(res.data);
        setUsers(res.data.users);
        setChatMessages(res.data.messages);
        // console.log(res); // Assuming the backend sends the created room details
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function getUser() {
    try {
      const token = Cookies.get("token");

      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:9000/users/me", {
        headers,
      });
      if (res.status === 200) {
        setNickname(res.data.nickname);
        console.log(nickname);
        // console.log(res); // Assuming the backend sends the created room details
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function getAllRooms() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:9000/chat/my-rooms", {
        headers,
      });
      setRooms(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  function isAdmin() {
    return details?.admins.some((admin) => nickname === admin.nickname);
  }

  if (isLoading) {
    return <Loading />;
  }

  return back ? (
    <Channels />
  ) : (
    <>
      <div className="absolute top-0 z-2 flex justify-evenly border-2 rounded-3xl  border-opacity-30 w-[99.9%] h-full  border-violet-400  bg-[#571d86]  bg-blur-md backdrop-filter backdrop-blur-md p-4">
        <div className="w-[40%] flex flex-col h-full  gap-10">
          <div className="flex flex-col h-[60%] items-center gap-5">
            <button
              className="border-2 p-2 rounded-lg w-[50%]"
              onClick={() => setBack(true)}
            >
              Back
            </button>
            <div>
              {details?.isPrivate ? (
                <div className="flex flex-col jsutify-center">
                  Channel key :{" "}
                  <div
                    onClick={handleCopy}
                    ref={keyRef}
                    className="m-3 cursor-pointer"
                  >
                    {details.isPrivateKey}{" "}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="h-full mt-2 flex flex-col ">
            <div className="flex flex-col gap-3  h-[90%] w-full ">
              <div className="text-lg self-center">Group members:</div>

              <div className="flex gap-4 flex-col h-full ">
                <div className="flex flex-col gap-1 w-full h-full items-center overflow-scroll">
                  {users.map((user, index) => (
                    <div className="w-full flex p-3">
                      <div className="flex-1 w-[50%]">
                        {user.provider === "intra" ? (
                          <>
                            <Image
                              key={index}
                              src={user.avatarUrl || "/place.png"}
                              alt={details!.owner.avatarUrl}
                              height={80}
                              width={80}
                              className="rounded-full max-w-[50px] max-h-[50px] relative"
                            />
                          </>
                        ) : (
                          <>
                            <Avatar currentUser={user} />
                          </>
                        )}

                        <div className="relative">
                          {user.state === "online" && (
                            <div className="bg-green-500 w-2 h-2 rounded-full absolute left-10 bottom-1"></div>
                          )}
                          {user.state === "offline" && (
                            <div className="bg-gray-500 w-2 h-2 rounded-full absolute left-0 top-0"></div>
                          )}
                          {user.email === details?.owner.email && (
                            <div className="absolute left-4 bottom-10">
                              <Image
                                src={crone}
                                width={20}
                                height={20}
                                alt="crone"
                              />
                            </div>
                          )}
                          {/* {

                  //TODO : CHANGE TO PLAYING MODE
                   user.state === "inGame" &&
                   (
                       <div className="relative left-1 top-4"><Image src={pong} width={20} height={20} alt="crone" /></div>
                   )

                } */}
                        </div>
                      </div>
                      <div className="flex-1 w-[50%] pt-3 ">
                        {user.nickname}
                      </div>

                      <div className="flex justify-end  w-[50%] self-end">
                        {!isAdmin() ? null : isAdmin() ? (
                          nickname === user.nickname ? null : (
                            <>
                              <IconButton
                                style={{ color: "white" }}
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                                className="bg-white"
                              >
                                <MoreHorizIcon />
                              </IconButton>
                              <Menu
                                id="long-menu"
                                MenuListProps={{
                                  "aria-labelledby": "long-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: "20ch",
                                    backgroundColor: "#3c005a",
                                    color: "white",
                                    // useTransition: '2sec'
                                  },
                                }}
                              >
                                {optionsMember.map((option) => (
                                  <MenuItem
                                    key={option}
                                    onClick={() => handleOptions(option)}
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </>
                          )
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-opacity-30 border-violet-400 h-full my-0 mr-5 w-[1px] "></div>
        <div className="flex flex-col w-[60%]">
          <div className="flex flex-col  p-0 m-0 justify-start w-full h-full pt-">
            <div className="flex flex-row justify-between">
              <div className="self-center w-[60%]  flex felx-row justify-end">
                {details?.name}
              </div>
              <IconButton
                style={{ color: "white" }}
                aria-label="more-again"
                id="long-button-channel"
                aria-controls={openIt ? "long-menu-channel" : undefined}
                aria-expanded={openIt ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClickChannel}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="long-menu-channel"
                MenuListProps={{
                  "aria-labelledby": "long-button-channel",
                }}
                anchorEl={anchorElement}
                open={openIt}
                onClose={handleCloseChannel}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                    backgroundColor: "#3c005a",
                    color: "white",
                  },
                }}
              >
                {optionsChannel.map((optionTwo, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleOptionsChannel(optionTwo)}
                  >
                    {optionTwo}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            <div className="mb-16 overflow-auto" />
            <div className=" mb-16 flex-col flex overflow-y-auto max-h-[400px]">
              {chatMessages.map((msg, index) =>
                nickname === msg.sender.nickname ? (
                  <>
                    <div className="flex self-end gap-2 ">
                      <div>
                        <div
                          key={index}
                          className="max-w-[300px] p-[10px] m-[5px] bg-purple-500 rounded-[50px] self-end break-words "
                        >
                          <div className="flex flex-col ">{msg.content}</div>
                        </div>
                      </div>

                      <div>
                        {msg.sender.provider === "intra" ? (
                          <>
                            <Image
                              src={msg.sender.avatarUrl || "/place.png"}
                              alt={details!.owner.avatarUrl}
                              height={50}
                              width={50}
                              className="rounded-full max-w-[50px] max-h-[50px]"
                            />
                          </>
                        ) : (
                          <>
                            <Avatar currentUser={msg.sender} />
                          </>
                        )}
                        <div className="text-xs opacity-[0.3] self-start">
                          {" "}
                          {msg.createdAt?.slice(11, 16)}
                        </div>
                      </div>
                      <div key={index} ref={messageRef}></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex self-start gap-2">
                      <div>
                        {msg.sender.provider === "intra" ? (
                          <>
                            <Image
                              src={msg.sender.avatarUrl || "/place.png"}
                              alt={details!.owner.avatarUrl}
                              height={50}
                              width={50}
                              className="rounded-full max-w-[50px] max-h-[50px]"
                            />
                          </>
                        ) : (
                          <>
                            <Avatar currentUser={msg.sender} />
                          </>
                        )}
                      </div>
                      <div>
                        <div
                          key={index}
                          ref={messageRef}
                          className="max-w-[300px] p-[10px] m-[5px] bg-purple-400 rounded-[50px] self-start break-words"
                        >
                          <div>{msg.content}</div>
                        </div>
                        <div className="text-xs opacity-[0.3] self-start">
                          {" "}
                          {msg.createdAt?.slice(11, 16)}
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
          <div className="flex bottom-4 w-full border border-opacity-30  border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md rounded-[15px]">
            <input
              className="w-[100%] bg-transparent pl-3 py-4 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChat();
                  setMessage(""); // clear only if Enter is pressed
                }
              }}
              type="text"
              value={message}
              placeholder="Type Message.."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              // onChange={handleChange}
              // value={input}
            />
            <button
              onClick={() => {
                handleChat();
                setMessage("");
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
      </div>
    </>
  );
};

export default ChatRoom;