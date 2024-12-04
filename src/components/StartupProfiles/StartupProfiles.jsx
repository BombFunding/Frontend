import personIcon from "../../assets/personIcon.png";
function StartupProfiles() {
	return (
		<section className="border-solid border-2 rounded-lg border-bomborange p-[1.5vw] place-items-center">
			<h1 className="flex gap-[1vw] p-[3vw]">
				<img
					src={personIcon}
					className="h-[2.75vw] place-self-center"
				/>
				<div className="h-[3vw] place-self-center">پروفایل‌ها</div>
			</h1>
			<div className="w-full p-[1.5vw]">
				<button className="text-center border-solid border-2 border-bombblack rounded-lg p-[3vw] mb-[2vw] w-full">
					پروفایل 1
				</button>
				<button className="text-center border-solid border-2 border-bombblack rounded-lg p-[3vw] mb-[2vw] w-full">
					پروفایل 2
				</button>
				<button className="border-solid border-2 border-gray-400 rounded-lg p-[1.5vw] bg-gray-100 w-full text-center">
					+
				</button>
			</div>
		</section>
	);
}

export default StartupProfiles;
