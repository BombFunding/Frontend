import React from "react";
import styles from "./EditButton.module.scss";
import { Label } from "@/components/ui/label";
const EditButton = ({
	props,
	className,
	icon1,
	icon2,
	name1,
	name2,
	onClick1,
	onClick2,
	edit,
	setEdit,
}) => {
	return (
		<>
			{!edit ? (
				<div
					className={`${className} ${styles.box}`}
					onClick={() => onClick1 ?? setEdit((edit) => !edit)}
				>
					<Label className={styles.label}>{name1}</Label>
					{/* <SaveAsIcon sx={{ fontSize: 16, color: "orange" }} /> */}
					{icon1 &&
						React.cloneElement(icon1, { className: styles.icon })}
				</div>
			) : (
				<div
					className={`${className} ${styles.box}`}
					onClick={() => onClick2 ?? setEdit((edit) => !edit)}
				>
					<Label className={styles.label}>{name2}</Label>
					{/* <SaveAsIcon sx={{ fontSize: 16, color: "orange" }} /> */}
					{icon2 &&
						React.cloneElement(icon2, { className: styles.icon })}
				</div>
			)}
		</>
	);
};

export default EditButton;
