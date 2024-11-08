import logo from "@/assets/logo.png";

import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import DrawerButton from "@/components/DrawerButton";
import styles from "./SignupForm.module.scss";
import { useState } from "react";
import { useSignupFormStore } from "@/stores/FormStore";
import { postData } from "@/Servises/ApiClient/index.js";
import { RadioInput, RadioInputOption } from "@/components/Custom/RadioInput";
import { Notification } from "@/components/NotificationCenter";

const inlineErrors = ["حروف بزرگ", "حروف کوچک", "اعداد", "علامت"];

const schema = yup.object().shape({
  username: yup.string().required("اجباری").min(3, "حداقل 3 کاراکتر"),
  password: yup
    .string()
    .required("اجباری")
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    .max(50, "رمز عبور طولانی است")
    .matches(/[A-Z]/, "حروف بزرگ")
    .matches(/[a-z]/, "حروف کوچک")
    .matches(/\d/, "اعداد")
    .matches(/[@$!%*?&#]/, "علامت"),
});
const getNotificationMessages = () => [
  {
    icon: "error",
    title: "رمز عبور غیرقابل قبول است",
    subtitle: "",
    actions: ["Close"],
  },
  { icon: "success", title: "Changes Saved", actions: ["OK"] },
  {
    icon: "warning",
    title: "Reminder",
    subtitle: "You will receive more notifications.",
    actions: ["Close"],
  },
  // Add more messages here as needed
];
function SignupForm() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const {
    username,
    email,
    password,
    confirmPassword,
    user_type,
    updateUsername,
    updatePassword,
    updateConfirmPassword,
    updateEmail,
    updateUser_type,
  } = useSignupFormStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("1");
  const formState = useSignupFormStore((state) => state);
  const formData = { username, email, password, confirmPassword, user_type };
  const [errors, setErrors] = useState([]);

  function addNotification(title, subtitle, actions) {
    // const messages = getNotificationMessages();
    // const message = messages[Math.floor(Math.random() * messages.length)];
    // setNotifications((prev) => [...prev, { id: Date.now(), ...message }]);
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), title, subtitle, actions },
    ]);
  }
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };
  function onChangeRole(e) {
    setRole(e.target.value);
    console.log(errors?.map((err) => err.message));
    // const notif = addNotification("Heelo", "Nigga", "OK");

    addNotification(
      "مشکل داری؟",
      errors
        ?.filter((err) => inlineErrors.includes(err))
        .map((err) => err.message)
        .join(" ،"),
      ["دارم"]
    );
  }
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  }
  const onSubmit = async (e) => {
    console.log("Form Submitted", e);
    try {
      await schema.validate(formData, { abortEarly: false });
      const bodyData = {
        username: username,
        email: email,
        password: password,
        user_type: "basic",
      };
      console.log("Form bodyData:", bodyData);

      await postData("/auth/register/", bodyData)
        .then((response) => {
          console.log("Data posted successfully:", response);
        })
        .catch((error) => {
          //   console.log(error);
          if (error?.response?.data) {
            const data = error?.response?.data;
            if (data?.username) {
              const err = {
                message: "نام کاربری تکراری است",
                path: "username",
              };
              setErrors((pre) => [...pre, err]);
            } else if (data?.email) {
              const err = { message: "ایمیل تکراری است", path: "email" };
              setErrors((pre) => [...pre, err]);
            }
          }
        });
    } catch (error) {
      setErrors((pre) => [...pre, error.inner]);
    } finally {
      console.log("Errors: ", errors);
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
        <div className={styles.text}>برای ثبت نام اطلاعات خود را وارد کنید</div>
        <div className={styles.form_even_justify}>
          <div className={styles.input_row}>
            <div>
              <Label className={styles.Label}>نام کاربری</Label>
              <CustomInput
                placeholder="Username"
                autofocus={true}
                onKey={(e) => handleKeyDown(e)}
                name="username"
                errors={errors}
                onChange={formState.updateUsername}
                value={username}
                showErrors={true}
              />
            </div>
            <div>
              <Label className={styles.Label}>ایمیل</Label>
              <CustomInput
                placeholder="Email"
                autofocus={true}
                onKey={(e) => handleKeyDown(e)}
                name="email"
                onChange={formState.updateEmail}
                value={email}
                errors={errors}
                showErrors={true}
              />
            </div>
          </div>
          <div className={styles.input_row}>
            <div>
              <Label className={styles.Label}>تایید رمز عبور</Label>
              <PasswordInput
                handleKeyDown={handleKeyDown}
                placeholder="Confirm Password"
                errors={errors}
                name="confirmPassword"
                onChange={formState.updateConfirmPassword}
                value={confirmPassword}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                showErrors={true}
              />
            </div>
            <div>
              <Label className={styles.Label}>رمز عبور</Label>
              <PasswordInput
                handleKeyDown={handleKeyDown}
                placeholder="Password"
                errors={errors}
                name="password"
                className=""
                hasEye={true}
                onChange={formState.updatePassword}
                value={password}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                showErrors={true}
              />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <RadioInput>
            <RadioInputOption
              value={"1"}
              id="tab-1"
              checked={role === "1"}
              onChange={onChangeRole}
            >
              هیچکدام
            </RadioInputOption>
            <RadioInputOption
              value={"2"}
              id="tab-2"
              checked={role === "2"}
              onChange={onChangeRole}
            >
              استارت‌آپ
            </RadioInputOption>
            <RadioInputOption
              value={"3"}
              id="tab-3"
              checked={role === "3"}
              onChange={onChangeRole}
            >
              سرمایه‌گذار
            </RadioInputOption>
          </RadioInput>
        </div>
        <div
          onClick={() => {
            navigate("/login");
            updateUsername("");
            updatePassword("");
            updateConfirmPassword("");
            updateEmail("");
            updateUser_type("basic");
          }}
          className={styles.has_account}
        >
          قبلا ثبت نام کرده‌اید؟
        </div>
        <DrawerButton classNames="font-vazirmatn" onClick={onSubmit}>
          ثبت نام
        </DrawerButton>
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
      {/* <NotificationCenter /> */}
    </>
  );
}

export default SignupForm;
