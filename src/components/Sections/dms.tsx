import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import io, { Socket } from "socket.io-client";
import { Chat } from "./findAFriend";

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  FirstLogin: boolean;
  TwofaAutEnabled: boolean;
  TwofaAutSecret: string | null;
  avatarUrl: string;
  email: string;
  friendStatus: string;
  hash: string;
  nickname: string;
  provider: string;
  state: string;
}

interface Seen {
  FirstLogin: boolean;
  TwofaAutEnabled: boolean;
  TwofaAutSecret: string | null;
  avatarUrl: string;
  createdAt: string;
  email: string;
  friendStatus: string;
  hash: string;
  id: number;
  nickname: string;
  provider: string;
  state: string;
  updatedAt: string;
}

interface Sender {
  FirstLogin: boolean;
  TwofaAutEnabled: boolean;
  TwofaAutSecret: string | null;
  avatarUrl: string;
  createdAt: string;
  email: string;
  friendStatus: string;
  hash: string;
  id: number;
  nickname: string;
  provider: string;
  state: string;
  updatedAt: string;
}

interface Message {
  content: string;
  createdAt: string;
  id: number;
  recieverID: number;
  roomID: string;
  seen: Seen[];
  sender: Sender;
}

// interface Chat {
//   id: number;
//   createdAt: string;
//   lastMessageAt: string;
//   messages: Message[];
//   name: string | null;
//   ownerID: number | null;
//   password: string | null;
//   uid: string;
//   users: User[];
//   isGroup: boolean | null;
//   isPrivate: boolean | null;
// }

interface DmProps {
  dm: string;
  updateItem: (newValue: string, newDm: string) => void;
  chat: Chat;
  setChatList: (newValue: Array<any>) => void;
  other: User;
  setOther: React.Dispatch<React.SetStateAction<User | undefined>>;
  // setOther: (newValue: User) => void;
}

type Friend = {
  avatarUrl: string;
  id: string;
  nickname: string;
  email: string;
  state: string;
  friendStatus: string;
  provider: string;
};

const Dms: React.FC<DmProps> = ({
  dm,
  updateItem,
  chat,
  setChatList,
  other,
  setOther,
}) => {
  const [input, setInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [newmsg, setNewmsg] = useState<Message[]>([]);
  const [profile, setProfile] = useState(false);
  const [socket, setSocket] = useState<Socket>();
  const [con, setCon] = useState(false);
  const [pdp, setPdp] = useState<string>();
  const [otherpdp, setOtherpdp] = useState<string>();
  // const [myinput, setMyinput] = useState("");
  const [friend, setFriend] = useState<Friend>({
    avatarUrl: "null",
    id: "null",
    nickname: "null",
    email: "null",
    state: "null",
    friendStatus: "null",
    provider: "null",
  });

  // console.log("tocheck",chat);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const sendMsg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:9000/chat/send-message`,
        {
          RoomId: chat.uid,
          message: input,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // setAvatar(res.data.avatarUrl);
      // setNickname(res.data.nickname);
      console.log(reload);
      setInput("");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  useEffect(() => {
    console.log("df");
    // if (!con) {
    // setCon(true);
    const socket = io("http://localhost:9000/chat");
    setSocket(socket);
    const conversationId = chat.uid;
    socket?.emit("joinRoom", { conversationId });
    // }
    return () => {
      socket?.emit("leaveRoom", { conversationId });
      socket.off("leaveRoom");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message:new", (message: Message) => {
        console.log(";", message);
        setNewmsg((cur) => [...cur, message]);
      });
      return () => {
        socket.off("message:new");
        // socket?.disconnect();
      };
    }
  }, [socket]);

  useEffect(() => {
    // console.log(socket);
    const getMe = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setAvatar(res.data.avatarUrl);
        setNickname(res.data.nickname);

        const response = await axios.get(
          `http://localhost:9000/users/${res.data.id}/avatar`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setPdp(URL.createObjectURL(response.data));

        const responseother = await axios.get(
          `http://localhost:9000/users/${other.id}/avatar`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setOtherpdp(URL.createObjectURL(response.data));

      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };

    const getFriend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/users/${chat.users[1].nickname}/profile`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setFriend(res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };

    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/chat/${chat.uid}/messages`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setNewmsg(res.data);
        console.log("tttt", res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };
    console.log("[", chat.users[0].nickname.length, "]");
    // setMyinput(chat.users[0].nickname);
    getMe();
    getMessages();
    getFriend();
    setIsLoading(false);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      sendMsg(e as any);
      // handleSubmit(e as any, input); // As we're simulating a button click, we cast the event to any.
    }
  };

  const blockUser = async () => {
    try {
      const block = await axios.post(
        `http://localhost:9000/users/${input}/block-user`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  const handleBlock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    input: string
  ) => {
    e.preventDefault();
    await blockUser();
  };

  useEffect(() => {

  },[])

  // useEffect(() => {
  //   // if (!other){

  //     const getOther = async () => {
  //       try {
  //         const res = await axios.get(
  //         `http://localhost:9000/chat/${chat.uid}/other-user`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${Cookies.get("token")}`,
  //           },
  //         }
  //         );
  //         setOther(res.data);
  //         console.log("rrrrrrrrr", res.data, chat.uid, "end");
  //       } catch (err) {
  //         if (err instanceof AxiosError) {
  //           console.log(err.response?.data.message);
  //         } else {
  //           console.log("Unexpected error", err);
  //         }
  //       }
  //     };
  //     getOther();
  //   // }
  // }, []);

  console.log("objecttttttttttttttt");
  return (
    <>
      {profile ? (
        <div className="absolute z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-[100%] border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="w-[40%]">
            {other.provider === "email" && otherpdp ? (
              <Image
                className="object-cover mx-auto rounded-[20px]"
                src={otherpdp}
                alt="pdp"
                height={200}
                width={200}
              />
            ) : (
              <Image
                className="object-cover mx-auto rounded-[20px]"
                src={`${other.avatarUrl}`}
                alt="pdp"
                height={200}
                width={200}
              />
            )}
            <p className="font-serif text-center py-5 text-xs">
              {other.nickname}
            </p>
            <div className="gap-5 w-full flex flex-col">
              {
                <button
                  onClick={(e) => handleBlock(e, input)}
                  className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                >
                  Block user
                </button>
                /* <>
                <button
                  onClick={() => {
                    // setItem("9");/////////////////////
                    // callDm(Number(friend.id));/////////////////////
                  }}
                  className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md py-4 rounded-[30px]"
                >
                  Send Message
                </button>{" "}
              </> */
              }

              <button
                onClick={() => setProfile(false)}
                className="hover:text-[#D6B3F1] mx-auto m-0 p-0 w-16"
                // onClick={() => setItem("2")}/////////////////////////////////
              >
                &larr; Back
              </button>
            </div>
          </div>
          <div className="py-20 pl-40 w-[60%] flex flex-col gap-10">
            <p>Number of matches:</p>
            <p>Win:</p>
            <p>Loss:</p>
          </div>
        </div>
      ) : (
        <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#47365ad6] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="w-[400px] flex flex-xol justify-center">
            <div className="w-[50%] mt-10">
              <div className="chat-image avatar mx-auto">
                <div className="w-50 rounded-full">
                  {other?.provider === "email" && pdp ? (
                    <Image
                      src={pdp || '/jjjj.png'}
                      width={200}
                      height={200}
                      alt="friend"
                    />
                  ) : null}
                  {other?.provider === "intra" ? (
                    <Image
                      src={`${other.avatarUrl}`}
                      width={200}
                      height={200}
                      alt="friend"
                    />
                  ) : null}
                </div>
              </div>
              {other ? (
                <p className="text-center">{other?.nickname} STATUS: Playing</p>
              ) : null}
              <div className="flex flex-col">
                <button className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-full py-1 my-3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                  Invite to a game
                </button>
                <button
                  onClick={() => setProfile(true)}
                  className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-full py-1 my-3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                >
                  View Profile
                </button>
                <button
                  className="hover:text-[#D6B3F1] mx-auto m-0 p-0 w-16"
                  onClick={() => {
                    updateItem("7", "0");
                  }}
                >
                  &larr; Back
                </button>
              </div>
            </div>
          </div>
          <div className="border border-opacity-30 border-violet-400 h-full my-0 mr-5 w-[1px]"></div>
          <div className="flex flex-col p-0 m-0 justify-center w-full h-full pt-5">
            <div className="mb-16 overflow-auto " ref={chatContainerRef}>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                newmsg?.map((chat, index) => (
                  // chat.messages.map((chat, index) => (
                  <div key={index}>
                    {chat.sender.nickname == nickname ? (
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            {pdp && chat.sender.provider === "email" ? (
                              <Image
                                src={pdp || '/jjjj.png'}
                                width={100}
                                height={100}
                                alt="me"
                              />
                            ) : null}
                            {chat.sender.provider === "intra" ? (
                              <Image
                                src={`${chat.sender.avatarUrl}`}
                                width={100}
                                height={100}
                                alt="me"
                              />
                            ) : null}
                          </div>
                        </div>
                        <div className="chat-bubble">{chat.content}</div>
                      </div>
                    ) : (
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                          {pdp && chat.sender.provider === "email" ? (
                              <Image
                                src={pdp || '/jjjj.png'}
                                width={100}
                                height={100}
                                alt="me"
                              />
                            ) : null}
                            {chat.sender.provider === "intra" ? (
                              <Image
                                src={`${chat.sender.avatarUrl}`}
                                width={100}
                                height={100}
                                alt="me"
                              />
                            ) : null}
                          </div>
                        </div>
                        <div className="chat-bubble">{chat.content}</div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="flex absolute bottom-4 w-[45%] lg:w-[50%] xl:w-[60%] border border-opacity-30  border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md rounded-[15px]">
              <input
                className="w-full bg-transparent pl-3 py-4 focus:outline-none"
                onKeyDown={(e) => {
                  handleKeyDown(e);
                  // setReload(!reload);
                }}
                type="text"
                placeholder="Type Message.."
                onChange={handleChange}
                value={input}
              />
              <button
                onClick={(e) => {
                  sendMsg(e);
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
        </div>
      )}
    </>
  );
};
export default Dms;
