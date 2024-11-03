import { useEffect, useState } from "react";

function PasswordField() {
	const [showPass, setShowPass] = useState(false);
	function togglePass(e) {
		e.preventDefault();
		setShowPass((showPass) => !showPass);
	}
	return (
		<>
			<input
				type="password"
				id="password"
				autoCapitalize="off"
				autoComplete="off"
				autoCorrect="off"
				autoFocus="off"
			/>
			<button type="button" id="eyeball">
				<div className="eye" onClick={(e) => togglePass(e)}></div>
			</button>
			<div id="beam"></div>
		</>
	);
}

export default PasswordField;
