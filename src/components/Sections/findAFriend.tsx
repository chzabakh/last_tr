import { useAuth } from "@/pages/auth_context";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Dms from "./dms";
import Messages from "./messages";

interface ChatProps {
  dmm: string;
  updateItemm: (newValue: string, newDm: string) => void;
}

type Friend = {
  avatarUrl: string;
  id: string;
  nickname: string;
  email: string;
  state: string;
  friendStatus: string;
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

const FindAFriend: React.FC<ChatProps> = ({ dmm, updateItemm }) => {
  const [item, setItem] = useState("6");
  const [reload, setReload] = useState(false);
  const [input, setInput] = useState("");
  const [identical, setIdentical] = useState("0");
  const [myswitch, setMyswitch] = useState("list");
  const [dm, setDm] = useState("0");
  const updateItem = (newValue: string, newDm: string) => {
    setItem(newValue);
    setDm(newDm);
  };
  const [friend, setFriend] = useState<Friend>({
    avatarUrl: "null",
    id: "null",
    nickname: "null",
    email: "null",
    state: "null",
    friendStatus: "null",
  });
  const { login, accessToken } = useAuth();
  const [invites, setInvites] = useState<Invitation[]>([]);
  const [myfriends, setMyfriends] = useState<Friend[]>([]);

  // console.log(invites);

  // console.log("please work [" + accessToken + "]");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      handleSubmit(e as any, input); // As we're simulating a button click, we cast the event to any.
    }
  };

  const getUser = async (myinput: string) => {
    try {
      console.log("input: [" + myinput + "]");
      const me = await axios
        .get(`http://localhost:9000/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .catch((err) => {});
      console.log("this is me", me);
      const res = await axios.get(
        `http://localhost:9000/users/${myinput}/profile`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("39", res);
      if (res.data == "") {
        alert("User not found!");
        setFriend({
          avatarUrl: "null",
          id: "notfound",
          nickname: "null",
          email: "null",
          state: "null",
          friendStatus: "null",
        });
      } else {
        setFriend(res.data);
        setMyswitch("search");
        console.log("NNNNNNN", res.data);
      }
      if (
        me?.data.id == res.data.id &&
        me?.data.nickname == res.data.nickname
      ) {
        setIdentical("1");
      } else {
        setIdentical("0");
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
            Authorization: `Bearer ${Cookies.get("token")}`,
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
            Authorization: `Bearer ${Cookies.get("token")}`,
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

  const cancelAdd = async (username: string) => {
    try {
      console.log("ff");
      const cancel = await axios.post(
        `http://localhost:9000/users/${username}/cancel-request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("175" + err.response?.data.message);
      } else {
        console.log("177" + "Unexpected error", err);
      }
    }
  };

  const removeFriend = async (username: string) => {
    try {
      console.log(username);
      const remove = await axios.delete(
        `http://localhost:9000/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
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

  const handleAdd = async (
    e: React.MouseEvent<HTMLButtonElement>,
    reqtype: string
  ) => {
    e.preventDefault();
    if (reqtype == "None") await addUser();
    else if (reqtype == "p-sent") await cancelAdd(input);
    else if (reqtype == "friends") await removeFriend(input);
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
    const invitations = async () => {
      try {
        const res: AxiosResponse<Invitation[]> = await axios.get(
          `http://localhost:9000/users/friend-request-list`,

          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setInvites(res.data);
        // console.log("ww", res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };
    invitations();
    friendsList();
  }, [reload]);

  const handleRemoveObject = (senderId: number) => {
    const newInvites = invites.filter((item) => item.senderID !== senderId); // Filter out the object with the specified ID
    setInvites(newInvites); // Update the state with the new array
  };

  const accDen = async (nickname: string, senderId: number, action: string) => {
    console.log(action);
    console.log("as", invites);
    console.log(senderId);
    if (action === "accept") {
      try {
        const acceptFriend = await axios.post(
          `http://localhost:9000/users/friend-request/${nickname}/accept`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        // console.log(acceptFriend);
        handleRemoveObject(senderId);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    } else if (action === "deny") {
      try {
        console.log("ppppp");
        const denyFriend = await axios.post(
          `http://localhost:9000/users/${nickname}/reject`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        handleRemoveObject(senderId);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    }
  };

  const handleFrReq = async (
    nickname: string,
    senderId: number,
    action: string
  ) => {
    await accDen(nickname, senderId, action);
  };

  const friendsList = async () => {
    try {
      const me = await axios
        .get(`http://localhost:9000/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .catch((err) => {});

      const sendFriendReq = await axios.get(
        `http://localhost:9000/users/friendlist`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setMyfriends(sendFriendReq.data);
      console.log("haa", sendFriendReq.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("89" + err.response?.data.message);
      } else {
        console.log("91" + "Unexpected error", err);
      }
    }
  };

  const callDm = async (userID: number) => {
    try {
      const msg = await axios.post(
        `http://localhost:9000/chat/createroom`,
        { userID: userID },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("qwer", msg);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  return (
    <>
      {dm == "1" ? (
        <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#47365ad6] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          {/* <Dms dm={dm} updateItem={updateItem} /> */}
          {/* <FindAFriend  dmm={dm} updateItemm={updateItem}/> */}
          {/* <Messages dm={dm} updateItem={updateItem} /> */}
        </div>
      ) : (
        <>
          <div className="min-w[400px] flex flex-col gap-10 border-2  border-opacity-30 flex-auto h-full qw-[77%] border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <div className="flex border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md spx-5 rounded-[30px]">
              <input
                className="w-full bg-transparent pl-3 focus:outline-none"
                type="text"
                placeholder="Enter the pseudo"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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
            {friend.id != "notfound" &&
            friend.id != "null" &&
            myswitch == "search" ? (
              <div className="flex flex-col border-2 border-opacity-30 mx-auto w-[70%] max-h-[500px] flex-grow min-h[400px] border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                <button
                  className="w-2"
                  onClick={() => {
                    setMyswitch("list");
                    setReload(!reload);
                    console.log(reload);
                    // setDm("1");
                    // updateItem("1", "6")
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
                <Image
                  className="object-cover h-12 w-12 sm:h-20 sm:w-20 md:h-w-30 md:w-30 xl:h-40 xl:w-40 2xl:h-60 2xl:w-60 mx-auto rounded-[20px]"
                  src={`/uploads/${friend.avatarUrl}`}
                  alt="pdp"
                  height={200}
                  width={200}
                />
                <p className="font-serif text-center py-5 text-xl">
                  {friend.nickname}
                </p>
                <div className="w-full  absolute bottom-10 flex justify-evenly left-0">
                  {friend.friendStatus === "None" && identical === "0" ? (
                    <button
                      onClick={(e) => handleAdd(e, "None")}
                      className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                    >
                      Add friend
                    </button>
                  ) : null}
                  {friend.friendStatus === "Pending Received" ? (
                    <>
                      <button
                        onClick={(e) =>
                          handleFrReq(friend.nickname, 0, "accept")
                        }
                        className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                      >
                        Accept friend request
                      </button>

                      <button
                        onClick={(e) => handleFrReq(friend.nickname, 0, "deny")}
                        className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                      >
                        Deny friend request
                      </button>
                    </>
                  ) : null}
                  {friend.friendStatus === "Pending Sent" ? (
                    <button
                      onClick={(e) => handleAdd(e, "p-sent")}
                      className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                    >
                      Cancel friend request
                    </button>
                  ) : null}
                  {friend.friendStatus === "friend" ? (
                    <button
                      onClick={(e) => handleAdd(e, "friends")}
                      className="text-[#38FFF3] hover:bg-white hover:bg-opacity-10 w-1/3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                    >
                      Remove friend
                    </button>
                  ) : null}
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
                <div className="min-w[400px] flex qflex-wrap flex-col 2xl:flex-row h-[90%] overflow-auto">
                  <div className="mb-5 2xl:mb-0 qmx-auto min-w[350px] 2xl:w-[50%] overflow-auto h-[100%]">
                    <p className="mb-10">Received invites: </p>
                    {invites.map((invitation) => (
                      <div
                        className="min-w[350px] flex items-center mx-1 h-20 my-5 border-2 border-purple-500 relative bg-gray-500 rounded-lg"
                        key={invitation.senderID}
                      >
                        <div className="chat-image avatar my-auto mx-3">
                          <div className="w-14 rounded-full">
                            <Image
                              alt="friendReqPic"
                              height={200}
                              width={200}
                              src={`/uploads/${invitation.sender.avatarUrl}`}
                            />
                          </div>
                        </div>
                        <p className="mx-3 text-xl">
                          {invitation.sender.nickname}
                        </p>

                        <div className="flex absolute right-2 flex-row min-w[110px]">
                          <button
                            onClick={() => {
                              handleFrReq(
                                invitation.sender.nickname,
                                invitation.senderID,
                                "accept"
                              );
                            }}
                            className="btn btn-check mx-2 w-9 h-9"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.293 11.293a1 1 0 011.414 0L10 12.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              handleFrReq(
                                invitation.sender.nickname,
                                invitation.senderID,
                                "deny"
                              );
                            }}
                            className="btn btn-decline mx-2 w-9 h-9"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="qmx-auto min-w[350px] 2xl:w-[50%] overflow-auto h-[100%]">
                    <p className="mb-10 mt-5 2xl:mt-0">Friends list: </p>
                    {myfriends.map((friend) => (
                      <div
                        className="min-w[350px] flex items-center mx-1 h-20 my-5 border-2 border-purple-500 relative bg-gray-500 rounded-lg"
                        key={friend.id}
                      >
                        <div className="chat-image avatar my-auto mx-3">
                          <div className="w-14 rounded-full">
                            <Image
                              alt="friendReqPic"
                              height={200}
                              width={200}
                              src={`/uploads/${friend.avatarUrl}`}
                            />
                          </div>
                        </div>
                        <span>{friend.nickname} :</span>
                        <span>{friend.state}</span>
                        <button
                          onClick={() => {
                            setDm("1");
                            callDm(Number(friend.id));
                          }}
                          className="absolute right-2"
                        >
                          <svg
                            className="text-white mw-2 hover:text-purple-500 hover:bg-slate-200 w-[40px] h-[40px] p-[8px] rounded-md"
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
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          {item == "9" ? (
            <>
              <div className="absolute z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-[100%] border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                <div className="w-[40%]">
                  <Image
                    className="object-cover mx-auto rounded-[20px]"
                    src={`/uploads/${friend.avatarUrl}`}
                    alt="pdp"
                    height={200}
                    width={200}
                  />
                  <p className="font-serif text-center py-5 text-xs">
                    {friend.nickname}
                  </p>
                  <div className="gap-5 w-full flex flex-col">
                    {identical === "0" ? (
                      <>
                        <button
                          onClick={(e) => handleBlock(e, input)}
                          className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                        >
                          Block user
                        </button>
                        <button
                          onClick={() => {
                            setItem("9");
                            callDm(Number(friend.id));
                          }}
                          className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md py-4 rounded-[30px]"
                        >
                          Send Message
                        </button>{" "}
                      </>
                    ) : null}
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
      )}
    </>
  );
};
export default FindAFriend;
