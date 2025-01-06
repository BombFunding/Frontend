import InvestorDashBoard from "@/components/DashBoard/InvestorDashBoard/InvestorDashBoard";
import StartupDashBoard from "@/components/DashBoard/StartupDashBoard/StartupDashBoard";
import useTokenStore from "@/stores/TokenStore";
import { useEffect } from "react";
import Error404 from "../Error/404/Error404";
// import Voting from "@/components/Voting/Voting";
// import styles from "./DashBoard";

const DashBoard = () => {
	const { userType, accessToken } = useTokenStore();
	useEffect(() => {
		console.log("accessToken: ", accessToken);
	}, []);
	switch (userType) {
		case "startup":
			return <StartupDashBoard />;
		case "basic":
			return <InvestorDashBoard />;
		default:
			return <Error404 />;
	}
};

export default DashBoard;
