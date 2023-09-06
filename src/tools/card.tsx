interface CardProps {
  user: string;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <>
        <div className="text-sm">
          {user} challenged you to a game!
        </div>
        <div className="">
          <button className="text-sm btn ">Accept</button>
          <button className="text-sm btn ">Deny</button>
        </div>
    </>
  );
};

export default Card;
