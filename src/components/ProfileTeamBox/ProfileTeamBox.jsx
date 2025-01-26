import { useEffect, useState } from "react";
import ProfileTeamItem from "../ProfileTeamItem/ProfileTeamItem"; // Assuming this is the child component
import { getData } from "@/Services/ApiClient/Services";
import defaultPic from "../../assets/defaultpfp.png";
import { Loading } from "../Loading/Loading";

function ProfileTeamBox({ username }) {
	// const { username } = useProfileStore();
	const [children, setChildren] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTeamData = async () => {
			try {
				setLoading(true);
				const response = await getData(
					`/startup/profile/team/list/${username}`
					// `/startup/profile/team/list/alireza_start1/`
				);
				setChildren(response); // Adjust based on the API response structure
				setLoading(false);
				console.log(`response: ${response}`);
			} catch (err) {
				console.error("Error fetching team data:", err);
				setError("Failed to fetch team data.");
				setLoading(false);
			}
		};

		fetchTeamData();
	}, [username]); // Re-run the fetch if `username` changes

	if (loading) {
		return (
			// <div className="w-[90vw] py-5 px-5 bg-neutral-100 mt-24 text-yellow-500">
			// 	Loading team data...
			// </div>
			<Loading />
		);
	}

	// if (error) {
	// 	return (
	// 		<div className="w-[90vw] py-5 px-5 bg-neutral-100 mt-24 text-red-500">
	// 			{error}
	// 		</div>
	// 	);
	// }

	return (
		<div className="hide-scrollbar place-items-center rounded-lg flex flex-row overflow-hidden overflow-x-scroll py-5 px-5 mt-24 text-yellow-500 gap-7">
			{children.length > 0 ? (
				children.map((child, i) => (
					<ProfileTeamItem
						name={child.name}
						role={child.role}
						details={child.description}
						profile={child.profile_pic ?? defaultPic}
						username={child.username}
						key={i}
					/>
				))
			) : (
				<></>
			)}
		</div>
	);
}

export default ProfileTeamBox;
