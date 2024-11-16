import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import * as yup from "yup";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import styles from "./LoginForm.module.scss";
import DrawerButton from "@/components/Custom/DrawerButton";
import { useState } from "react";
import { useLoginFormStore } from "@/stores/FormStore";
import { postData } from "@/Services/ApiClient/index.js";
import useTokenStore from "@/stores/TokenStore";
import { Notification } from "@/components/NotificationCenter";

const schema = yup.object().shape({
  usernameEmail: yup.string().required("این مورد اجباری است"),
  password: yup.string().required("این مورد اجباری است"),
});

function LoginForm() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
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
  function addNotification(title, subtitles, actions, icon) {
    setNotifications((prev) => [
      ...prev,
      { id: Math.random(), title, subtitles, actions, icon },
    ]);
    console.log(notifications);
  }
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };
  const onSubmit = async (e) => {
    setNotifications([]);
    setErrors([]);
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
              const err = {
                message: message,
                path: "usernameEmail",
              };
              const temp = errors;
              temp[0].push(err);
              setErrors((pre) => [temp]);
            }
          }
        });
    } catch (error) {
      setErrors((pre) => [...pre, error.inner]);
    } finally {
      const Fields = {
        usernameEmail: "نام کاربری یا ایمیل",
        password: "رمز عبور",
      };
      Object.keys(Fields).map((path) => {
        // console.log(path);
        const notificationErrors = [];
        errors[0]
          ?.filter((err) => err.path === path)
          .map((err) => notificationErrors.push(err.message));
        // errors[1]
        //   ?.filter((err) => err.path === path)
        //   .map((err) => notificationErrors.push(err.message));
        console.log("HIiiiiiiiiiiiiiii", notificationErrors);
        if (notificationErrors.length > 0) {
          addNotification(Fields[path], notificationErrors, ["اوکی"]);
        }
      });
    }
  };

  return (
    <>
      <form
        className={styles.form_style}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
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
      <div className={styles.notification_box}>
        <div className={styles.notification_box_flex}>
          {notifications?.map((note) => (
            <Notification
              key={note.id}
              {...note}
              onDismiss={() => dismissNotification(note.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default LoginForm;
