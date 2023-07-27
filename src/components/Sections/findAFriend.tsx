import { useAuth } from "@/pages/auth_context";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type Friend = {
  avatarUrl: string;
  id: string;
  nickname: string;
  email: string;
};

interface Sender {
  nickname: string;
  avatarUrl: string;
}

interface Invitation {
  id: number;
  sender: Sender;
  createdAt: string;
  updatedAt: string;
  senderID: number;
  recipientId: number;
  friendRequestStatus: string;
}

const FindAFriend = () => {
  const [item, setItem] = useState("6");
  const [input, setInput] = useState("");
  const [friend, setFriend] = useState<Friend>({
    avatarUrl: "null",
    id: "null",
    nickname: "null",
    email: "null",
  });
  const { login, accessToken } = useAuth();
  const [invites, setInvites] = useState<Invitation[]>([]);

  console.log(invites);

  // console.log("please work [" + accessToken + "]");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const getUser = async (myinput: string) => {
    try {
      console.log("input: [" + myinput + "]");
      const res = await axios.get(
        `http://localhost:9000/users/${myinput}/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("39", res);
      if (res.data == "") {
        setFriend({
          avatarUrl: "null",
          id: "notfound",
          nickname: "null",
          email: "null",
        });
      } else {
        setFriend(res.data);
        console.log("49", friend.avatarUrl);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    myinput: string
  ) => {
    e.preventDefault();
    await getUser(myinput);
  };

  const addUser = async () => {
    try {
      const me = await axios
        .get(`http://localhost:9000/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .catch((err) => {});

      const sendFriendReq = await axios.post(
        `http://localhost:9000/users/${me?.data.nickname}/send-friend-request`,
        {
          recipientUserName: `${input}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("89" + err.response?.data.message);
      } else {
        console.log("91" + "Unexpected error", err);
      }
    }
  };

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addUser();
  };

  const blockUser = async () => {
    try {
      const block = await axios.post(
        `http://localhost:9000/users/${input}/block-user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const invitations = async () => {
      try {
        const res: AxiosResponse<Invitation[]> = await axios.get(
          `http://localhost:9000/users/friend-request-list`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setInvites(res.data);
        console.log("ww", res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };
    invitations();
  }, []);

  return (
    <>
      <div className="overflow-auto flex flex-col gap-10 border-2  border-opacity-30 flex-auto h-full  w-[77%] border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="flex border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md spx-5 rounded-[30px]">
          <input
            className="w-full bg-transparent pl-3 focus:outline-none"
            type="text"
            placeholder="Enter the pseudo"
            onChange={handleChange}
            value={input}
          />
          <button onClick={(e) => handleSubmit(e, input)}>
            <svg
              className="h-8 w-8 text-white m-1 p-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        {friend.id != "null" ? (
          <div className="flex flex-col border-2  border-opacity-30 mx-auto w-[70%] min-h-[300px] h-[70%] border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <Image
              className="object-cover h-12 w-12 sm:h-20 sm:w-20 md:h-w-30 md:w-30 xl:h-40 xl:w-40 2xl:h-60 2xl:w-60 mx-auto rounded-[20px]"
              // src={`/avatars/player2.png`}
              src={`/avatars/${friend.avatarUrl}`}
              alt="pdp"
              height={80}
              width={80}
            />
            <p className="font-serif text-center py-5 text-xl">
              {friend.nickname}
            </p>
            <div className="w-full  absolute bottom-10 flex justify-evenly left-0">
              <button
                onClick={(e) => handleAdd(e)}
                className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
              >
                Add friend
              </button>
              <button
                onClick={() => setItem("9")}
                className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md py-4 rounded-[30px]"
              >
                See Profile
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p className="mb-10">Received invites: </p>
              {invites.map((invitation) => (
                <div
                  className="flex items-center h-16 my-auto border"
                  key={invitation.senderID}
                >
                  {/* {invitation.senderID} */}
                  {invitation.sender.nickname}
                  {/* {getUser()} */}

                    <div className="w-50 rounded-full">
                      <Image
                        alt="friendReqPic"
                        height={20}
                        width={20}
                        src={`/avatars/${invitation.sender.avatarUrl}`}
                      />
                  </div>
                </div>
              ))}
            </div>
            {console.log(invites.length)}
          </>
        )}
      </div>
      {item == "9" ? (
        <>
          <div className="absolute z-2 flex justify-evenly border-2  border-opacity-30 w-[98%] h-[90%] border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <div className="w-[40%]">
              <Image
                className="object-cover mx-auto rounded-[20px]"
                src={"/ah.jpg"}
                alt="pdp"
                height={80}
                width={80}
              />
              <p className="font-serif text-center py-5 text-xs">adolfy</p>
              <div className="gap-5 w-full flex flex-col">
                <button
                  onClick={(e) => handleBlock(e, input)}
                  className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                >
                  Block user
                </button>
                <button
                  onClick={() => setItem("9")}
                  className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md py-4 rounded-[30px]"
                >
                  Send Message
                </button>
                <button
                  className="hover:text-[#D6B3F1] mx-auto m-0 p-0 w-16"
                  onClick={() => setItem("2")}
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
        </>
      ) : null}
    </>
  );
};

export default FindAFriend;
