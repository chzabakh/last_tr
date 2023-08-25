import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import Place from "../../../public/place.png";
import Router from "next/router";

const TwoFac = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [activate, setActivate] = useState(false);
  const [qr, setQr] = useState("");

  useEffect(() => {
    async function initialize() {
      await getImage();
    }
    initialize();
  }, []);

  const getImage = async () => {
    try {
      const Token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${Token}` };
      console.log("The function to get the code is called");
      const res = await axios.post(
        "http://10.30.163.120:9000/2fa/Generate",
        {},
        { headers, responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: "image/png" });
      const previewUrl = URL.createObjectURL(blob);
      setQr(previewUrl);
    } catch (e) {
      alert(e);
    }
  };

  const submitCode = async () => {
    try {
      const Token = Cookies.get("token");
      const data = {
        code: code,
      };
      const headers = {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        "http://10.30.163.120:9000/2fa/verify",
        data,
        {
          headers,
        }
      );
      if (res.data === true) {
        await Enable2Fac();
        setActivate(true);
      } else {
        setError("Wrong code. Please try again.");
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const Enable2Fac = async () => {
    try {
      const Token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${Token}` };
      const auth = await axios.post(
        "http://10.30.163.120:9000/2fa/enable",
        {},
        { headers }
      );
      console.log(auth.data);
      return true;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
      return false;
    }
  };

  <>
    <div className="my-20 h-[70%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
      <div className="px-5 gap-10 items-center border-2 h-[90%] w-[70%] flex lg:flex-row  flex-col-reverse justify-between border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <Image
          src={qr || Place}
          alt="qr"
          width={100}
          height={100}
          className="lg:w-[20rem] lg:h-[20rem] h-[10rem] w-[10rem] bg-black flex-1 text-center"
        />

        <div className="flex flex-col justify-between flex-1 lg:gap-20">
          <div className="self-center lg:text-2xl text-md font-extrabold">
            <h1>Enable Two Factor</h1>
          </div>
          <div className="flex flex-col lg:gap-4  gap-1 justify-between">
            <p className="text-xs">Scan the QR Code and enter the code:</p>
            <input
              className="lg:p-5 p-3 rounded-2xl bg-black/40"
              type="text"
              placeholder="Enter the digits"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
              }
            ></input>
            <button
              className="border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white p-3 rounded-2xl w-[70%] self-center"
              onClick={submitCode}
            >
              Activate
            </button>
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  </>;

  return (
    <>
      {activate ? (
        <div className="my-20 h-[70%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="flex items-center border-2 h-[90%] w-[70%]  lg:flex-row justify-center border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <p className="text-center w-full self-center bg-black ">
              Two factors Authentication is activated.<button>Go back</button>
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="my-20 h-[70%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <div className="px-5 gap-10 items-center border-2 h-[90%] w-[70%] flex lg:flex-row  flex-col-reverse justify-between border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
              <Image
                src={qr || Place}
                alt="qr"
                width={100}
                height={100}
                className="lg:w-[20rem] lg:h-[20rem] h-[10rem] w-[10rem] bg-black flex-1 text-center"
              />

              <div className="flex flex-col justify-between flex-1 lg:gap-20">
                <div className="self-center lg:text-2xl text-md font-extrabold">
                  <h1>Enable Two Factor</h1>
                </div>
                <div className="flex flex-col lg:gap-4  gap-1 justify-between">
                  <p className="text-xs">
                    Scan the QR Code and enter the code:
                  </p>
                  <input
                    className="lg:p-5 p-3 rounded-2xl bg-black/40"
                    type="text"
                    placeholder="Enter the digits"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCode(e.target.value)
                    }
                  ></input>
                  {error && (
                    <p className="text-xs self-center text-red-700">{error}</p>
                  )}
                  <button
                    className="border-2 border-[#5eead4] hover:text-[#c084fc] hover:border-white p-3 rounded-2xl w-[70%] self-center"
                    onClick={submitCode}
                  >
                    Activate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TwoFac;
