import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";

import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import CustomInput from "@/components/CustomInput";
import useLoginStore from "@/stores/LoginStore";

import loginimage from "../../assets/loginpage.png";
import logo from "../../assets/logo.png";
import axios from "axios";

// const useLoginStore = create((set) => ({
// 	usernameEmail: "",
// 	password: "",
// 	user_type: "",
// 	updateUsernameEmail: (usernameEmail) =>
// 		set((state) => ({ usernameEmail: usernameEmail })),
// 	updatePassword: (password) => set((state) => ({ password: password })),
// 	// count: 1,
// 	// inc: () => set((state) => ({ count: state.count + 1 })),
// }));

const Login = () => {
	const { usernameEmail, password, updateUsernameEmail, updatePassword } =
		useLoginStore();

	// function infoValidation() {
	// 	if (!usernameEmail.includes("@"))
	// }
	function onLogin(e) {
		e.preventDefault();
		console.log(usernameEmail, password);
		// if (!infoValidation()) return;
		axios({
			method: "post",
			url: "http://127.0.0.1:8000/auth/register/",
			data: {
				"username": usernameEmail,
				"password": password 
			}
		});
	}

	const navigate = useNavigate();

	const { register, handleSubmit } = useForm();

	const isMobile = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const isTablet = useMediaQuery({
		query: "(max-width: 1280px)",
	});
	return (
		<div className="container">
			<div className="bg-gray-100 font-vazirmatn container h-screen shadow-md flex flex-row justify-between">
				{isMobile && (
					<img
						className={`h-screen w-1/2 ${
							isTablet
								? "object-cover transition ease-in duration-200"
								: ""
						}`}
						src={loginimage}
						alt="login"
					/>
				)}
				<form
					className={`content-center p-12 place-items-center grid ${
						isMobile ? "w-1/2" : ""
					}`}
					onSubmit={(e) => onLogin(e)}
				>
					<img
						className="mix-blend-darken h-0"
						src={logo}
						alt="logo"
					/>
					<div className="text-black m-4 text-xl">خوش آمدید</div>
					<div className="text-black m-4">
						برای ورود اطلاعات خود را وارد کنید
					</div>
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						ایمیل یا نام کاربری
					</Label>
					{/* <Input
						placeholder="ایمیل"
						autofocus="true"
						className=" w-11/12 font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0"
					/> */}
					<CustomInput
						value={usernameEmail}
						update={(e) => updateUsernameEmail(e.target.value)}
						placeholder="ایمیل"
						autofocus={true}
						// register={register}
						// registerName="usernameEmail"
					/>
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						رمز عبور
					</Label>
					<PasswordInput
						value={password}
						update={(e) => updatePassword(e.target.value)}
						// register={register}
					/>
					<div
						onClick={() => navigate("/signup")}
						className="text-xs text-bombgray cursor-pointer hover:text-black"
					>
						حساب کاربری ندارید؟
					</div>
					<LoginButton onLogin={onLogin}>ورود</LoginButton>
					{/* <CustomButton className="mt-5 place-self-start ml-2">
						ورود
					</CustomButton> */}
				</form>
			</div>
		</div>
	);
};

export default Login;
