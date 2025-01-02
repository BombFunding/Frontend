import { useState } from "react";
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
      <div
        className={`avatar ${
          result.image ? "aspect-video rounded-sm" : "rounded-full"
        } overflow-hidden`}
      >
        <img
          src={`http://104.168.46.4:8000${
            result.profile_picture ?? result.image
          }`}
          alt={`${result.fullName ?? result.name}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="col-span-2 flex flex-col text-right">
        <div className="full-name font-bold lg:text-lg sm:text-sm md:text-lg">
          {result.image ? result.name : "محمد خاکپور"}
          {/* {result.fullName} */}
        </div>
        <div className="username text-gray-500 text-sm">
          {result.username ?? ""}
        </div>
      </div>
    </div>
  );
}
