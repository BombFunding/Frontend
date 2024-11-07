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
  const formData = { usernameEmail, password };
  const {formState} = useLoginFormStore((state) => state);
  const [errors, setErrors] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", e);
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log("Form Data:", formData);
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
          update={(e) => formState.updateUsernameEmail(e.target.value)}
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
          update={(e) => formState.updatePassword(e.target.value)}
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
