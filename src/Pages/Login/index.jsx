import styles from "./Login.module.scss";

import loginimage from "../../assets/loginpage.png";
import LoginForm from "@/components/Forms/LoginForm";

function Login() {
  return (
    <div className={styles.login_container}>
      <img className={styles.bg_img} src={loginimage} alt="login" />
      <LoginForm />
    </div>
  );
}

export default Login;
