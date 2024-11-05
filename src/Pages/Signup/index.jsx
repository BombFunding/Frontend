import { useMediaQuery } from "react-responsive";
import loginimage from "../../assets/loginpage.png";
import logo from "../../assets/logo.png";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/CustomInput";
import PasswordInput from "../Login/PasswordInput";
import LoginButton from "../Login/LoginButton";
import { useNavigate } from "react-router-dom";

function Signup() {
	const Navigate = useNavigate();
	const isMobile = useMediaQuery({
		query: "(min-width: 768px)",
	});
	return (
		<div className="container">
			<div className="bg-gray-100 font-vazirmatn container h-screen shadow-md flex flex-row justify-between">
				<form className="content-center p-12 place-items-center grid w-1/2">
					<img
						className="mix-blend-darken h-0"
						src={logo}
						alt="logo"
					/>
					<div className="text-black text m-4 text-xl">خوش آمدید</div>
					<div className="text-black text m-4">
						برای ثبت نام اطلاعات خود را وارد کنید
					</div>
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						ایمیل یا نام کاربری
					</Label>
					<CustomInput placeholder="ایمیل" autofocus="true" />
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						رمز عبور
					</Label>
					<PasswordInput className="w-72" />
					<div
						onClick={() => Navigate("/login")}
						className="text-xs text-bombgray cursor-pointer hover:text-black"
					>
						قبلا ثبت نام کرده‌اید؟
					</div>
					<LoginButton>ارسال کد</LoginButton>
					{/* <CustomButton className="mt-5 place-self-start ml-2">
						ورود
					</CustomButton> */}
				</form>
				{isMobile && (
					<img src={loginimage} alt="login" className="h-screen" />
				)}
			</div>
		</div>
	);
}

export default Signup;
