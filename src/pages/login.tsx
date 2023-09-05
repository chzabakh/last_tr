// Login.tsx
"use client";
import React, { useContext, useEffect } from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import fourty from "../../public/fourty.png";
import gog from "../../public/google.png";
import Layout from "@/components/Layout/layout";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import activate from "./activate";

export const Login: React.FC = () => {
  const router = useRouter();

  const [authWindow, setAuthWin] = useState<Window | null>(null);
  const [token, setToken] = useState("");

  const [status, setStatus] = useState("0");
  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function initialize() {
      await getUser();
    }
    initialize();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postData(data);
  };

  async function getUser() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://10.30.144.163:9000/users/me", {
        headers,
      });
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

  const postData = async (data: { email: string; password: string }) => {
    try {
      const res = await axios.post(
        "http://10.30.144.163:9000/auth/login",
        data
      );
      const tok = res.data.access_token;

      const verify = res.data.isFirstLogin;
      const twoFac = res.data.isTwoFactorEnabled;

      console.log("DATAAA", res);
      // const two = res.data.two
      Cookies.set("token", tok, { path: "/" });

      if (verify) {
        router.push("/addInfos");
      } else {
        // if(twoFac === true)
        // {
        //   router.push('/activate')
        // }
        // else
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);

        setStatus("-1");
        setMessage(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  function openNewWindow() {
    const authWindow = window.open(
      "http://10.30.144.163:9000/auth/42/login",
      "_blank",
      "width=350,height=450"
    );
    console.log("token before: ", Cookies.get());
    if (authWindow) {
      const checkAuthComplete = setInterval(() => {
        const res = Cookies.get("token")?.replace("j:", "");
        console.log("RESPOOONSE: ", res);
        if (!res || res === "undefined") {
          console.error('Token is not defined or is "undefined"');
          return;
        }
        let parsed;
        try {
          console.log("RES :", res);
          parsed = JSON.parse(res);
        } catch (e) {
          console.error("Failed to parse token:", e);
          return;
        }
        const token = parsed.access_token;
        const isFirstLogin = parsed.isFirstLogin;
        const isTwoFactorEnabled = parsed.isTwoFactorEnabled;
        if (token) {
          setToken(token);
          authWindow.close();
          clearInterval(checkAuthComplete);
          Cookies.set("token", token, { path: "/" });
          console.log("token after setting cookies: ", Cookies.get("token"));

          if (isFirstLogin) Router.push("/addInfos");
          else {
            // if(isTwoFactorEnabled === true)
            // {
            //   router.push('/activate')
            // }
            // else
            {
              router.push("/dashboard");
            }
          }
        }
      }, 500);
    } else {
      alert("Failed to open authentication window");
    }
  }

  return (
    <>
      <div className="absolute z-[-1] w-full h-screen max-h-screen max-w-screen overflow-hidden">
        <div id="stars"></div>
        <div id="stars1"></div>
      </div>
      <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen max-h-screen">
        <Layout>
          <div className="w-full flex flex-col items-center justify-center x-auto max-h-full h-full">
            <a className={styles.button} onClick={openNewWindow}>
              <Image className={styles.logo} alt="" src={fourty} />
              <p className="sm:text-lg">Login with Intra</p>
            </a>
            <div className={styles.or}>Or</div>
            <form className={styles.formy} onSubmit={handleSubmit}>
              <div className={styles.infos}>
                <h1 className={styles.title}>Log In</h1>
                <label className={styles.label}>Email:</label>
                <input
                  // type="email"
                  placeholder="abc@xyz.com"
                  className={styles.input}
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  onClick={() => setStatus("0")}
                  required
                />
                <label className={styles.label}>Password:</label>
                <input
                  type="password"
                  placeholder="P@ssw0rd"
                  className={styles.input}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  onClick={() => setStatus("0")}
                  required
                />
                {status === "-1" ? <p>{message}</p> : null}
                <button type="submit" className={styles.logIn}>
                  Login
                </button>
              </div>
              <Link href="register">You do not have an account ? Sign Up.</Link>
            </form>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Login;
