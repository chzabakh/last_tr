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
import { createPortal } from "react-dom";
import addInfos from "./addInfos";
import Cookies from "js-cookie";

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

  const postData = async (data: { email: string; password: string }) => {
    try {
      const res = await axios.post("http://localhost:9000/auth/login", data);
      const tok = res.data.access_token;
      const verify = res.data.isFirstLogin;
      // localStorage.setItem("token", tok);
      Cookies.set("token", tok, { path: "/" });

      // login(tok);
      //check if the infos are set with the added value in response
      //let us pretend that is actually not set
      if (verify) {
        router.push("/addInfos");
      } else {
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
      "http://localhost:9000/auth/42/login",
      "_blank",
      "width=350,height=450"
    );
    console.log("token before: ", Cookies.get());
    if (authWindow) {
      const checkAuthComplete = setInterval(() => {
        const token = Cookies.get("token");
        if (token) {
          setToken(token);
          authWindow.close();
          // Cookies.set('token', token, {path: '/'});
          clearInterval(checkAuthComplete);
          Cookies.set("token", token, { path: "/" });
          console.log("token after setting cookies: ", Cookies.get("token"));
          Router.push("/dashboard");
          // console.log("token after dashboard ", Cookies.get('token'))
        }
        console.log(token);
      }, 500);
    } else {
      alert("Failed to open authentication window");
    }
    // console.log("Cookie after getting out of function ", Cookies.get('token'))
  }
  console.log("token globally: ", Cookies.get("token"));
  return (
    <div className="flex flex-col justify-between max-w-full mx-[3rem] h-full max-h-full min-h-full relative">
      <Layout>
        <div className="flex w-[100%] flex-col items-center gap-4 mx-auto justify-center relative">
          <div className={styles.auth}>
            <a className={styles.button} onClick={openNewWindow}>
              <Image className={styles.logo} alt="" src={fourty} />
              <p className="text-xs sm:text-xl">Login with Intra</p>
            </a>
            {/* <button className={styles.button}>
            <Image className={styles.logoTwo} alt="" src={gog} />
           <p className="text-xs sm:text-xl">Login with Google</p>
          </button> */}
            <div className={styles.or}>Or</div>
          </div>
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
  );
};

export default Login;
