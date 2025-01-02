import React, { useState, useEffect } from "react";
import styles from "./Comment.module.scss";
import CustomTextArea from "../Custom/CustomTextArea/CustomTextArea";
import CustomComment from "../CommentSection/CustomComment/CustomComment";
import { getData, postData } from "../../Services/ApiClient/Services";
import { useParams } from "react-router-dom";

const Comment = () => {
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [direction, setDirection] = useState("ltr");
	const { username: targetUsername } = useParams();

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
				const response = await postData(
					`/auth/comment_on_profile/${targetUsername}/`,
					{
						comment,
					}
				);
				setComments((prevComments) => [
					...prevComments,
					response.comment,
				]);
				setComment("");
			} catch (error) {
				console.error("Error submitting the comment:", error);
			}
		}
	};
	useEffect(() => {
		getData(`/auth/all_comments_of_profile/${targetUsername}/`)
			.then((response) => setComments(response.comments))
			.catch((error) => console.error("Error fetching comments:", error));
	}, []);

	return (
		<div className={styles.comment}>
			<div className={`${styles.commentsList} font-vazirmatn`}>
				{comments.length > 0 ? (
					comments.map((c, index) => (
						<CustomComment
							key={index}
							Username={c.username}
							Comment={c.comment}
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

			<div className={styles.commentInput}>
				<CustomTextArea
					placeholder="... کامنت اضافه کن"
					onChange={handleCommentChange}
					name="comment"
					inputClassName={`${styles.textarea} w-full`}
					style={{
						direction: direction,
						textAlign: direction === "rtl" ? "right" : "left",
					}}
					className={`${styles["custom-placeholder-label"]}`}
					value={comment}
				/>
				<button onClick={handleCommentSubmit} className={styles.button}>
					بفرست
				</button>
			</div>
		</div>
	);
};

export default Comment;
