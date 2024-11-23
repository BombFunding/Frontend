import { Button } from "../../ui/button";
import styles from "./CustomButton.module.scss";

const CustomButton = ({ className, children }) => {
	return (
		<Button className={`${styles.custom_button} ${className}`}>
			{children}
		</Button>
	);
};

export default CustomButton;
