const Leaderboard = () => {
  return (
    <>
      <div className="my-20 h-[70%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="px-5 items-center border-2 h-[20%] flex justify-between flex-auto border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="bg-black/20 w-[10%] text-center border rounded-xl ">loses: 20</div>
          <div className="bg-black/20 w-[50%] text-center border rounded-xl  max-w-md">level:</div>
          <div className="bg-black/20 w-[10%] text-center border rounded-xl max-w-sm ">wins: 20</div>
        </div>
        <div className="border-2 flex-auto h-[80%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"></div>
      </div>
    </>
  );
};
export default Leaderboard;
