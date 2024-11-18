import { Button } from "@/components/ui/button";
import styles from "./NavbarLogin.module.scss";
import { useNavigate } from "react-router-dom";

function NavbarLogin() {
  const Navigate = useNavigate();
  return <Button className={styles.button1} onClick={() => Navigate("/login")}>Login</Button>;
}

export default NavbarLogin;
