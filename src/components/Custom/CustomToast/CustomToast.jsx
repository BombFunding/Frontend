function CustomToast({ Header, Message }) {
	return (
		<>
			<h1 className="font-vazirmatn text-[20px]">{Header}</h1>
			<div className="font-vazirmatn text-[10px]">{Message}</div>
		</>
	);
}

export default CustomToast;
