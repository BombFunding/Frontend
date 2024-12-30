import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import FilterSection from "@/components/FilterSection/FilterSection";
import { Loading } from "@/components/Loading/Loading";
import StartupPagination from "@/components/StartupPagination/StartupPagination";
import { getData, getDataParams } from "@/Services/ApiClient/Services";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StarBoard() {
	const { page } = useParams();
	const {
		pageNumber,
		setPageNumber,
		searchQuery,
		setSearchQuery,
		resultsPerPage,
		setResultsPerPage,
		loading,
		setLoading,
		projects,
		setProjects,
	} = useStarboardStore();
	useEffect(() => {
		setLoading(true);
		setPageNumber(page ? Number(page) : 1);
		getDataParams("/starboard/most-recent/", null, {
			results_per_page: resultsPerPage,
			page_number: pageNumber,
		}).then((data) => {
			setProjects(data);
			setLoading(false);
		});
	}, [pageNumber]);
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
	if (loading) return <Loading />;
	return (
		<form
			className="font-vazirmatn text-black w-[100vw]"
			onSubmit={onSubmit}
		>
			<div className="m-10 place-content-center">
				<CustomInput
					placeholder="جستجو"
					value={searchQuery}
					onChange={setSearchQuery}
				/>
			</div>
			<FilterSection setResultsPerPage={setResultsPerPage} />
			<p className="rtl place-self-center">
				{projects.length === 0 ? "هیچ استارت‌آپی یافت نشد" : `${projects.length} استارت‌آپ یافت شد`}
				
			</p>
			<StartupPagination />
		</form>
	);
}

export default StarBoard;
