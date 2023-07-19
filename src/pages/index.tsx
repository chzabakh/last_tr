import { Source_Code_Pro } from "next/font/google";
import Homepage from "./homepage";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
export default function Home() {
  return (
    <div className="container">
      <Homepage />
    </div>
  );
}
