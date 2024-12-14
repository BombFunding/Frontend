import React, { useState } from 'react';
import styles from './Comment.module.scss';  // Import the SCSS module

const Comment = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className={styles.comment}>
      <h2>Comments</h2>

      {/* Display existing comments */}
      <div className={styles.commentsList}>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div key={index} className={styles.commentItem}>
              <p>{c}</p>
            </div>
          ))
        ) : (
          <p>هنوز کامنتی نیست</p>
        )}
      </div>

      {/* Comment input */}
      <div className={styles.commentInput}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="... کامنت اضافه کن"
          rows="4"
          className={styles.textarea}
        />
        <button onClick={handleCommentSubmit} className={styles.button}>
          بفرست
        </button>
      </div>
    </div>
  );
};

export default Comment;