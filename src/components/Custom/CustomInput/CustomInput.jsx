import React, { useEffect, useState } from "react";
import styles from "./CustomInput.module.scss";
function CustomInput({
	placeholder,
	autofocus,
	type,
	value,
	className,
	holderClassName,
	inputClassName,
	name,
	onChange,
	register,
}) {
	const [empty, setEmpty] = useState(true);
	useEffect(() => {
		if (value) {
			setEmpty(false);
		}
	}, [value]);
	const [isAutofilled, setIsAutofilled] = useState(false);

	useEffect(() => {
		const input = document.getElementById("meow");

		const checkAutofill = () => {
			if (input.matches(":-webkit-autofill")) {
				setIsAutofilled(true);
			} else {
				setIsAutofilled(false);
			}
		};

		input.addEventListener("animationstart", checkAutofill);
		input.addEventListener("input", checkAutofill);

		return () => {
			input.removeEventListener("animationstart", checkAutofill);
			input.removeEventListener("input", checkAutofill);
		};
	}, []);
	return (
		<>
			<div className={`relative group mt-6 ${holderClassName}`}>
				{register ? (
					<input
						{...register(name)}
						type={type}
						name={name}
						autoFocus={autofocus}
						onChange={(e) => {
							setEmpty(e.target.value.length === 0);
							onChange && onChange(e.target.value);
						}}
						value={value}
						className={`peer ${styles.CustomInput} ${inputClassName}`}
					/>
				) : (
					<input
						type={type}
						name={name}
						autoFocus={autofocus}
						id="meow"
						onChange={(e) => {
							setEmpty(e.target.value.length === 0);
							onChange(e.target.value);
						}}
						className={`peer ${styles.CustomInput} ${inputClassName}`}
					/>
				)}
				<label
					className={`${
						!empty && "-translate-y-[25px] px-[5px]"
					} absolute right-4 peer-focus:px-[5px] pointer-events-none text-sm top-4
                    text-gray-500 transition-all peer-focus:-translate-y-[25px] peer-focus:right-1 
                    peer-focus:scale-[80%] peer-valid:bg-white peer-focus:text-gray-500 ${className}`}
				>
					{placeholder}
				</label>
			</div>
		</>
	);
}

export default CustomInput;
