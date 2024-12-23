import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import FilterSection from "@/components/FilterSection/FilterSection";
import StartupPagination from "@/components/StartupPagination/StartupPagination";
import { getData } from "@/Services/ApiClient/Services";
import { useState } from "react";

function StarBoard() {
	const [search, setSearch] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
		getData("/starboard/top-startups/", {
			type: "top_liked",
			results_per_page: 12,
			page_number: 1,
		}).then((data) => {
			console.log(data);
		});
	};
	return (
		<form
			className="font-vazirmatn text-black w-[100vw]"
			onSubmit={onSubmit}
		>
			<div className="m-10 place-content-center">
				<CustomInput
					placeholder="جستجو"
					value={search}
					onChange={setSearch}
				/>
			</div>
			<FilterSection />
			n استارت آپ یافت شد
			<StartupPagination />
		</form>
	);
}

export default StarBoard;
