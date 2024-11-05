import { Input } from "../ui/input";

function CustomInput({ placeholder, autofocus, type, className }) {
	return (
		<Input
            type={type}
			placeholder={placeholder}
			autofocus={autofocus}
			className={`min-w-full font-roboto ease-in duration-300 bg-orange-100 mb-2 hover:placeholder:text-bombgray text-bombblack focus:text-bombblack border-solid border-4 border-bombgray focus:border-bomborange focus-visible:ring-0 ${className}`}
		></Input>
	);
}

export default CustomInput;
