import Error404 from "../Error/Error404/Error404";
import StartupProfile from "@/components/Profile/StartupProfile/StartupProfile";
import InvestorProfile from "@/components/Profile/InvestorProfile/InvestorProfile";
import { useParams } from "react-router-dom";
import { getData } from "@/Services/ApiClient/Services";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading/Loading";

const Profile = () => {
	const { username } = useParams();
	const [type, setType] = useState(null);
	useEffect(() => {
		getData(`/auth/baseuser_search_by_name/${username}/`).then((data) => {
			console.log(data.baseuser_profile.user_type);
			setType(data.baseuser_profile.user_type);
		});
	}, []);

	// switch ("mamad") {
	switch (type) {
		case "startup":
			// case "mamad":
			return <StartupProfile />;
		case "basic":
			return <InvestorProfile />;
		default:
			return <Loading className={"py-50"} />;
	}
};

export default Profile;
