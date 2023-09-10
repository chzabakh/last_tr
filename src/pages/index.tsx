import Stars from "@/components/Sections/stars";
import Homepage from "./homepage";

export default function Home() {
  return (
    <>
       <Stars />
    <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen  max-h-screen">
      <Homepage />
    </div>
    </>
  );
}
 