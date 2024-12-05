import React from "react";
import styles from "./StartupDashBoard.module.scss";
import { Card } from "@/components/ui/card";
import PositionBox from "../Sections/PositionBox/PositionBox";
import TeamBox from "../Sections/TeamBox/TeamBox";
const StartupDashBoard = () => {
  return (
    <>
      <Card className={styles.card_style}>
        <PositionBox />
        {/* <div className={styles.team_box}>account</div> */}
        <TeamBox />
        <div className={styles.team_row}>
          <div className={styles.position_box}>Team</div>
        </div>
        <div className={styles.position_box}>profiles</div>
        <div className={styles.position_box}>history</div>
      </Card>
    </>
  );
};

export default StartupDashBoard;
