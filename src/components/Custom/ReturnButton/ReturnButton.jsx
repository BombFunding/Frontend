import { useNavigate } from "react-router-dom";
import styles from "./ReturnButton.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ReturnButton = () => {
	const Navigate = useNavigate();
	return (
		<button
			className={styles.button}
			onClick={() => {
				window.scrollTo(0, 0);
				Navigate(-1);
			}}
		>
			<ArrowBackIosNewIcon className={styles.svgIcon} />
		</button>
	);
};

export default ReturnButton;
