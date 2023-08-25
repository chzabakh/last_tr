import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const ChatRoom = () => {
  useEffect(() => {
    getFriends();
  }, []);

  async function getFriends() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.post(
        "http://10.30.163.120:9000/users/friendlist",
        {
          headers,
        }
      );
      console.log(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }
  return <div>ChatRoom</div>;
};

export default ChatRoom;
