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

function CustomInput({
	placeholder,
	autofocus,
	type,
	onKey,
	className,
	name,
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
		</>
	);
}

export default CustomInput;
