import React, { useState, useEffect } from "react";
import styles from "./Comment.module.scss";
import CustomTextArea from "../Custom/CustomTextArea/CustomTextArea";
import CustomComment from "../CommentSection/CustomComment/CustomComment";
import { getData, postData } from "../../Services/ApiClient/Services";
import { useParams } from "react-router-dom";
import commentIcon from "../../assets/commentIcon.png";
const Comment = () => {
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
							console.log(response);
							setComments(response);
						})
						.catch((error) =>
							console.error("Error fetching comments:", error)
						);
					setComment("");
				});
			} catch (error) {
				console.error("Error submitting the comment:", error);
			}
		}
	};
	useEffect(() => {
		getData(`/comment/list/${projectId}/`)
			.then((response) => {
				console.log(response);
				setComments(response);
			})
			.catch((error) => console.error("Error fetching comments:", error));
	}, []);

	return (
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
							textAlign: direction === "rtl" ? "right" : "left",
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
						style={{
							fontSize: "12px",
							lineHeight: "2",
							position: "relative",
							top: "-3px",
						}}
					>
						هنوز کامنتی نیست
					</p>
				)}
			</div>
		</div>
	);
};

export default Comment;
