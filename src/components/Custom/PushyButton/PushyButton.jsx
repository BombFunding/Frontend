import styles from "./PushyButton.module.scss";
import { Button } from "@/components/ui/button";
const PushyButton = ({ onClick, children }) => {
	return (
		<Button className={styles.login_button} onClick={onClick}>
			{children}
		</Button>
	);
};

export default PushyButton;
