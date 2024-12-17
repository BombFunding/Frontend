import StartupCard from "../StartupCard/StartupCard";

function StartupPagination() {
	return (
		<div className="border-solid border-2 border-red-500 m-[1vw] p-[1vw] grid grid-cols-3 place-items-center rtl">
			<StartupCard />
			<StartupCard />
			<StartupCard />
			<StartupCard />
		</div>
	);
}

export default StartupPagination;
