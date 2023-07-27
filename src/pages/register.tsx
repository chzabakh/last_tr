import React, { useEffect } from "react";
import styles from "../styles/register.module.css";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import fourty from "../../public/fourty.png";
import gog from "../../public/google.png";
import Layout from "@/components/Layout/layout";
import Dashboard from "./dashboard";
import { useRouter } from "next/router";


export const Register = () => {

  const [message, setMessage] = useState([""]);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData(data);
  };

  const router = useRouter(); 

  const postData = async (data: {
    nickname: string;
    email: string;
    password: string;
  }) => {
      try{
        const res: AxiosResponse = await axios.post("http://localhost:9000/auth/register", data);
       if(res.data)
        {
          localStorage.setItem("token", res.data.access_token);
          // const hey = localStorage.getItem("token");
          router.push("/login");
        }
      }
      catch(err : any)
      {
          if(axios.isAxiosError(err) && err.response)
          {
              const error = err.response.data.message;
              // console.log(err.response.data)
              setMessage(error);
          }
          else
          {
            alert(err.message);
          }
      }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.auth}>
          <button className={styles.button}>
            <Image className={styles.logo} alt="" src={fourty} />
            <div>Register with Intra</div>
          </button>
          <button className={styles.button}>
            <Image className={styles.logoTwo} alt="" src={gog} />
            Register with Google
          </button>
          <div className={styles.or}>Or</div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
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

            {message.length ? <p>{message}</p> : null}

            <button type="submit" className={styles.logIn}>
              Register
            </button>
          </div>
          <Link href="login">Already have an account ? Log In.</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
