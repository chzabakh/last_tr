// Login.tsx
import React from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import fourty from "../../public/fourty.png";
import gog from "../../public/google.png";
import Layout from "@/components/Layout/layout";
import { useRouter } from 'next/router';
import axios, { AxiosError, AxiosResponse } from "axios";




export const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState([""]);
  const [status, setStatus] = useState("0");


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
    postData(data);
  };

  const postData = async (data: {
    email: string;
    password: string;
  }) => {
      try{
        const res: AxiosResponse = await axios.post("http://localhost:9000/auth/login", data);
       if(res.data)
        {
          alert(JSON.stringify(res.data.access_token))
          localStorage.setItem("token", res.data.access_token);
          // const hey = localStorage.getItem("token");
          router.push("/dashboard");
        }
      }
      catch(err : any)
      {
          if(axios.isAxiosError(err) && err.response)
          {
              const error = err.response.data.message;
              // alert(err.response.data.message)
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
            <div>Login with Intra</div>
          </button>
          <button className={styles.button}>
            <Image className={styles.logoTwo} alt="" src={gog} />
            Login with Google
          </button>
          <div className={styles.or}>Or</div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.infos}>
            <h1 className={styles.title}>Log In</h1>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              placeholder="abc@xyz.com"
              className={styles.input}
              name="email"
              value={data.email}
              onChange={handleChange}
              onClick={() => setStatus('0')}
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
              onClick={() => setStatus('0')}
              required
            />
            {message.length ? <p>{message}</p> : null}
            <button type="submit" className={styles.logIn}>Login</button>
          </div>
          <Link href="register">You do not have an account ? Sign Up.</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
