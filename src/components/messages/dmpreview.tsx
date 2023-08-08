import Image from "next/image";
import { useEffect, useState } from "react";
import Dms from "../Sections/dms";

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

interface MessageProps {
  dm: string;
  updateItem: (newValue: string, newDm: string) => void;
  chat: Chat;
  setChatList: (newValue: Array<any>) => void;
}

const Dmpreview: React.FC<MessageProps> = ({
  dm,
  updateItem,
  chat,
  setChatList,
}) => {
  //   const [dm, setDm] = useState<string>("0");
  // useEffect(() => {
  // console.log("here " + dm )
  // },[dm]
  // )

  return (
    <>
      {dm == "1" ? (
        <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#47365ad6] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <Dms
            dm={dm}
            updateItem={updateItem}
            chat={chat}
            setChatList={setChatList}
          />
        </div>
      ) : (
        <button
          onClick={() => {
            // setDm("1");
            updateItem("7", "1");
          }}
          className="items-center my-1 w-[90%] cursor-pointer flex mx-10 gap-5 flex-row hover:bg-white hover:text-black"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                src={`/uploads/${chat.users[0].avatarUrl}`}
                width={100}
                height={100}
                alt="friend"
              />
            </div>
          </div>
          {!chat.messages[chat.messages.length - 1]?.content ? (
            <p className="italic text-xs xs:text-base lg:text-base">You are new friends, Start chatting now!</p>
          ) : (
            <p className="text-xs xs:text-base lg:text-base">{chat.messages[chat.messages.length - 1]?.content}</p>
          )}
        </button>
      )}
    </>
  );
};
export default Dmpreview;
