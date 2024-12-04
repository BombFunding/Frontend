import React from "react";
import styles from "./StartupDashBoard.module.scss";
import { Card } from "@/components/ui/card";
import PositionBox from "../PositionBox/PositionBox";
import Accounting from "@/components/Accounting/Accounting";
import StartupProfiles from "@/components/StartupProfiles/StartupProfiles";
const StartupDashBoard = () => {
	return (
		<>
			<Card className={styles.card_style}>
				<PositionBox />
				<Accounting />
				<div className={styles.position_box}>Team</div>
				{/* <div className={styles.team_row}></div> */}
				{/* <div className={styles.position_box}>profiles</div> */}
				<StartupProfiles />
				<div className={styles.position_box}>history</div>
			</Card>
		</>
	);
};

export default StartupDashBoard;
