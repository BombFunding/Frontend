import profile_default from "@/assets/defaultpfp.png";
import styles from "./CustomComment.module.scss";
import { useNavigate } from "react-router-dom";
function CustomComment({ pfp, Username, Comment, time }) {
	const Navigate = useNavigate();
	function timeSinceCommented(commentTime) {
		const now = new Date(); // Current time
		const commentDate = new Date(commentTime); // Convert the comment time to a Date object

		const timeDifference = Math.floor((now - commentDate) / 1000); // Difference in seconds

		if (timeDifference < 60) {
			// Less than 1 minute
			// return `${timeDifference} ثانیه پیش`;
			return `همین الان`;
		} else if (timeDifference < 3600) {
			// Less than 1 hour
			const minutes = Math.floor(timeDifference / 60);
			return `${minutes} دقیقه پیش`;
		} else if (timeDifference < 86400) {
			// Less than 1 day
			const hours = Math.floor(timeDifference / 3600);
			return `${hours} ساعت پیش`;
		} else {
			// More than 1 day
			const days = Math.floor(timeDifference / 86400);
			return `${days} روز پیش`;
		}
	}
	return (
		<div className={styles.box}>
			<div className={styles.comment_section}>
				<div className="flex flex-row justify-between w-full">
					<div className="place-self-start rtl">
						{timeSinceCommented(time)}
					</div>
					<h2 className={styles.username}>{Username}</h2>
				</div>
				<p className={styles.comment}>{Comment}</p>
			</div>
			<img
				src={pfp ?? profile_default}
				className={styles.profile}
				onClick={() => {
					window.scrollTo(0, 0);
					Navigate(`/profile/${Username}`);
				}}
			/>
		</div>
	);
}

export default CustomComment;
