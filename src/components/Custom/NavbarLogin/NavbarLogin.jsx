import styles from "./NavbarLogin.module.scss";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NavbarLogin = () => {
	const Navigate = useNavigate();
	return (
		<Button
			className={styles.login_button}
			onClick={() => Navigate("/login")}
		>
			Login
		</Button>
	);
};

export default NavbarLogin;
