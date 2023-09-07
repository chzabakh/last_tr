import Image from "next/image";
const Score = () => {
  return (
    <>
      <div className="my-2 flex items-center justify-around w-full ">
          <p>#1</p>
          <Image
            className="w-5 sm:w-20 rounded-md"
            src="/place.png"
            width={50}
            height={80}
            alt="asd"
          />
        <p className="text-xs lg:text-lg">username</p>
        <p className="text-xs lg:text-lg">matchs won:</p>
      </div>
    </>
  );
};
export default Score;
