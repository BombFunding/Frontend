import BaseUserDashBoard from "@/components/DashBoard/BaseUserDashBoard/BaseUserDashBoard";
import InvestorDashBoard from "@/components/DashBoard/InvestorDashBoard/InvestorDashBoard";
import StartupDashBoard from "@/components/DashBoard/StartupDashBoard/StartupDashBoard";
import useTokenStore from "@/stores/TokenStore";
import React from "react";
import Error from "../Error/Error";
// import styles from "./DashBoard";

const DashBoard = () => {
  const userType = useTokenStore((state) => state.userType);

  switch (userType) {
    case "startup":
      return <StartupDashBoard />;
      break;
    case "investor":
      return <InvestorDashBoard />;
      break;
    case "basic":
      return <BaseUserDashBoard />;
      break;
    default:
      return <Error />;
      break;
  }
};

export default DashBoard;
