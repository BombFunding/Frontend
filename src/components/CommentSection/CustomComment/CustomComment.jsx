	
function CustomComment({ pfp, Username, Comment }) {
	return (
		<div className="flex gap-5 my-[2vh] border-solid border-2 rounded-lg bg-gray-50 border-gray-300 py-[2vh] px-[2vw] w-full place-content-end">
			<div className="grid">
				<h2>{Username}</h2>
				<p>{Comment}</p>
			</div>
			<img src={pfp} className="rounded-full h-[10vh]" />
		</div>
	);
}

export default CustomComment;
