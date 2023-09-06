interface CardProps {
  user: string;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <>
      <div className="text-sm">{user} challenged you!</div>
        <button className="btn">Accept</button>
        <button className="btn">Deny</button>
    </>
  );
};

export default Card;
