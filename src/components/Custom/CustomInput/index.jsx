import { Input } from "../../ui/input";

function CustomInput({
	value,
	update,
	placeholder,
	autofocus,
	type,
	onKey,
	className,
	register,
	registerName,
}) {
	return (
		<Input
			value={value}
			onChange={(e) => update(e)}
			type={type}
			placeholder={placeholder}
			autoFocus={autofocus}
			className={`pt-2 text-start min-w-full font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0 ${className}`}
			onKeyDown={(e) => onKey(e)}
		/>
	);
}

export default CustomInput;
