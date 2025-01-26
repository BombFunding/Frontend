import styles from "./Like.module.scss";
import { useEffect, useState } from "react";
import { deleteData, postData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "../Custom/CustomToast/CustomToast";
import useTokenStore from "@/stores/TokenStore";
import { useNavigate } from "react-router-dom";
function Like({ className, _username, likeCount, projectId, isLiked }) {
	const Naviagte = useNavigate();
	const [likes, setLikes] = useState(likeCount);
	const [userProfileId, setUserProfileId] = useState(null);
	const [checked, setChecked] = useState(isLiked);
	const { accessToken } = useTokenStore();
	// useEffect(() => {
	// 	getData(`/like/check/${projectId}/`).then((data) => {
	// 		setChecked(data.has_liked);
	// 	});
	// }, []);
	useEffect(() => {
		// postData("/profile_statics/check-like/", {
		// 	liker_username: username,
		// 	profile_username: _username,
		// }).then((d) => {
		// 	console.log(d);
		// 	if (d.is_liked) {
		// 		setChecked(true);
		// 	}
		// });
		// getData(`/startup/get_startup_profile/${_username}/`).then((data) => {
		// 	console.log("data: ", data);
		// 	setUserProfileId(data.profile.id);
		// 	getData(`/startup/profile/${data.profile.id}/vote/`).then(
		// 		(data1) => {
		// 			console.log("data1: ", data1);
		// 			setLikes(data1.vote_count);
		// 		}
		// 	);
		// });
	}, []);

	const onChange = () => {
		if (accessToken === "") {
			toast.error(
				<CustomToast
					Header="خطا"
					Message="لطفا ابتدا وارد حساب کاربری خود شوید"
				/>
			);
			setTimeout(() => Naviagte("/login"), 3000);
			return;
		}
		if (!checked) {
			postData(`/like/${projectId}/`).then((data) => {
				console.log("liked", data);
			});
			setLikes((likes) => likes + 1);
		} else {
			deleteData(`/like/${projectId}/`).then((data) => {
				console.log("removed like", data);
			});
			setLikes((likes) => likes - 1);
		}
		setChecked((checked) => !checked);
	};
	return (
		<label className={`${styles.ui_like} ${className} flex`}>
			<div className="text-lg place-self-center ml-1">{likes || 0}</div>
			<input type="checkbox" checked={checked} onChange={onChange} />
			<div className={`${styles.like}`}>
				<svg viewBox="0 0 24 24" fill="">
					<g className={styles.g} id="SVGRepo_bgCarrier"></g>
					<g id="SVGRepo_tracerCarrier"></g>
					<g id="SVGRepo_iconCarrier">
						<path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
					</g>
				</svg>
			</div>
		</label>
	);
}

export default Like;
