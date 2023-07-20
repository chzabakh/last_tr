import { Source_Code_Pro } from "next/font/google";
import { createContext, useState } from "react";
import Homepage from "./homepage";
export const UserContext = createContext<{ token: string; setToken: React.Dispatch<React.SetStateAction<string>> }>({ token: "NULL", setToken: () => {} });

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
export default function Home() {
  const [token, setToken] = useState("NUiLL");
  return (
    <>
    <UserContext.Provider value={{ token, setToken }}>

    <div className="container">
      <Homepage />
    </div>
    </UserContext.Provider>
    </>
  );
}
