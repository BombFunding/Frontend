import CustomComment from "./CustomComment/CustomComment";
import commentIcon from "../../assets/commentIcon.png";
import styles from "./CommentSection.module.scss";
import { useEffect, useState } from "react";
import { getData, postData } from "@/Services/ApiClient/Services";
import { useParams } from "react-router-dom";
import CustomTextArea from "../Custom/CustomTextArea/CustomTextArea";
function CommentSection() {
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [direction, setDirection] = useState("ltr");
	const { projectId } = useParams();

	const detectDirection = (text) => {
		const persianRegex = /[\u0600-\u06FF]/;
		return persianRegex.test(text);
	};

	const handleCommentChange = (value) => {
		setComment(value);
		const newDirection = detectDirection(value);
		setDirection(newDirection ? "rtl" : "ltr");
	};

	const handleCommentSubmit = async () => {
		if (comment.trim()) {
			try {
				postData(`/comment/${projectId}/`, {
					text: comment,
				}).then(() => {
					getData(`/comment/list/${projectId}/`)
						.then((response) => {
							setComments(response);
							setComment("");
						})
						.catch((error) =>
							console.log("Error fetching comments:", error)
						);
				});
			} catch (error) {
				console.log("Error submitting the comment:", error);
			}
		}
	};
	useEffect(() => {
		getData(`/comment/list/${projectId}/`)
			.then((response) => {
				console.log(response);
				setComments(response);
			})
			.catch((error) => console.log("Error fetching comments:", error));
	}, []);
	return (
		<section className={styles.container}>
			{/* <Comment /> */}
			<div className={`${styles.comment}`}>
				<h1 className={styles.comment_label}>
					<img src={commentIcon} className={styles.comment_icon} />
					<div className={styles.comment_text}>کامنت‌ها</div>
				</h1>
				<div className={`${styles.commentsList} font-vazirmatn`}>
					<div className={styles.commentInput}>
						<CustomTextArea
							placeholder="... کامنت اضافه کن"
							onChange={handleCommentChange}
							name="comment"
							inputClassName={`w-full`}
							style={{
								direction: direction,
								textAlign:
									direction === "rtl" ? "right" : "left",
							}}
							className={``}
							value={comment}
						/>
						<button
							onClick={handleCommentSubmit}
							className={styles.button}
						>
							بفرست
						</button>
					</div>
					{comments.length > 0 ? (
						comments.map((c, index) => (
							<CustomComment
								key={index}
								pfp={c?.profile_picture}
								Username={c?.username}
								Comment={c?.text}
								time={c?.created_at}
							/>
						))
					) : (
						<p
							className="place-self-center pt-[3vw]"
						>
							هنوز کامنتی نیست
						</p>
					)}
				</div>
			</div>
		</section>
	);
}

export default CommentSection;
