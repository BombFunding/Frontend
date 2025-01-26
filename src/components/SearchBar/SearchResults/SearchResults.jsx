import "./SearchResult.css";
import { useNavigate } from "react-router-dom";
import styles from "./SearchResults.module.scss";
import { baseURL } from "@/Services/ApiClient/Services";
import { Avatar, AvatarImage } from "radix-ui";

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
      window.scrollTo(0, 0);
      Navigate(`/profile/${result.username}`);
    } else if (result.id) {
      // projects
      window.scrollTo(0, 0);
      Navigate(`/projects/${result.id}`);
    } else {
      // investors
      window.scrollTo(0, 0);
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
        className={`avatar ${styles.sizeCustomizer} ${
          result.image ? "aspect-video rounded-sm" : "rounded-full"
        } overflow-hidden lg:w-[5vw] md:w-[7vw]`}
      >
        {!result.id && (
          <Avatar className="w-[50px] h-[50px] border-solid border-2 border-bomborange rounded-full">
            <AvatarImage
              src={`${baseURL}${result.profile_picture ?? result.image}`}
              alt={`${result.fullName ?? result.name}`}
              className="object-cover rounded-full"
            />
          </Avatar>
        )}

        {result.id && (
          <img
            src={`${baseURL}${result.profile_picture ?? result.image}`}
            alt={`${result.fullName ?? result.name}`}
            className={`object-cover rounded-md`}
            // style={"height:10vw"}
          />
        )}
      </div>

      {/* User Details */}
      <div className="col-span-2 flex flex-col text-right">
        <div className="full-name font-bold text-neutral-600 lg:text-lg sm:text-sm md:text-lg">
          {/* {result.name} */}
          {/* {result.fullName} */}
          {result.username ?? result.name}
        </div>
        <div className="username text-gray-500 text-sm">
          {/* {result.username ?? ""} */}
        </div>
      </div>
    </div>
  );
}
