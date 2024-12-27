import CustomComment from "./CustomComment/CustomComment";
import commentIcon from "../../assets/commentIcon.png";
import Comment from "../Comment/Comment";
import styles from "./CommentSection.module.scss";
function CommentSection() {
	return (
		<section className={styles.container}>
			<h1 className={styles.comment_label}>
				<img src={commentIcon} className={styles.comment_icon} />
				<div className={styles.comment_text}>کامنت‌ها</div>
			</h1>
			<Comment />
		</section>
	);
}

export default CommentSection;
