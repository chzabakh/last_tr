import React from "react";
import styles from "../styles/register.module.css";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import fourty from "../../public/fourty.png";
import gog from "../../public/google.png";
import Layout from "@/components/Layout/layout";
import { Route } from "react-router-dom";
import { useRouter } from "next/router";

export const Register = () => {

  const router = useRouter();
  const [status, setStatus] = useState("0");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData(data);
  };

  const postData = (data: {
    nickname: string;
    email: string;
    password: string;
  }) => {
    axios
      .post("http://localhost:9000/auth/register", data)
      .then((res: any) => {
        console.log(res);
        setStatus("1");
        setMessage("Created successfully");
        router.push('/login')
        
      })
      .catch((err: any) => {
        console.log(err);
        setStatus("-1");
        setMessage(err?.response?.data?.message);
      });
  };

  return (
    <div className="flex flex-col my-2 justify-between max-w-full mx-[3rem] h-full max-h-full min-h-full relative">
    <Layout>
      <div className="flex w-[100%] flex-col items-center gap-4 mx-auto justify-center relative mb-5">
        <div className={styles.auth}>
          {/* <button className={styles.button}>
            <Image className={styles.logo} alt="" src={fourty} />
            <div>Register with Intra</div>
          </button> */}
          {/* <button className={styles.button}>
            <Image className={styles.logoTwo} alt="" src={gog} />
            Register with Google
          </button> */}
          {/* <div className={styles.or}>Or</div> */}
        </div>
        <form className={styles.formy} onSubmit={handleSubmit}>
          <div className={styles.infos}>
            <h1 className={styles.title}>Sign Up</h1>
            <label className={styles.label}>username:</label>
            <input
              type="nickname"
              placeholder="TheLegend27"
              className={styles.input}
              name="nickname"
              value={data.nickname}
              onChange={handleChange}
              required
            />

            <label className={styles.label}>Email:</label>
            <input
              type="email"
              placeholder="qwe@qwe.com"
              className={styles.input}
              name="email"
              value={data.email}
              onChange={handleChange}
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
              required
            />

            {status === "1" ? <p>{message}</p> : null}
            {status === "-1" ? <p>{message}</p> : null}

            <button type="submit" className={styles.logIn}>
              Register
            </button>
          </div>
          <Link href="login">Already have an account ? Log In.</Link>
        </form>
      </div>
    </Layout>
    </div>
  );
};

export default Register;
