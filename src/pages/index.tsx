import Homepage from "./homepage";

export default function Home() {
  return (
    <>
      <div className="absolute z-[-1] w-full h-screen max-h-screen max-w-screen overflow-hidden">
      <div id="stars"></div>
      <div id="stars1"></div>
      </div>
    <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen  max-h-screen">
      <Homepage />
    </div>
    </>
  );
}
 