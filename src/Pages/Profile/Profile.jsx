import Error404 from "../Error/404/Error404";
import useTokenStore from "@/stores/TokenStore";
import StartupProfile from "@/components/Profile/StartupProfile/StartupProfile";
import InvestorProfile from "@/components/Profile/InvestorProfile/InvestorProfile";
import { useParams } from "react-router-dom";
import { getData } from "@/Services/ApiClient/Services";

const Profile = () => {
	const { username } = useParams();
	getData(`/auth/baseuser_search_by_name/${username}/`).then((data) => {
		console.log(data);
	});
	console.log("mamad");
	switch ("mamad") {
		// case "startup":
		case "mamad":
			return <StartupProfile />;
		case "basic":
			return <InvestorProfile />;
		default:
			return <Error404 />;
	}
};

export default Profile;
