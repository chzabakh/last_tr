// Login.tsx
import React, { useContext } from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import fourty from "../../public/fourty.png";
import gog from "../../public/google.png";
import Layout from "@/components/Layout/layout";
import { useRouter } from 'next/router';
import { useAuth } from "./auth_context";

export const Login = () => {

  const router = useRouter();

  const [status, setStatus] = useState("0");
  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const {login, accessToken} = useAuth();

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
      localStorage.setItem("token", tok);
      console.log(localStorage.getItem("token"));
      login(tok);
      console.log("my saved token: [" + accessToken + "]");
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);

        setStatus('-1');
        setMessage(err.response?.data.message);

      } else {
        console.log('Unexpected error', err);
      }
    }
  };

  // const postData = async (data: { email: string; password: string }) => {
  //   axios
  //     .post("http://localhost:9000/auth/login", data)
  //     .then((res: any) => {
  //       tok = res.data.access_token;
  //       localStorage.setItem("token", tok);
  //       console.log(localStorage.getItem("token"));
  //       setToken(tok);
  //       console.log("my saved token: ["+token+"]");
  //     router.push('/dashboard');
  //   })
  //     .catch((err: any) => {console.log(err);
  //       setStatus('-1');
  //       setMessage(err.response.data.message);
  //     });
  // };

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
            {status === '-1' ? <p>{message}</p> : null}
            <button type="submit" className={styles.logIn}>Login</button>
          </div>
          <Link href="register">You do not have an account ? Sign Up.</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
