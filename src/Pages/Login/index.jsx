import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginimage from "../../assets/loginpage.png";
import styles from "./Login.module.scss";
import CanvasTriangle from "./Canvas";
import { useWindowSize } from "react-use";
import CustomButton from "@/components/CustomButton";
import PasswordField from "./PasswordField/PasswordField";
import PasswordInput from "./PasswordInput";

const Login = () => {
	const { width, height } = useWindowSize();
	return (
		<>
			<div className="bg-gray-100 font-vazirmatn container h-screen shadow-md flex flex-row justify-between">
				{/* <div className="w-72 relative z-0">
					<img
						className="h-screen absolute inset-0 object-cover"
						src={loginimage}
						alt="login"
					/>
					<div className="absolute inset-0 object-cover">
						<CanvasTriangle
							width={width}
							height={height}
							className=""
						/>
					</div>
				</div> */}
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
						className="ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-rose-700 text-black"
					/>
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						رمز عبور
					</Label>
					{/* <PasswordField /> */}
					<PasswordInput />
					{/* <Input
						type="email"
						placeholder="رمز عبور"
						className="text-right ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-rose-700 text-black"
					/> */}
					<CustomButton className="mt-2.5">ورود</CustomButton>
					{/* <Button className="text-right ease-in duration-200 ml-1 mt-3 bg-bomborange hover:text-bomborange rounded-full hover:bg-bombblack w-16">
						ورود
					</Button> */}
					<CustomButton className="place-self-start mt-12 ml-3">
						ثبت نام
					</CustomButton>
					{/* <Button
						className={``}
					>
						ثبت نام
					</Button> */}
				</form>
				{/* </div> */}
			</div>
		</>
	);
};

export default Login;
