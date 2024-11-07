import { Input } from "../../ui/input";
import styles from "./CustomInput.module.scss";

function CustomInput({
	value,
	update,
	placeholder,
	autofocus,
	type,
	onKey,
	className,
	errors,
	name,
	register,
}) {
	return (
		<>
			<Input
				// value={value}
				onChange={(e) => update(e)}
				type={type}
				placeholder={placeholder}
				autoFocus={autofocus}
				onKeyDown={(e) => onKey(e)}
				// className={`pt-2 text-start min-w-full font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0 ${className}`}
				className={`pt-2 text-start w-full place-self-start font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0 ${className}`}
				{...register(name)}
				name={name}
				id={name}
			/>
			{errors[name] ? (
				<p className={styles.error_label}>{errors[name]?.message}</p>
			) : <p className="text-xs">f</p>}
		</>
	);
}

export default CustomInput;
