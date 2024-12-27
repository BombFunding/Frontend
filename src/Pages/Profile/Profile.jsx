import Error from "../Error/Error";
import useTokenStore from "@/stores/TokenStore";
import StartupProfile from "@/components/Profile/StartupProfile/StartupProfile";
import InvestorProfile from "@/components/Profile/InvestorProfile/InvestorProfile";

const Profile = () => {
	const { userType } = useTokenStore();
	console.log(userType);
	switch (userType) {
		case "startup":
			return <StartupProfile />;
		case "investor":
			return <InvestorProfile />;
		default:
			return <Error />;
	}
};

export default Profile;
