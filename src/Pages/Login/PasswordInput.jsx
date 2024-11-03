import { useState, useEffect } from "react";
import "./PasswordInput.css";
import { Input } from "@/components/ui/input";

const PasswordInput = () => {
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
			<Input
				type={showPassword ? "text" : "password"}
				placeholder="رمز عبور"
				className="font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0"
			></Input>
			<button
				type="button"
				id="eyeball"
				className=""
				onClick={togglePasswordVisibility}
			>
				<div className="eye"></div>
			</button>
			<div
				id="beam"
				style={{
					transform: `translateY(-50%) rotate(${beamDegrees})`,
					backgroundColor: showPassword ? "#FF7517" : "transparent",
				}}
			></div>
		</div>
	);
};

export default PasswordInput;
