import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import * as yup from "yup";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import styles from "./LoginForm.module.scss";
import DrawerButton from "@/components/DrawerButton";
import { useState } from "react";
import { useLoginFormStore } from "@/stores/FormStore";
import { postData } from "@/Servises/ApiClient/index.js";
import useTokenStore from "@/stores/TokenStore";

const schema = yup.object().shape({
  usernameEmail: yup.string().required("این مورد اجباری است"),
  password: yup.string().required("این مورد اجباری است"),
});

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  const { usernameEmail, password, updateUsernameEmail, updatePassword } =
    useLoginFormStore((state) => state);
  const TokenManager = useTokenStore((state) => state);
  const formData = { usernameEmail, password };
  const formState = useLoginFormStore((state) => state);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", e);
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log("Form Data:", formData);

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let bodyData;
      let inputState;
      if (emailRegex.test(usernameEmail)) {
        bodyData = {
          email: usernameEmail,
          password: password,
        };
        inputState = 0;
      } else {
        bodyData = {
          username: usernameEmail,
          password: password,
        };
        inputState = 1;
      }

      await postData("/auth/login/", bodyData)
        .then((response) => {
          console.log("Data posted successfully:", response);
          TokenManager.updateAccessToken(response.access_token);
          TokenManager.updateRefreshToken(response.refresh_token);
        })
        .catch((error) => {
          console.log("Data posting FAILED:", error);
          if (error?.response?.data) {
            const data = error?.response?.data;
            if (data?.non_field_errors) {
              const message = inputState
                ? "نام کاربری یا رمز ورود اشتباه است"
                : "ایمیل یا رمز ورود اشتباه است";
              const err = { message: message, path: "usernameEmail" };
              setErrors((pre) => [...pre, err]);
            }
          }
        });
    } catch (error) {
      setErrors((pre) => [...pre, error.inner]);
    } finally {
      console.log("Errors:", errors);
    }
  };

  return (
    <>
      <form className={styles.form_style} onSubmit={onSubmit}>
        {/* <img className={styles.logo} src={logo} alt="logo" /> */}
        <div className={styles.welcome}>خوش آمدید</div>
        <div className={styles.text}>برای ورود اطلاعات خود را وارد کنید</div>
        <Label className={styles.Label}>ایمیل یا نام کاربری</Label>
        <CustomInput
          placeholder="Email or Username"
          autofocus={true}
          onKey={(e) => handleKeyDown(e)}
          name="usernameEmail"
          errors={errors}
          value={formData.usernameEmail}
          onChange={formState.updateUsernameEmail}
        />
        <Label className={styles.Label}>رمز عبور</Label>
        <PasswordInput
          handleKeyDown={handleKeyDown}
          errors={errors}
          placeholder="Password"
          name="password"
          onChange={formState.updatePassword}
          value={formData.password}
          hasEye={true}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <div
          onClick={() => {
            updateUsernameEmail("");
            updatePassword("");
            navigate("/signup");
          }}
          className={styles.no_account}
        >
          حساب کاربری ندارید؟
        </div>
        <DrawerButton onClick={onSubmit}>ورود</DrawerButton>
      </form>
    </>
  );
}

export default LoginForm;
