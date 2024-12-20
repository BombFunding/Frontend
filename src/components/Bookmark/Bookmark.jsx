import { useEffect, useState } from "react";
import styles from "./Bookmark.module.scss";
import { deleteData, getData, postData } from "@/Services/ApiClient/Services";
function Bookmark({ className, username }) {
	const [checked, setChecked] = useState(false);
	const [bookmarkId, setBookmarkId] = useState(null);
	useEffect(() => {
		getData("/bookmark/").then((data) => {
			data.map((bookmark) => {
				if (bookmark.target_username === username) {
					setChecked(true);
					setBookmarkId(bookmark.id);
				}
			});
		});
	}, []);

	const onChange = () => {
		if (checked) {
			deleteData(`/bookmark/${bookmarkId}/`).then((data) => {
				console.log(data);
			});
		} else {
			postData("/bookmark/", { target: username }).then((data) => {
				console.log(data);
			});
		}
		setChecked((checked) => !checked);
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
