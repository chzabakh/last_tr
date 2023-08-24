const Leaderboard = () => {
  return (
    <>
      <div className="my-20 h-[80%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="border-2 h-[20%] flex-auto border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#45167233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"></div>
        <div className="border-2 flex-auto h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#53139233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"></div>
      </div>
    </>
  );
};
export default Leaderboard;
