import DashboardLayout from "@/components/Layout/dashboardLayout";
import { User } from "@/components/Sections/findAFriend";
import Avatar from "@/components/avatar";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Leaderboard = () => {
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
      <DashboardLayout>
        <div className="my-20 h-[80%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="flex border-2 h-[25%] flex-auto border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <div className="flex space-x-3">
              <Avatar currentUser={me!} />
              <div>
                <p>{me?.nickname}</p>
                <p>#12</p>
              </div>
            </div>
          </div>
          <div className="border-2 flex-auto h-[100%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"></div>
        </div>
      </DashboardLayout>
    </>
  );
};
export default Leaderboard;
