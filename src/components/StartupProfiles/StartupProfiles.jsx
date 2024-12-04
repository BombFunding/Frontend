import personIcon from "../../assets/personIcon.png";
function StartupProfiles() {
	return (
		<section className="border-solid border-2 rounded-lg border-bomborange p-[1.5vw] place-items-center">
			<h1 className="flex gap-[1vw] p-[3vw]">
				<img src={personIcon} className="h-[2.75vw] place-self-center" />
				<div className="h-[3vw] place-self-center">پروفایل‌ها</div>
			</h1>
		</section>
	);
}

export default StartupProfiles;
