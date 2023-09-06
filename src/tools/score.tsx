import Image from 'next/image';
const Score = () => {
  return (
    <>
      <div className='my-2 flex items-center justify-around w-full '>
        <p>#1</p>
        <Image className="rounded-md w-auto" src="/place.png" width={50} height={80} alt="asd" />
        <p>username</p>
        <p>matchs won</p>
        <p>matchs lost</p>
      </div>
    </>
  );
};
export default Score;
