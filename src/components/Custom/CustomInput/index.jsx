<<<<<<< HEAD
import { Input } from "../../ui/input";
import styles from "./CustomInput.module.scss";
const errorsAll = {
	password: [
		// "اجباری",
		"حداقل 8 کاراکتر",
		"شامل حروف کوچک",
		"شامل حروف بزرگ",
		"شامل اعداد",
		"شامل علامت",
	],
	username: [
		// "اجباری",
		"حداقل 3 کاراکتر",
	],

	email: [
		// "اجباری",
		"فرمت درست ایمیل",
	],

	confirmPassword: [
		// "اجباری",
		"یکسان با پسورد",
	],
};
=======
import { useState } from "react";
>>>>>>> a7e274b1ac741aeec0fdfd240fabda462665e11b

function CustomInput({
	placeholder,
	autofocus,
	type,
	onKey,
	className,
	name,
<<<<<<< HEAD
	value,
	onChange,
}) {
	return (
		<>
			<Input
				type={type}
				placeholder={placeholder}
				autoFocus={autofocus}
				onKeyDown={(e) => onKey(e)}
				className={`${styles.custom_input_structure} font-roboto ${className}`}
				name={name}
				id={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{/* <div className={styles.input_errors}>
				{
					showErrors &&
						errorsAll[name]?.map((error) => (
							<p
								className={
									!errorsList?.includes(error)
										? styles.error_solved
										: styles.error_label
								}
								key={error.message}
							>
								{error}
							</p>
						))
					// errors &&
					// 	errors.map((error) => {
					// 		if (error.path == name) {
					// 			return (
					// 				<p className={styles.error_label}>
					// 					{error.message}
					// 				</p>
					// 			);
					// 			// return <p className={styles.error_label}>{error}</p>;
					// 		}
					// 	})

					// <p className={styles.error_label}>{errors[name]}</p>
				}
			</div> */}
=======
	onChange,
}) {
	const [empty, setEmpty] = useState(true);
	return (
		<>
			{/* <Input
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        onKeyDown={(e) => onKey(e)}
        className={`${styles.custom_input_structure} font-roboto ${className}`}
        name={name}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      /> */}

			<div className="relative group mt-6">
				<input
					type={type}
					name={name}
					autoFocus={autofocus}
					onChange={(e) => {
						setEmpty(e.target.value.length === 0);
						onChange(e);
					}}
					onKeyDown={(e) => onKey(e)}
					className="peer block border-solid border-2 border-bomborange rounded-lg bg-gray-100 px-4 pb-2 pt-2.5
                    text-black text-left transition duration-150 ease-in-out focus:outline-none focus:border-bomborange"
				/>
				<label
					className={`${
						!empty && "-translate-y-[35px] px-[5px]"
					} absolute rounded-full right-4 peer-focus:px-[5px] pointer-events-none text-sm top-3
                    text-gray-500 transition-all peer-focus:-translate-y-[35px] peer-focus:right-1 
                    peer-focus:scale-[70%] peer-valid:bg-gray-100 peer-focus:text-gray-500 ${className}`}
				>
					{placeholder}
				</label>
			</div>
>>>>>>> a7e274b1ac741aeec0fdfd240fabda462665e11b
		</>
	);
}

export default CustomInput;
