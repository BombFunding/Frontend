import FilterSection from "@/components/FilterSection/FilterSection";
import StartupPagination from "@/components/StartupPagination/StartupPagination";

function StarBoard() {
	return (
		<div className="font-vazirmatn text-black w-[100vw]">
			<FilterSection />
			n استارت آپ یافت شد
			<StartupPagination />
		</div>
	);
}

export default StarBoard;
