// import { Button } from "../ui/button";
import styles from "./ProfileDropDown.module.scss";
import profile from "../../assets/defaultpfp.png";
import { useNavigate } from "react-router-dom";

function ProfileDropDown() {
  const Navigate = useNavigate();
  return (
    // <Button>
    <img
      src={profile}
      alt="Avatar"
      className={styles.round}
      onClick={() => Navigate("/login")}
    />
    // </Button>
  );
}

export default ProfileDropDown;
