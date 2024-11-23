import { useState, useEffect } from "react";
import styles from "./PasswordInput.module.scss";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";

function PasswordInput({
	update,
	handleKeyDown,
	className,
	name,
	placeholder,
	hasEye,
	onChange,
	showPassword,
	togglePasswordVisibility,
}) {
	const [beamDegrees, setBeamDegrees] = useState("0deg");

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
		<div className={styles.password_input_structure}>
			<CustomInput
				type={showPassword ? "text" : "password"}
				update={update}
				placeholder={placeholder}
				onKey={(e) => handleKeyDown(e)}
				className={`${className} ${hasEye ? "right-[2.5rem]" : ""}`}
				name={name}
				onChange={onChange}
			/>
			{hasEye && (
				<>
					<button
						type="button"
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
								? // ? "#fe9149"
								  "#fda469"
								: "transparent",
						}}
						className={styles.beam}
					/>
				</>
			)}
		</div>
	);
}

export default PasswordInput;
