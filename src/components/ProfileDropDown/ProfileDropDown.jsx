// import { Button } from "../ui/button";
import styles from "./ProfileDropDown.module.scss";
import profile from "../../assets/defaultpfp.png";
import { useNavigate } from "react-router-dom";

function ProfileDropDown() {
  return (
    <img
      src={profile}
      alt="Avatar"
      className={styles.ProfileNavbar}
    />
  );
}

export default ProfileDropDown;
