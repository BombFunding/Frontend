function CustomToast({ Header, Message }) {
	return (
		<>
			<h1 className="font-vazirmatn text-[1rem]">{Header}</h1>
			<div className="font-vazirmatn text-[0.7rem]">{Message}</div>
		</>
	);
}

export default CustomToast;
