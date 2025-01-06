import { useState } from "react";
import styles from "./CustomTextArea.module.scss";
import { Textarea } from "@/components/ui/textarea";
function CustomTextArea({
  placeholder,
  autofocus,
  type,
  value,
  onKey,
  className,
  holderClassName,
  inputClassName,
  name,
  onChange,
  register,
  style,
}) {
  const [empty, setEmpty] = useState(true);
  return (
    <>
      <div className={`relative group mt-6 ${holderClassName}`}>
        {register ? (
          <textarea
            {...register(name)}
            type={type}
            name={name}
            autoFocus={autofocus}
            onChange={(e) => {
              setEmpty(e.target.value.length === 0);
              onChange(e.target.value);
            }}
            style={style}
            value={value}
            className={`${styles.CustomInput} peer block border-solid border-2 border-bomborange rounded-lg bg-white px-4 pb-2 pt-2.5
                    text-black text-left transition duration-150 ease-in-out focus:outline-none focus:ring-0 focus:border-bomborange ${inputClassName}`}
          />
        ) : (
          <textarea
            type={type}
            name={name}
            autoFocus={autofocus}
            onChange={(e) => {
              setEmpty(e.target.value.length === 0);
              onChange(e.target.value);
            }}
            style={style}
            value={value}
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

export default CustomTextArea;
