import { Source_Code_Pro } from "next/font/google";
import { createContext, useContext, useState } from "react";
import { AuthProvider } from "./auth_context";
import Homepage from "./homepage";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
    <div className="flexflex-col justify-between max-w-full mx-[3rem] h-screen  max-h-screen relative ">
      <Homepage />
    </div>
    </>
  );
}
