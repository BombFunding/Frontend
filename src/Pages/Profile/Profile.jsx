import Error404 from "../Error/404/Error404";
import useTokenStore from "@/stores/TokenStore";
import StartupProfile from "@/components/Profile/StartupProfile/StartupProfile";
import InvestorProfile from "@/components/Profile/InvestorProfile/InvestorProfile";

const Profile = () => {
	const { userType } = useTokenStore();
	console.log(userType);
	switch (userType) {
		case "startup":
			return <StartupProfile />;
		case "basic":
			return <InvestorProfile />;
		default:
			return <Error404 />;
	}
};

export default Profile;
