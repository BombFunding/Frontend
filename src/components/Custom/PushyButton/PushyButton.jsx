import styles from "./PushyButton.module.scss";
import { Button } from "@/components/ui/button";
const PushyButton = ({ onClick, children }) => {
	return (
		<Button className={styles.login_button} onClick={onClick}>
			<div className={styles.text}>
				{children}
			</div>
		</Button>
	);
};

export default PushyButton;
