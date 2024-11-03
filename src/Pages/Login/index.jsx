import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginimage from "../../assets/loginpage.png";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";

const Login = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="bg-gray-100 font-vazirmatn container h-screen shadow-md flex flex-row justify-between">
				<img className="h-screen" src={loginimage} alt="login" />
				<form className="content-center p-12 place-items-center grid w-full">
					<div className="text-black text m-4 text-xl">خوش آمدید</div>
					<div className="text-black text m-4">
						برای ورود اطلاعات خود را وارد کنید
					</div>
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						ایمیل یا نام کاربری
					</Label>
					<Input
						type="email"
						placeholder="ایمیل"
						autofocus="true"
						className="font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0"
					/>
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
					<LoginButton />
					{/* <CustomButton className="mt-5 place-self-start ml-2">
						ورود
					</CustomButton> */}
				</form>
			</div>
		</>
	);
};

export default Login;
