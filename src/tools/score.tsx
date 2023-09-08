import Avatar from "@/components/avatar";
import { Scoreuser } from "@/pages/leaderboard";
import Image from "next/image";

interface ScoreProps {
  user: Scoreuser;
  rank: number;
}

const Score: React.FC<ScoreProps> = ({ user, rank }) => {
  return (
    <>
      <div className="my-3 flex items-center justify-around w-full space-x-3">
        <div className="flex flex-row items-center space-x-2">
          {user.provider === "email" ? (
            <Avatar currentUser={user} />
          ) : (
            <Image
              className="rounded-full max-w-[50px] max-h-[50px]"
              src={user.avatarUrl}
              width={100}
              height={100}
              alt="asd"
            />
          )}
          <p className="text-xs lg:text-lg">{user.nickname}</p>
        </div>
        <p className="text-xs lg:text-lg">{user.wins}</p>
        <p>#{rank}</p>
      </div>
    </>
  );
};
export default Score;
