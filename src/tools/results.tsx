import Avatar from '@/components/avatar';
import { Match } from '@/pages/history';
import Image from 'next/image';

interface ResultsProps {
  match: Match;
}

const Results: React.FC<ResultsProps> = ({ match }) => {
  return (
    <>
      <div className='my-2 flex items-center justify-around space-x-1 w-full '>
        {match.player1.provider === "email" ? 
        <Avatar currentUser={match.player1}/>
        :
        <Image className="rounded-full max-w-[50px] max-h-[50px]" src={match.player1.avatarUrl} width={100} height={100} alt="asd" />
      }
        <p className="text-xs lg:text-lg">{match.player1.nickname}</p>
        <p className="text-xs lg:text-lg">{match.player1Score}</p>
        <p className="text-xs lg:text-lg">-</p>
        <p className="text-xs lg:text-lg">{match.player2Score}</p>
        <p className="text-xs lg:text-lg">{match.player2.nickname}</p>
        {match.player2.provider === "email" ? 
        <Avatar currentUser={match.player2}/>
        :
        <Image className="rounded-full max-w-[50px] max-h-[50px]" src={match.player2.avatarUrl} width={100} height={100} alt="asd" />
      }
      </div>
    </>
  );
};
export default Results;
