import React, { useState } from 'react';
import styles from './Comment.module.scss'; 
import CustomTextArea from '../Custom/CustomTextArea/CustomTextArea';
import CustomComment from '../CommentSection/CustomComment/CustomComment';

const Comment = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [direction, setDirection] = useState("ltr");

  const detectDirection = (text) => {
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(text)
  };

  const handleCommentChange = (value) => {
    setComment(value);
    const newDirection = detectDirection(value);
    if (value) {
      if (newDirection) {
        setDirection('rtl')
      } else {
        setDirection('ltr')
      }
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        Username: "Anonymous User", // Default username
        Comment: comment,
        pfp: "https://via.placeholder.com/150", // Default placeholder profile picture
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <div className={styles.comment}>
      <div className={'${styles.commentsList} font-vazirmatn'}>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            // <div key={index} className={styles.commentItem}>
            //   <p>{c}</p>
            // </div>
             <CustomComment
              key={index}
              Username={c.Username}
              Comment={c.Comment}
              pfp={c.pfp}
            />
          ))
        ) : (
          <p style= {{ fontSize: "12px", lineHeight: "2", position: "relative", top: "-3px"}}>هنوز کامنتی نیست</p>
        )}
      </div>
      <div className={styles.commentInput}>
      <CustomTextArea
          placeholder="...کامنت اضافه کن"
          onChange={handleCommentChange}
          name="comment"
          inputClassName={`${styles.textarea} w-full`}
          style={{ direction: direction, textAlign: direction === "rtl" ? "right" : "left" }}
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