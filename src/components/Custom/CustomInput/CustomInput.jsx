import { useEffect, useState } from "react";
import styles from "./CustomInput.module.scss";
function CustomInput({
	placeholder,
	autofocus,
	type,
	value,
	onKey,
	className,
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
			<div className="relative group mt-6">
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
						onKeyDown={(e) => onKey && onKey(e)}
						value={value}
						className={`${styles.CustomInput} peer block border-solid border-2 border-bomborange rounded-lg bg-white px-4 pb-2 pt-2.5
                    text-black text-left transition duration-150 ease-in-out focus:outline-none focus:border-bomborange ${inputClassName}`}
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
						onKeyDown={(e) => onKey(e)}
						className={`${styles.CustomInput} peer block border-solid border-2 border-bomborange rounded-lg bg-white px-4 pb-2 pt-2.5
                    text-black text-left transition duration-150 ease-in-out focus:outline-none focus:border-bomborange ${inputClassName}`}
					/>
				)}
				<label
					className={`${
						!empty && "-translate-y-[35px] px-[5px]"
					} absolute rounded-full right-4 peer-focus:px-[5px] pointer-events-none text-sm top-3
                    text-gray-500 transition-all peer-focus:-translate-y-[35px] peer-focus:right-1 
                    peer-focus:scale-[70%] peer-valid:bg-white peer-focus:text-gray-500 ${className}`}
				>
					{placeholder}
				</label>
			</div>
		</>
	);
}

export default CustomInput;
