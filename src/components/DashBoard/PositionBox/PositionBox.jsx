import React from "react";
import styles from "./PositionBox.module.scss";
import PositionItem from "../PositionItem/PositionItem";

const PositionBox = () => {
  return (
    <div className={styles.position_box}>
      <div className={styles.position_text}>add</div>
      <div className={styles.position_list}>
        <PositionItem />
        <PositionItem />
        <PositionItem />
        <PositionItem />
      </div>
    </div>
  ) 
};

export default PositionBox;
