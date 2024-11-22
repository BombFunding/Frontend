import { useState } from "react";

function CustomInput({
	placeholder,
	autofocus,
	type,
	onKey,
	className,
	name,
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
		</>
	);
}

export default CustomInput;
