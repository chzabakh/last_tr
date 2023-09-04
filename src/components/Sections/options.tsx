import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/base";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import Cookies from "js-cookie";
import Play from "./play";
import PongGame from "./pongGame";
import Image from "next/image";
import place from "../../../public/place.png";
import {Friend} from '../../components/Sections/types'

export interface Player {
  id: number;
  nickname: string;
  sockerId: string;
  score: number;
}

export class Ball {
  x!: number;
  y!: number;
}

export class GameTable {
  player1: Player | null = null;
  player2: Player | null = null;
  ball: Ball | undefined;
  roomName: string | undefined;
}

interface Result {
  player1Id: number;
  player2Id: number;
  winnerId: number;
  player1Score: number;
  player2Score: number;
}

interface gameInvite {
  id: number;
  createdAt: string;
  updatedAt: string;
  player1Id: number;
  player2Id: number;
  player1: { nickname: string };
}

const Options = () => {
  const [socket, setSocket] = useState<Socket>();
  const [inQueue, setInQueue] = useState(false); // State to track inQueue status
  const [friends, setFriends] = useState<Friend[]>([]);
  const [gameStart, setGamestart] = useState(false);
  const [user, setUser] = useState<Player>();
  const [countdown, setCountdown] = useState<number | null>(3); // Countdown timer
  const [gameTable, setGameTable] = useState<GameTable>();
  const largeScreenMediaQuery = window.matchMedia("(min-width: 1024px)");
  const [winner, setWinner] = useState<string>("");
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [invite, setInvite] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const defaultStyle = {
    transition: "opacity 0.5s",
    opacity: 1
    };
    
    const fadeOutStyle = {
    transition: "opacity 0.5s",
    opacity: 0
    };
    


  useEffect(() => {
    if (countdown === null) {
      if (canvasRef.current) {
        if (socket) {
          const userID = user?.id!;
          const pongGame = new PongGame(
            canvasRef.current,
            socket,
            gameTable,
            userID,
            largeScreenMediaQuery
          );
          pongGame.render();
        }
      }
    }
  }, [countdown, socket, gameTable, user, largeScreenMediaQuery]);

  useEffect(() => {
    const newSocket = io("http://localhost:9000/game");
    setSocket(newSocket);
    const token = Cookies.get("token");

    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get("http://localhost:9000/users/me", { headers })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      newSocket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const eventListener = (data: any) => {
        setInQueue(true);
        socket.off("inQueue", eventListener);
      };

      const gameStarted = (gameTable: GameTable) => {
        setGameTable(gameTable);
        setGamestart(true);

        socket.off("gameStarted", eventListener);
      };

      socket.on("gameStarted", gameStarted);
      socket.on("inQueue", eventListener);
    }
  }, [socket]);



  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
     setInvite(false);
      setFadeOut(false); 
      
    }, 500);
  };

  useEffect(() => 
  {
    async function initialize()
    {
        await getFriends()

    }
    initialize();
  }, [])



  async function getFriends()
  {
      try
      {
          const token = Cookies.get('token')
          const headers = { Authorization: `Bearer ${token}` };
          const res = await axios.get('http://localhost:9000/users/friendlist', { headers });            
          setFriends(res.data)
          console.log(friends)
        }
      catch(e)
      {
          if(axios.isAxiosError(e))
          {
              if(e.request)
                  console.log("No response received!", e.request);
              else if(e.response)
                  console.log("Error status: ", e.response?.status);
                  console.log("Error data: ", e.response?.data);
          }
          else
          {
              console.log("Error: ", e);
          }
      }
  }


  useEffect(() => {
    if (gameStart) {
      const timer = setInterval(() => {
        if (countdown !== null) {
          if (countdown === 0) {
            clearInterval(timer);
            setCountdown(null);
          } else {
            setCountdown(countdown - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [gameStart, countdown]);

  const playWithRandom = () => {
    if (socket) {
      socket.emit("joinQueue", {
        id: user?.id,
        username: user?.nickname,
        playOption: `playWithRandom`,
      });
    }
  };
  
  return (
    <div className="my-6 h-[95%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
      <div className="flex w-full h-full justify-center items-center">
        {gameStart ? (
          <>
            {countdown !== null ? (
              <h1 className="text-7xl">{countdown}</h1>
              ) : (
                <>
                <div className="flex h-full w-full justify-center items-center">
                {/* <canvas
                  className="lg:flex lg:justify-center lg:absolute lg:top-[25%] lg:left-[25%] lg:rotate-0 bg-black -rotate-90"
                  width={700}
                  height={400}
                  ref={canvasRef}
                  id="gameCanvas"
                ></canvas> */}
                  <div className="my-6 bg-black h-[94%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20  bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                    <div className="border-2 h-[10%] flex justify-between border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#45167233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                      <div className="flex justify-between w-[30%]">
                        <Image
                          src={place}
                          width={50}
                          height={50}
                          alt=""
                          className="rounded-full"
                        />
                        <div>
                          <div>Player2</div>
                          <div>Score</div>
                        </div>
                      </div>
                      <div className="flex justify-between w-[30%]">
                        <div>
                          <div>Player1</div>
                          <div>Score</div>
                        </div>
                        <Image
                          src={place}
                          width={50}
                          height={50}
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div className="border-2 flex h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#53139233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"></div>
                    <div className="border-2 h-[15%] flex justify-around border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#45167233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                      <Button className="border-2 border-white px-4 m-1 rounded-full ">
                        Left
                      </Button>
                      <Button className="border-2 border-white px-4 m-1 rounded-full ">
                        Right
                      </Button>
                    </div>
                  </div>
                  {/* <div
                    className={`flex justify-center absolute top-[25%] left-[25%] 
              `}
                  >
                    <canvas
                      className="lg:flex lg:justify-center lg:absolute lg:top-[25%] lg:left-[25%] lg:rotate-0 bg-black -rotate-90"
                      width={700}
                      height={400}
                      ref={canvasRef}
                      id="gameCanvas"
                    ></canvas>
                  </div> */}
                </div>{" "}
              </>
            )}
          </>
        ) : (
          <>
            {/* <h1 className="text-7xl">Pong Game Lobby</h1> */}
            {inQueue ? (
              <>
                <p className="text-green-500 mt-2">In Queue...</p>
              </>
            ) : (
              <>
                <Button className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3 ">
                  Try Playing
                </Button>
                <Button
                  onClick={playWithRandom}
                  className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3"
                >
                  Play
                </Button>
                <Button className="border-2 border-white px-4 m-8 rounded-full w-[200px] p-3" onClick={() => setInvite(true)}>Invite</Button>
              </>
            )}

            {
                    invite ?
                    <div 
                    style={fadeOut ? fadeOutStyle : defaultStyle} 
                    className='w-[300px] h-[300px] absolute top-1/2 left-[50%] flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2   bg-[#7e22c3] bg-opacity-6 rounded-[30px]'>
                    <button  onClick={handleDelete} className=' self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg'>X</button>
                    <div className='flex flex-col gap-7 items-center'>
                    <h2>Invite friends:</h2>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        {
                            friends.map((friend) => (
                            <div key={friend.id} className="flex justify-evenly">
                                <div className='text-[purple-500]'>{friend.nickname}</div>
                                <button className='border-4 border-[#3b0764] px-2 rounded-full'>Invite</button>
                            </div>
                            ))
                        }
                        </div>
                    </div>
                    :
                    null
                }
          </>
        )}
      </div>
    </div>
  );
};

export default Options;
