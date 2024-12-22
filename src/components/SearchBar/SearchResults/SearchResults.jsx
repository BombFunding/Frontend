import "./SearchResult.css";

export default function SearchResult({ result }) {
  // console.log(`fullname: ${result.fullName}`);
  // console.log(`username: ${result.username}`);
  // console.log(`avatar: ${result.avatar}`);
  console.log(`result is: ${result}`);
  return (
    <div
      className="grid grid-cols-3 items-center p-4 gap-4 search-result cursor-pointer bg-inherit"
      onClick={() =>
        alert(`You selected ${result.fullName} (${result.username})!`)
      }
    >
      {/* Avatar */}
      <div className="avatar w-16 h-16 rounded-full overflow-hidden">
        <img
          src={result.avatar}
          alt={`${result.fullName}'s avatar`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="col-span-2 flex flex-col text-right">
        <div className="full-name font-bold text-lg">{result.fullName}</div>
        <div className="username text-gray-500 text-sm">{result.username}</div>
      </div>
    </div>
  );
}
