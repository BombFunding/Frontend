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
  password: yup
    .string()
    .required("این مورد اجباری است")
    .min(8, "رمز عبور باید حداقل 8 حرف باشد")
    .max(50, "رمز عبور طولانی است")
    .matches(/[A-Z]/, "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد")
    .matches(/[a-z]/, "رمز عبور باید حداقل شامل یک حرف کوچک انگلیسی باشد")
    .matches(/\d/, "رمز عبور باید حداقل شامل یک عدد باشد")
    .matches(/[@$!%*?&#]/, "رمز عبور باید حداقل شامل یک علامت باشد"),
});

function LoginForm() {
  const navigate = useNavigate();
  function handleKeyDown(e) {
    if (e.key === "Enter") {
		onSubmit();
    }
  }

  const { usernameEmail, password } = useLoginFormStore((state) => state);
  const TokenManager = useTokenStore((state) => state);
  const formData = { usernameEmail, password };
  const {formState} = useLoginFormStore((state) => state);
  const [errors, setErrors] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", e);
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log("Form Data:", formData);

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let bodyData;
      if (emailRegex.test(usernameEmail)) {
        bodyData = {
          email: usernameEmail,
          password: password,
        };
      } else {
        bodyData = {
          username: usernameEmail,
          password: password,
        };
      }

      postData("/auth/login/", bodyData)
        .then((response) => {
          console.log("Data posted successfully:", response);
          TokenManager.updateAccessToken(response.access_token);
          TokenManager.updateRefreshToken(response.refresh_token);
        })
        .catch((error) => {
          console.log("Data posting FAILED:", error);
        });
    } catch (error) {
      console.log("Form Validation Errors:", error.inner);
      setErrors(error.inner);
    }
  };

  return (
    <>
      <form className={styles.form_style} onSubmit={onSubmit}>
        <img className={styles.logo} src={logo} alt="logo" />
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
        />
        <div onClick={() => navigate("/signup")} className={styles.no_account}>
          حساب کاربری ندارید؟
        </div>
        <DrawerButton onClick={onSubmit}>ورود</DrawerButton>
      </form>
    </>
  );
}

export default LoginForm;
