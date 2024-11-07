import { useState, useEffect } from "react";
import styles from "./PasswordInput.module.scss";
import CustomInput from "@/components/Custom/CustomInput";

function PasswordInput({
	update,
	handleKeyDown,
	className,
	errors,
	name,
	value,
	placeholder,
	hasEye,
	onChange,
}) {
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
				// const degrees = -(rad * (180 / Math.PI)) / 30;
				const degrees = -(rad * (180 / Math.PI)) / 10;
				setBeamDegrees(`${degrees}deg`);
			}
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="relative w-full">
			<CustomInput
				type={showPassword ? "text" : "password"}
				update={update}
				placeholder={placeholder}
				onKey={(e) => handleKeyDown(e)}
				// className={`pr-20 ${className}`}
				className={`${className}`}
				name={name}
				onChange={onChange}
				value={value}
				errors={errors}
			/>
			{ hasEye &&
				<>
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
							backgroundColor: showPassword
								? "#fe9149"
								: "transparent",
						}}
						className={styles.beam}
					/>
				</>
			}
		</div>
	);
}

export default PasswordInput;
