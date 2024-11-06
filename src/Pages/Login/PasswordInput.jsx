import { useState, useEffect } from "react";
import styles from "./PasswordInput.module.scss";
import { Input } from "@/components/ui/input";
import CustomInput from "@/components/CustomInput";
import useLoginStore from "@/stores/LoginStore";

const PasswordInput = ({ value, update, register }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [beamDegrees, setBeamDegrees] = useState("0deg");

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	useEffect(() => {
		const handleMouseMove = (e) => {
			const beam = document.getElementById("beam");
			if (beam) {
				const rect = beam.getBoundingClientRect();
				const mouseX = rect.left + rect.width / 2;
				const mouseY = rect.top + rect.height / 2;
				const rad = Math.atan2(e.clientY - mouseY, e.clientX - mouseX);
				const degrees = -(rad * (180 / Math.PI)) / 30;
				setBeamDegrees(`${degrees}deg`);
			}
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="relative w-full">
			{/* <Input
				type={showPassword ? "text" : "password"}
				placeholder="رمز عبور"
				value={value}
				onChange={(e) => update(e)}
				className="min-w-full pr-20 font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0"
			/> */}
			<CustomInput
				type={showPassword ? "text" : "password"}
				value={value}
				update={update}
				placeholder="رمز عبور"
				register={register}
				registerName="password"
			/>
			<button
				type="button"
				id="eyeball"
				className={`${styles.eyeball}`}
				onClick={togglePasswordVisibility}
			>
				<div className={styles.eye}></div>
			</button>
			<div
				id="beam"
				style={{
					transform: `translateY(-50%) rotate(${beamDegrees})`,
					backgroundColor: showPassword ? "#fe9149" : "transparent",
				}}
				className={styles.beam}
			></div>
		</div>
	);
};

export default PasswordInput;
