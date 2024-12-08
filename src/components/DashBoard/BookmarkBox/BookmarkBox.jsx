import React from "react";
import styles from "./BookmarkBox.module.scss";
import BookmarkItem from "../BookmarkItem/BookmarkItem";

const BookmarkBox = ({ className }) => {
  return (
    <div className={`${className} ${styles.box}`}>
      <div className={styles.bookmark_list}>
          <BookmarkItem />
          <BookmarkItem />
          <BookmarkItem />
          <BookmarkItem />
          <BookmarkItem />
          <BookmarkItem />
          <BookmarkItem />
      </div>
    </div>
  );
};

export default BookmarkBox;
