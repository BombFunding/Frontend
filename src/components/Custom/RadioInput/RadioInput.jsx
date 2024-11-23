import "./RadioInput.scss";
// import "./m2.css";

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
                onChange={onChange}
				value={value}
			></input>
			<label className={"segmented_control_element"} htmlFor={id}>
				<p>{children}</p>
			</label>
		</>
	);
};

// export const Nig = () => {
// 	return (
// 		<div className="container">
// 			<div className="components">
// 				{/* Segmented Control */}
// 				<div className="segmented-control">
// 					<input
// 						type="radio"
// 						name="radio2"
// 						value="3"
// 						id="tab-1"
// 						defaultChecked
// 					/>
// 					<label htmlFor="tab-1" className="segmented-control__1">
// 						<p>Tab 1</p>
// 					</label>

// 					<input type="radio" name="radio2" value="4" id="tab-2" />
// 					<label htmlFor="tab-2" className="segmented-control__2">
// 						<p>Tab 2</p>
// 					</label>

// 					<input type="radio" name="radio2" value="5" id="tab-3" />
// 					<label htmlFor="tab-3" className="segmented-control__3">
// 						<p>Tab 3</p>
// 					</label>

// 					<div className="segmented-control__color"></div>
// 				</div>

// 				{/* Other components go here */}
// 				{/* Example: Adding a Button */}
// 				<button className="btn btn__primary">
// 					<p>Primary Button</p>
// 				</button>

// 				{/* Example: Adding a Checkbox */}
// 				<div className="checkbox">
// 					<input type="checkbox" id="checkbox-1" />
// 					<label htmlFor="checkbox-1" className="checkbox__1">
// 						<i className="fas fa-check"></i>
// 					</label>
// 				</div>

// 				{/* Example: Adding a Radio Button */}
// 				<div className="radio">
// 					<input type="radio" id="radio-1" name="radio-group" />
// 					<label htmlFor="radio-1" className="radio__1">
// 						<span>Option 1</span>
// 					</label>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
