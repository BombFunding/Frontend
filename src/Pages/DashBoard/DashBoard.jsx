import BaseUserDashBoard from "@/components/DashBoard/BaseUserDashBoard/BaseUserDashBoard";
import InvestorDashBoard from "@/components/DashBoard/InvestorDashBoard/InvestorDashBoard";
import StartupDashBoard from "@/components/DashBoard/StartupDashBoard/StartupDashBoard";
import useTokenStore from "@/stores/TokenStore";
import React, { useEffect } from "react";
import Error from "../Error/Error";
import { isTokenExpired } from "@/Services/ApiClient/Services";
// import styles from "./DashBoard";

const DashBoard = () => {
	const { userType, accessToken } = useTokenStore();
	useEffect(() => {
		console.log("accessToken: ", accessToken);
		isTokenExpired();
	}, []);
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
