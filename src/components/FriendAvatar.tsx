import { useEffect, useState } from "react";
import { Friend } from "./Sections/findAFriend";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

interface FriendAvatarProps {
  currentUser: Friend;
}

const FriendAvatar: React.FC<FriendAvatarProps> = ({ currentUser }) => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/users/${currentUser.id}/avatar`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setImageUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Image
        alt="friendReqPic"
        height={200}
        width={200}
        src={imageUrl || "/place.png"}
      />
    </>
  );
};

export default FriendAvatar;
