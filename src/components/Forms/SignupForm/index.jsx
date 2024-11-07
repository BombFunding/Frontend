import useLoginStore from "@/stores/LoginStore";
import logo from "@/assets/logo.png";

import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import DrawerButton from "@/components/DrawerButton";
import styles from "./SignupForm.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	const navigate = useNavigate();
	const { usernameEmail, password, updateUsernameEmail, updatePassword } =
		useLoginStore();
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			Signup(e);
		}
	}
	const onSubmit = (data) => {
		console.log("Form Data:", data);
	};
	function Signup(e) {
		e.preventDefault();
		console.log(usernameEmail, password);
	}
	return (
		// <form className={styles.form_style} onSubmit={(e) => Signup(e)}>
		<form className={styles.form_style} onSubmit={handleSubmit(onSubmit)}>
			<img className="mix-blend-darken h-0" src={logo} alt="logo" />
			<div className="text-black m-4 text-xl">خوش آمدید</div>
			<div className="text-black text-xs text-center">
				برای ثبت نام اطلاعات خود را وارد کنید
			</div>
			<div className="flex justify-evenly w-full">
				<div className="grid place-self-center">
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						ایمیل
					</Label>
					<CustomInput
						value={usernameEmail}
						update={(e) => updateUsernameEmail(e.target.value)}
						placeholder="Email"
						autofocus={true}
						onKey={(e) => handleKeyDown(e)}
						register={register}
						name="email"
						errors={errors}
					/>
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						تایید رمز عبور
					</Label>
					<PasswordInput
						value={password}
						update={(e) => updatePassword(e.target.value)}
						handleKeyDown={handleKeyDown}
						placeholder="Confirm Password"
						errors={errors}
						register={register}
						name="confirmPassword"
					/>
				</div>
				<div className="grid place-items-center">
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						نام کاربری
					</Label>
					<CustomInput
						value={usernameEmail}
						update={(e) => updateUsernameEmail(e.target.value)}
						placeholder="Username"
						autofocus={true}
						onKey={(e) => handleKeyDown(e)}
						register={register}
						name="username"
						errors={errors}
					/>

					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						رمز عبور
					</Label>
					<div>
						<PasswordInput
							value={password}
							update={(e) => updatePassword(e.target.value)}
							handleKeyDown={handleKeyDown}
							placeholder="Password"
							errors={errors}
							register={register}
							name="password"
							className=""
							hasEye={true}
						/>
					</div>
					{/* </div> */}
				</div>
			</div>
			<div
				onClick={() => navigate("/login")}
				className="text-xs text-bombgray cursor-pointer hover:text-black mt-1"
			>
				قبلا ثبت نام کرده‌اید؟
			</div>
			<DrawerButton onClick={handleSubmit(onSubmit)}>
				ثبت نام
			</DrawerButton>
		</form>
	);
}

export default SignupForm;
