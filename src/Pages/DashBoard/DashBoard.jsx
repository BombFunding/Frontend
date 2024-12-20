import BaseUserDashBoard from "@/components/DashBoard/BaseUserDashBoard/BaseUserDashBoard";
import InvestorDashBoard from "@/components/DashBoard/InvestorDashBoard/InvestorDashBoard";
import StartupDashBoard from "@/components/DashBoard/StartupDashBoard/StartupDashBoard";
import useTokenStore from "@/stores/TokenStore";
import React from "react";
import Error from "../Error/Error";
// import styles from "./DashBoard";

const DashBoard = () => {
	const userType = useTokenStore((state) => state.userType);
	console.log(userType);
	switch (userType) {
		case "startup":
			return <StartupDashBoard />;
		case "investor":
			return <InvestorDashBoard />;
		case "basic":
			return <BaseUserDashBoard />;
		default:
			return <Error />;
	}
};

export default DashBoard;
