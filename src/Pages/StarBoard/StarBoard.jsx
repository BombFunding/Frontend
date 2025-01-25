import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import FilterSection from "@/components/FilterSection/FilterSection";
import { Loading } from "@/components/Loading/Loading";
import StartupPagination from "@/components/StartupPagination/StartupPagination";
import { getData, getDataParams } from "@/Services/ApiClient/Services";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function StarBoard() {
	const { page } = useParams();
	const {
		pageNumber,
		setPageNumber,
		resultsPerPage,
		setResultsPerPage,
		loading,
		setLoading,
		projects,
		setProjects,
		mainCategory,
		searchQuery,
		subcategory,
		sorting,
		results,
		favorite,
		setResults,
		setTotalPages,
		setSearchQuery,
	} = useStarboardStore();
	useEffect(() => {
		setLoading(true);
		// reset();
		const formData = {
			category: mainCategory,
			subcategory: subcategory,
			search: searchQuery,
			results_per_page: resultsPerPage,
			page_number: pageNumber,
			my_favorite: favorite,
		};
		setPageNumber(page ? Number(page) : 1);
		console.log(formData);
		getDataParams(`/starboard/${sorting}/`, null, formData).then((data) => {
			setResults(data.result_count);
			setTotalPages(data.total_pages);
			setProjects(data.results);
			setLoading(false);
		});
	}, [
		pageNumber,
		resultsPerPage,
		mainCategory,
		subcategory,
		sorting,
		favorite,
	]);
	useEffect(() => {
		setSearchQuery("");
	}, []);

	// useEffect(() => {
	// 	// reset();
	// 	const formData = {
	// 		category: englishToPersian[mainCategory],
	// 		subcategory: englishToPersian[subcategory],
	// 		search: searchQuery,
	// 		results_per_page: resultsPerPage,
	// 		page_number: pageNumber,
	// 	};
	// 	// console.log(`/starboard/${sorting}/`, formData);
	// 	setLoading(true);
	// 	getDataParams(`/starboard/${sorting}/`, null, formData).then((data) => {
	// 		setResults(data.results_count);
	// 		setProjects(data.results);
	// 		setLoading(false);
	// 	});
	// }, []);

	return (
		// <form
		// 	className="font-vazirmatn text-black w-[100vw]"
		// 	onSubmit={onSubmit}
		// >
		<div className="font-vazirmatn text-black w-[100vw]">
			<div className="flex justify-center items-center">
			<FilterSection setResultsPerPage={setResultsPerPage} />
</div>
			{loading ? (
				<Loading className="pt-20 pb-64 place-self-center" />
			) : (
				<></>
			)}
			{loading ? (
				<></>
			) : (
				<p className="rtl place-self-center text-center">
					{projects.length === 0
						? "هیچ استارت‌آپی یافت نشد"
						: `${results} استارت‌آپ یافت شد`}
				</p>
			)}
			<StartupPagination />
		</div>
		// </form>
	);
}

export default StarBoard;
