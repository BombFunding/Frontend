import { useState } from "react";
import "./SearchResult.css";
import { useNavigate } from "react-router-dom";
import styles from "./SearchResults.module.scss";

export default function SearchResult({ result }) {
  // console.log(`fullname: ${result.fullName}`);
  // console.log(`username: ${result.username}`);
  // console.log(`avatar: ${result.avatar}`);
  const Navigate = useNavigate();
  const handleNavigation = () => {
    // event.stopPropagation();
    // alert("chi");
    if (result.profile_id) {
      // startup
      Navigate(`/profile/${result.username}`);
    } else if (result.id) {
      // projects
      Navigate(`/projects/${result.id}`);
    } else {
      // investors
      Navigate(`/profile/${result.username}`);
    }
    window.location.reload();
  };
  // console.log(`result is: ${result}`);
  return (
    <div
      className="grid grid-cols-3 items-center p-4 gap-4 search-result cursor-pointer bg-inherit"
      onClick={handleNavigation}
      onMouseDown={(e) => e.preventDefault()}
    >
      {/* Avatar */}
      <div
        className={`avatar w-[15vw] ${
          result.image ? "aspect-video rounded-sm" : "rounded-full"
        } overflow-hidden ${styles.test}`}
      >
        <img
          src={`http://104.168.46.4:8000${
            result.profile_picture ?? result.image
          }`}
          alt={`${result.fullName ?? result.name}`}
          className={`object-cover`}
          // style={"height:10vw"}
        />
      </div>

      {/* User Details */}
      <div className="col-span-2 flex flex-col text-right">
        <div className="full-name font-bold lg:text-lg sm:text-sm md:text-lg">
          {result.name}
          {/* {result.fullName} */}
        </div>
        <div className="username text-gray-500 text-sm">
          {result.username ?? ""}
        </div>
      </div>
    </div>
  );
}
