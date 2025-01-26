import styles from "./Signup.module.scss";

import loginimage from "../../assets/loginpage.png";
import SignupForm from "@/components/Forms/SignupForm/SignupForm";
import HomeButton from "@/components/HomeButton/HomeButton";

function Signup() {
  return (
    <>
      <div className="flex justify-center w-screen">
        <HomeButton className="top-12 left-4 sm:left-6 xl:left-32 md:left-12" />
        <div className={styles.signup_container}>
          <SignupForm />
          <img className={styles.bg_img} src={loginimage} alt="login" />
        </div>
      </div>
    </>
  );
}

export default Signup;
