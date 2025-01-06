import { useEffect, useState } from "react";
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
						className={`${styles.CustomInput} peer block border-solid border-2 border-bomborange rounded-lg bg-white px-4 pb-2 pt-2.5
                    text-black text-left transition duration-150 ease-in-out focus:outline-none focus:ring-0 focus:border-bomborange ${inputClassName}`}
					/>
				) : (
					<input
						type={type}
						name={name}
						autoFocus={autofocus}
						onChange={(e) => {
							setEmpty(e.target.value.length === 0);
							onChange(e.target.value);
						}}
						className={`${styles.CustomInput} peer block border-solid border-2 border-bomborange rounded-lg bg-white px-4 pb-2 pt-2.5
                    text-black text-left transition duration-150 ease-in-out focus:outline-none focus:ring-0 focus:border-bomborange ${inputClassName}`}
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
