import React, { useState, useEffect } from "react";
import styles from "./Comment.module.scss";
import CustomTextArea from "../Custom/CustomTextArea/CustomTextArea";
import CustomComment from "../CommentSection/CustomComment/CustomComment";
import { getData, postData } from "../../Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { useParams } from "react-router-dom";

const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [direction, setDirection] = useState("ltr");
  const { username:targetUsername } = useParams();

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
        const response = await postData(`/auth/comment_on_profile/${targetUsername}/`, {
          comment,
        });
        // setComments([...comments, response]);
        setComments(prevComments => [...prevComments, response.comment]);
        setComment("");  // Clear the input field
      } catch (error) {
        console.error("Error submitting the comment:", error);
      }
    }
  };

  // Fetch existing comments from backend
  const fetchComments = async () => {
  
    try {
      const response = await getData(`/auth/all_comments_of_profile/${targetUsername}/`); // Use the GET function from services.js
      if (response) {
        setComments(response.comments);  // Update the state with fetched comments
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Fetch comments when the component mounts (only once)
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className={styles.comment}>
      {/* Display existing comments */}
      <div className={`${styles.commentsList} font-vazirmatn`}>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <CustomComment
              key={index}
              Username={c.username}
              Comment={c.comment}
              // pfp={c.pfp}
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

      {/* Comment Input */}
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