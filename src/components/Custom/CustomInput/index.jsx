import { useState } from "react";
import styles from "./CustomInput.module.scss";
// import "./CustomInput.module.scss";
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

function CustomInput({
	placeholder,
	autofocus,
	type,
	onKey,
	className,
	name,
	onChange,
}) {
	const [flg, setFlg] = useState(false);
	// const [val, changeVal] = useState(0);
	// console.log("Errors:", errors);
	// console.log(onchange);
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
						setFlg(e.target.value.length > 0);
						onChange(e);
					}}
					onKeyDown={(e) => onKey(e)}
					className="peer block border-solid border-2 border-bomborange rounded-lg bg-gray-100 px-4 pb-2 pt-2.5 text-black text-left transition duration-150 ease-in-out focus:outline-none focus:border-bomborange"
					placeholder=""
				/>
				<label
					// className={`absolute bg-transparent pointer-events-none text-sm left-3 -top-1 text-gray-500 transition-all translate-y-4 scale-100 peer-focus:-translate-y-2 peer-focus:scale-90 peer-valid:scale-90 peer-focus:left-3 peer-valid:left-3 peer-focus:bg-gray-100 peer-valid:bg-gray-100 peer-focus:px-1 peer-valid:px-1 peer-focus:text-gray-500`}
					className={`${
						flg
							? "-translate-y-0 scale-90 left-3 bg-gray-100 px-1 text-gray-500 bg-transparent"
							: ""
					} ${className} absolute bg-transparent pointer-events-none text-sm left-3 top-3 text-gray-500 transition-all scale-100 peer-focus:-translate-y-5 peer-focus:scale-90 peer-valid:scale-90 peer-focus:left-3 peer-valid:right-1 peer-focus:bg-gray-100 peer-valid:bg-gray-100 peer-focus:px-1 peer-valid:px-1 peer-focus:text-gray-500`}
				>
					{placeholder}
				</label>
			</div>

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
		</>
	);
}

export default CustomInput;
