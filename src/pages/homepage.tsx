"use client";

import Image from "next/image";
import styles from "../styles/homepage.module.css";
// import Spline from '@splinetool/react-spline';
import bg from "@/../public/bg.png";
import { TypeAnimation } from "react-type-animation";
import Layout from "@/components/Layout/layout";
import SmallButton from "@/components/Button/smallButton";


export default function Homepage() {

  const animationStyle = {
    animation: 'move 2s ease-in-out infinite alternate',
    
  };
  return (
    <Layout>
      <div className="flex flex-row items-center max-h-full">
        <div className="flex justify-evenly flex-col md:w-[40%] h-[500px] sm:w-[100%]">
          <TypeAnimation
            sequence={[
              "Welcome to the online Pong Game!",
              1000,
              "Chat and play with friends online!",
              1000,
            ]}
            className={styles.title}
            wrapper="div"
            speed={50}
            repeat={Infinity}
          />
          <p className={styles.desc}>
            Join us now and dive into the fun of Pong Game! 
          </p>
          <SmallButton url="login" text="Play now" />
        </div>
        <div className={`w-[50%] flex justify-items-end justify-end  ${styles['item2']}`}>
          <Image alt="" src={bg} className="h-[650px] w-[700px] hidden md:block" />
        </div>
      </div>
    </Layout>
  );
}
