import DashboardLayout from "@/components/Layout/dashboardLayout";
import { User } from "@/components/Sections/types";
import Score from "@/tools/score";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Image from "next/image";
import Results from "@/tools/results";

const MatchHistory = () => {
  const [me, setMe] = useState<User>();
  const [users, setUsers] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const me = await axios.get(`http://localhost:9000/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setMe(me.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };
    const getUsers = async () => {
      try {
        const users = await axios.get(`http://localhost:9000/users/all-users`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setUsers(users.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };

    getUser();
    getUsers();
  }, []);

  return (
    <>
      <div className="my-20 h-[80%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="flex flex-row border-2 h-[10em] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="space-x-2 flex flex-row w-1/2 items-center pl-3">
            <Image
              className="w-15 h-15 sm:w-20 sm:h-20 rounded-md"
              src="/place.png"
              width={90}
              height={80}
              alt="asd"
            />
            <div className="flex flex-col my-auto">
              <p className="text-xs lg:text-lg">{me?.nickname}</p>
              <p>#12</p>
            </div>
          </div>
          <div className="w-1/2 flex flex-col my-auto">
            <p className="text-xs lg:text-lg">Total Wins:</p>
          </div>
        </div>
        <div className="w-full overflow-y-scroll border-2 border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
        </div>
      </div>
    </>
  );
};
export default MatchHistory;
