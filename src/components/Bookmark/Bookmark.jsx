import { useEffect, useState } from "react";
import styles from "./Bookmark.module.scss";
import { deleteData, getData, postData } from "@/Services/ApiClient/Services";
import useTokenStore from "@/stores/TokenStore";
import { toast } from "react-toastify";
import CustomToast from "../Custom/CustomToast/CustomToast";
import { useNavigate } from "react-router-dom";
function Bookmark({ className, username, projectId, isBookmarked }) {
	const [checked, setChecked] = useState(isBookmarked);
	const Navigate = useNavigate();
	const { accessToken } = useTokenStore();
	// useEffect(() => {
	// 	getData(`/bookmark/${projectId}/status/`).then((data) => {
	// 		setChecked(data.has_bookmarked);
	// 	});
	// }, []);

	const onChange = () => {
		if (accessToken) {
			if (checked) {
				deleteData(`/bookmark/${projectId}/delete/`);
			} else {
				postData(`/bookmark/${projectId}/`);
			}
			setChecked((checked) => !checked);
		} else {
			toast.error(<CustomToast Header="لطفا وارد حساب کاربری خود شود" />);
			setTimeout(() => {
				window.scrollTo(0, 0);
				Navigate("/login");
			}, 3000);
		}
	};
	return (
		<label className={`${styles.ui_bookmark} ${className}`}>
			<input type="checkbox" checked={checked} onChange={onChange} />
			<div className={styles.bookmark}>
				<svg viewBox="0 0 32 32">
					<g>
						<path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
					</g>
				</svg>
			</div>
		</label>
	);
}

export default Bookmark;
