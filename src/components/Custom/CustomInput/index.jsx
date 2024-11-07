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
};

function CustomInput({
	placeholder,
	autofocus,
	type,
	onKey,
	className,
	errors,
	name,
	value,
	onChange,
	showErrors,
}) {
	console.log("Errors:", errors);
	const errorsList = errors?.map((err) => err.message);
	return (
		<>
			<Input
				type={type}
				placeholder={placeholder}
				autoFocus={autofocus}
				onKeyDown={(e) => onKey(e)}
				className={`pt-2 text-start min-w-full font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0 ${className}`}
				name={name}
				id={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<div className="grid grid-cols-2 place-self-center ">
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
			</div>
		</>
	);
}

export default CustomInput;
