import styles from "./Login.module.scss";
import loginimage from "../../assets/loginpage.png";
import LoginForm from "@/components/Forms/LoginForm/LoginForm";
import HomeButton from "@/components/HomeButton/HomeButton";

function Login() {
  return (
    <>
      <div className="flex justify-center w-screen">
        <div className={styles.login_container}>
          <img className={styles.bg_img} src={loginimage} alt="login" />
          <LoginForm />
        </div>
        <HomeButton className="top-12 right-10 lg:right-24" />
      </div>
    </>
  );
}

export default Login;
