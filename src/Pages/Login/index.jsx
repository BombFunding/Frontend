import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Label } from "@/components/ui/label";

import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import CustomInput from "@/components/CustomInput";

import loginimage from "../../assets/loginpage.png";
import logo from "../../assets/logo.png";

const Login = () => {
	const navigate = useNavigate();

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
						className={`${isTablet ? "h-screen" : "h-screen"} ${
							isTablet ? "w-1/2 overflow-clip object-fill" : ""
						}`}
						src={loginimage}
						alt="login"
					/>
				)}
				<form className="content-center p-12 place-items-center grid w-1/2">
					<img
						className="mix-blend-darken h-0"
						src={logo}
						alt="logo"
					/>
					<div className="text-black text m-4 text-xl">خوش آمدید</div>
					<div className="text-black text m-4">
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
					<CustomInput placeholder="ایمیل" autofocus="true" />
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						رمز عبور
					</Label>
					<PasswordInput />
					<div
						onClick={() => navigate("/signup")}
						className="text-xs text-bombgray cursor-pointer hover:text-black"
					>
						حساب کاربری ندارید؟
					</div>
					<LoginButton>ورود</LoginButton>
					{/* <CustomButton className="mt-5 place-self-start ml-2">
						ورود
					</CustomButton> */}
				</form>
			</div>
		</div>
	);
};

export default Login;
