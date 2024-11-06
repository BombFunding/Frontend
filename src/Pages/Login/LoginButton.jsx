import "./LoginButton.css";

function LoginButton({ onLogin, children }) {
	return (
		<button
			type="submit"
			className="login mt-6"
			onClick={(e) => onLogin(e)}
		>
			<span className="circle" aria-hidden>
				<span className="icon arrow"></span>
			</span>
			<span className="button-text font-vazirmatn">{children}</span>
		</button>
	);
}

export default LoginButton;
