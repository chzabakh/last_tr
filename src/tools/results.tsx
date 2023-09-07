import Image from 'next/image';
const Results = () => {
  return (
    <>
      <div className='my-2 flex items-center justify-around space-x-1 w-full '>
        <Image className="w-5 sm:w-20 rounded-md" src="/place.png" width={50} height={80} alt="asd" />
        <p className="text-xs lg:text-lg">username</p>
        <p className="text-xs lg:text-lg">2</p>
        <p className="text-xs lg:text-lg">-</p>
        <p className="text-xs lg:text-lg">5</p>
        <p className="text-xs lg:text-lg">username</p>
        <Image className="w-5 sm:w-20 rounded-md" src="/place.png" width={50} height={80} alt="asd" />
      </div>
    </>
  );
};
export default Results;
