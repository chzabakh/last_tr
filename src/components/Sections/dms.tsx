import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

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

interface Chat {
  id: number;
  createdAt: string;
  lastMessageAt: string;
  messages: Message[];
  name: string | null;
  ownerID: number | null;
  password: string | null;
  uid: string;
  users: User[];
  isGroup: boolean | null;
  isPrivate: boolean | null;
}

interface DmProps {
  dm: string;
  updateItem: (newValue: string, newDm: string) => void;
  chat: Chat;
  setChatList: (newValue: Array<any>) => void;
}

const Dms: React.FC<DmProps> = ({ dm, updateItem, chat, setChatList }) => {
  const [input, setInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setAvatar(res.data.avatarUrl);
        setNickname(res.data.nickname);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };

    getMe();
    setIsLoading(false);
  }, []);

  return (
    <>
    <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#47365ad6] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
      <div className="w-[400px] flex flex-xol justify-center">
        <div className="w-[50%] mt-10">
          <div className="chat-image avatar mx-auto">
            <div className="w-50 rounded-full">
              <Image
                src={`/uploads/${avatar}`}
                width={200}
                height={200}
                alt="friend"
              />
            </div>
          </div>
          <p className="text-center">zuck STATUS: Playing</p>
          <div className="flex flex-col">
            <button className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-full py-1 my-3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
              Invite to a game
            </button>
            <button className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-full py-1 my-3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
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
        <div className="mb-16 overflow-auto ">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            chat.messages.map((chat, index) => (
              <div key={index}>
                {chat.sender.nickname == nickname ? (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <Image
                          src={`/uploads/${chat.sender.avatarUrl}`}
                          width={100}
                          height={100}
                          alt="me"
                        />
                      </div>
                    </div>
                    <div className="chat-bubble">{chat.content}</div>
                  </div>
                ) : (
                  <div className="chat chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <Image
                          src={`/uploads/${avatar}`}
                          width={100}
                          height={100}
                          alt="friend"
                        />
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
            type="text"
            placeholder="Type Message.."
            onChange={handleChange}
            value={input}
          />
          <button>
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
export default Dms;
