import personIcon from "../../assets/personIcon.png";
function StartupProfiles() {
	return (
		<section className="border-solid border-2 rounded-lg border-bomborange p-[1.5vw] ">
			<h1 className="flex gap-[1vw] p-[3vw] place-self-center">
				<img
					src={personIcon}
					className="h-[2.75vw] place-self-center"
				/>
				<div className="h-[3vw] place-content-center">پروفایل‌ها</div>
			</h1>
			<div className="p-[1.5vw] grid grid-flow-col place-content-start border-solid border-2 rounded-lg">
				<button className="text-center border-solid border-2 border-bombblack rounded-lg h-[20vh] mr-[2vw] w-[10vw]">
					پروفایل 1
				</button>
				<button className="text-center border-solid border-2 border-bombblack rounded-lg h-[20vh] mr-[2vw] w-[10vw]">
					پروفایل 2
				</button>
				<button className="border-solid border-2 border-gray-400 rounded-lg h-[20vh] bg-gray-100 w-[10vw] text-center">
					+
				</button>
			</div>
		</section>
	);
}

export default StartupProfiles;
