import Cookies from "js-cookie";
import Homepage from "./homepage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    Cookies.set("check", "passed", { path: "/" });
    if (Cookies.get("check") !== "passed") {
      alert("please enable cookies!");
      router.push("/login");
      if (Cookies.get("token")) {
        Cookies.set("token", "", { path: "/" });
      }
    }
  }, []);

  return (
    <>
      <div className="absolute z-[-1] w-full h-screen max-h-screen max-w-screen overflow-hidden">
        <div id="stars"></div>
        <div id="stars1"></div>
      </div>
      <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen  max-h-screen">
        <Homepage />
      </div>
    </>
  );
}
