import profile_default from "@/assets/defaultpfp.png";
import styles from "./CustomComment.module.scss";
import { useNavigate } from "react-router-dom";
function CustomComment({ pfp, Username, Comment }) {
	const Navigate = useNavigate();
	return (
		<div className={styles.box}>
			<div className={styles.comment_section}>
				<h2 className={styles.username}>{Username}</h2>
				<p className={styles.comment}>{Comment}</p>
			</div>
			<img src={pfp ?? profile_default} className={styles.profile} onClick={()=>Navigate(`/profile/${Username}`)} />
		</div>
	);
}

export default CustomComment;
