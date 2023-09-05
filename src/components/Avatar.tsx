import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "./Sections/types";

interface AvatarProps {
  currentUser: User | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
  const [imageURL, setImageURL] = useState<string>();

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`http://10.30.144.163:9000/users/${currentUser?.id}/avatar`, {
        headers,
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setImageURL(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Image
        src={imageURL || "/place.png"}
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full max-w-[50px] max-h-[50px]"
      />
    </>
  );
};

export default Avatar;
