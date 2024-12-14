import { useState } from "react";

const Voting = () => {
  const [voteCount, setVoteCount] = useState(0); // Initial vote count
  const [selected, setSelected] = useState(null); // Track selected vote (up/down)

  const handleVote = (direction) => {
    if (direction === "up") {
      if (selected === "up") {
        setVoteCount(voteCount - 1);
        setSelected(null);
      } else {
        setVoteCount(voteCount + (selected === "down" ? 2 : 1));
        setSelected("up");
      }
    } else if (direction === "down") {
      if (selected === "down") {
        setVoteCount(voteCount + 1);
        setSelected(null);
      } else {
        setVoteCount(voteCount - (selected === "up" ? 2 : 1));
        setSelected("down");
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Upvote Button */}
      <button
        className={`text-2xl transition duration-200 ${
          selected === "up" ? "text-green-500" : "text-gray-500 hover:text-blue-500"
        }`}
        onClick={() => handleVote("up")}
      >
        <svg
          fill="currentColor"
          height="30"
        //   icon-name="upvote-outline"
          viewBox="0 0 20 20"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
        >
             <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z"></path>
        </svg>
      </button>
      {/* Vote Count */}
      <span className="text-lg font-bold">{voteCount}</span>
      {/* Downvote Button */}
      <button
        className={`text-2xl transition duration-200 ${
          selected === "down" ? "text-red-500" : "text-gray-500 hover:text-blue-500"
        }`}
        onClick={() => handleVote("down")} 
      >
 <svg
          fill="currentColor"
          height="30"
        //   icon-name="downvote-outline"
          viewBox="0 0 20 20"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Zm0 17.193 7.315-7.264a.251.251 0 0 0-.177-.429H12.5V5.184A2.631 2.631 0 0 0 10.136 2.5a2.441 2.441 0 0 0-1.856.682A2.478 2.478 0 0 0 7.5 5v5.5H2.861a.251.251 0 0 0-.176.429L10 18.193Z"></path>
        </svg>      </button>
    </div>
  );
};

export default Voting;