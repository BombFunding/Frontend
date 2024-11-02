import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginimage from "../../assets/loginpage.png";
import styles from "./Login.module.scss";
import React from "react";
import CanvasTriangle from "./Canvas";

const Login = () => {
	return (
		<>
			<div className="bg-gray-100 font-vazirmatn container h-screen rounded-lg shadow-md flex flex-row justify-between">
				{/* <div className=""> */}
				{/* <svg
            className="bg-white"
            stroke="black"
            strokeWidth="10"
            
          >
            <polygon
              className=""
              points="100,10 200,0 300,40"
              fill="red"
            />
          </svg> */}
				<div className="w-1/2 relative z-0">
					<img
						className="h-screen rounded-l-md absolute z-10"
						src={loginimage}
						alt="login"
					/>
				</div>

				<form className="content-center p-12 place-items-center grid">
					<div className="text-black text m-4">خوش آمدید</div>
					<div className="text-black text m-4">
						برای ورود اطلاعات خود را وارد کنید
					</div>
					<Label className="text-black m-1.5 place-self-end">
						ایمیل یا نام کاربری
					</Label>
					<Input
						type="email"
						placeholder="ایمیل"
						className="text-right ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-rose-700 text-black"
					/>
					<Label className="items-center text-black m-1.5 place-self-end">
						رمز عبور
					</Label>
					<Input
						type="email"
						placeholder="رمز عبور"
						className="text-right ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-rose-700 text-black"
					/>
					<Button className="text-right ease-in duration-200 ml-1 mt-3 text-rose-700 hover:text-orange-200 bg-orange-200 rounded-full hover:bg-rose-700 w-16">
						ورود
					</Button>
					<Button
						className={`flex mt-12 text-rose-700 bg- place-self-start border border-blue-500 rounded-lg ${styles.button}`}
					>
						ثبت نام
					</Button>
				</form>
				{/* </div> */}
			</div>
		</>
	);
};

export default Login;
