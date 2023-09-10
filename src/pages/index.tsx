import Homepage from "./homepage";

export default function Home() {
  return (
    <>
       <div className="absolute left-0 z-[-1] w-[50%] h-screen max-h-screen max-w-screen overflow-hidden">
      <div id="stars"></div>
      </div>
      <div className="absolute right-0 z-[-1] w-[50%] h-screen max-h-screen max-w-screen overflow-hidden">
      <div id="stars"></div>
      </div>
    <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen  max-h-screen">
      <Homepage />
    </div>
    </>
  );
}
 