interface CardProps {
  user: string;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <>
      <div className="card-body">
        <h2 className="card-title text-center mt-3">
          {user} challenged you to a game!
        </h2>
        <div className="absolute bottom-0 w-full flex ml-2">
          <button className="btn btn-primary mx-3">Accept</button>
          <button className="btn btn-ghost mx-3">Deny</button>
        </div>
      </div>
    </>
  );
};

export default Card;
