import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./home.json";
import staticSvg from "./home.svg";

const HomeButton = () => {
  const [animationLoaded, setAnimationLoaded] = useState(true);

  return (
    <div>
      {animationLoaded ? (
        <Player
          //   autoplay
          //   loop
          src={animationData}
          style={{ height: "100px", width: "100px" }}
          onEvent={(event) => {
            if (event === "error") setAnimationLoaded(false);
          }}
        />
      ) : (
        <img
          src={staticSvg}
          alt="Static Icon"
          style={{ height: "100px", width: "100px" }}
        />
      )}
    </div>
  );
};

export default HomeButton;
