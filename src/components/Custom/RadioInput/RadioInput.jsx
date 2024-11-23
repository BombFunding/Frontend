import "./RadioInput.scss";

export const RadioInput = ({ children }) => {
	return (
		<div className={"segmented_control"}>
			{children}
			<div className={"segmented_control_color"}></div>
		</div>
	);
};

export const RadioInputOption = ({
	id,
	checked,
	onChange,
	value,
	children,
}) => {
	return (
		<>
			<input
				type="radio"
				name="radio2"
				id={id}
				checked={checked}
                onChange={(e) => onChange(e.target.value)}
				value={value}
			></input>
			<label className={"segmented_control_element"} htmlFor={id}>
				<p>{children}</p>
			</label>
		</>
	);
};
