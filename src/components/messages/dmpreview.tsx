import Image from "next/image";
import { useEffect, useState } from "react";
import Dms from "../Sections/dms";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

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
  lastmsg: string;
  setLastmsg: (newValue: string) => void;
  dm: string;
  updateItem: (newValue: string, newDm: string) => void;
  chat: Chat;
  setChatList: (newValue: Array<any>) => void;
}

const Dmpreview: React.FC<MessageProps> = ({
  lastmsg,
  setLastmsg,
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
  const [other, setOther] = useState<User>();
  const [pdp, setPdp] = useState<string | undefined>();

  useEffect(() => {
    setLastmsg(chat.messages[chat.messages.length - 1]?.content);
    console.log("cht", chat);
  }, [chat]);

  useEffect(() => {
    const getOther = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/chat/${chat.uid}/other-user`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setOther(res.data);

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

        console.log("rty", res.data, chat.uid, "end");
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };
    getOther();
  }, []);

  return (
    <>
      {dm == chat.id.toString() && other ? (
        // <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#47365ad6] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <Dms
          dm={dm}
          updateItem={updateItem}
          chat={chat}
          setChatList={setChatList}
          other={other}
          setOther={setOther}
        />
      ) : (
        //  </div>
        <button
          onClick={() => {
            // setDm("1");
            updateItem("7", chat.id.toString());
          }}
          className=" -z-20 border-2 border-gray-500 hover:bg-gray-500 bg-gray-600 rounded-lg items-center my-2 w-[90%] cursor-pointer flex mx-2 p-2 gap-5 flex-row"
        >
          <div className="flex flex-col chat-image avatar -z-10">
            <div className="w-10 rounded-full">
              {other?.provider === "email" && pdp ? (
                <Image
                  src={pdp || '/jjjj.png'}
                  width={100}
                  height={100}
                  alt="friend"
                />
              ) : null}
              {other?.provider === "intra" ? (
                <Image
                  src={`${other?.avatarUrl}`}
                  width={100}
                  height={100}
                  alt="friend"
                />
              ) : null}
            </div>
          </div>
          {!chat.messages[chat.messages.length - 1]?.content ? (
            <div className="flex flex-col flex-grow">
              <p className="text-xs italic text-left">{other?.nickname}</p>
              <p className="italic text-xs xs:lg lg:text-xl text-left">
                You are new friends, Start chatting now!
              </p>
            </div>
          ) : (
            <div className="flex flex-col flex-grow">
              <p className="text-xs italic text-left">{other?.nickname}</p>
              <p className="text-xs xs:text-lg lg:text-xl text-left">
                {/* {chat.messages[chat.messages.length - 1]?.content} */}
                {lastmsg}
              </p>
            </div>
          )}
        </button>
      )}
    </>
  );
};
export default Dmpreview;
