import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Dmpreview from "../messages/dmpreview";

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

interface ChatProps {
  dm: string;
  updateItem: (newValue: string, newDm: string) => void;
}

const Messages: React.FC<ChatProps> = ({ dm, updateItem }) => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/chat/my-chats`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        console.log(response.data);
        setChatList(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
        setIsLoading(false);
      }
    };
    getMessages();
  }, []);

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden flex flex-col border-2 h-full w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
        <div className="overflow-y-auto overflow-x-hidden my-auto h-[90%] ">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            chatList.map((chat, index) => (
              <div key={index}>
                <Dmpreview dm={dm} updateItem={updateItem} chat={chat} setChatList={setChatList} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
