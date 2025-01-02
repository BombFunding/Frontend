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
	
	if (loading) return <Loading />;
	return (
		// <form
		// 	className="font-vazirmatn text-black w-[100vw]"
		// 	onSubmit={onSubmit}
		// >
		<div className="font-vazirmatn text-black">
			<FilterSection setResultsPerPage={setResultsPerPage} />
			<p className="rtl place-self-center">
				{projects.length === 0
					? "هیچ استارت‌آپی یافت نشد"
					: `${projects.length} استارت‌آپ یافت شد`}
			</p>
			<StartupPagination />
		</div>
		// </form>
	);
}

export default StarBoard;
