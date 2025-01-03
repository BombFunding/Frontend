import StartupCard from "../StartupCard/StartupCard";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "@/components/ui/pagination";
import styles from "./StartupPagination.module.scss";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function StartupPagination() {
	const Navigate = useNavigate();
	const {
		pageNumber,
		setPageNumber,
		loading,
		setLoading,
		projects,
		pages,
		results,
		resultsPerPage,
		totalPages,
	} = useStarboardStore();
	const [loadedImagesCount, setLoadedImagesCount] = useState(0);
	const handleImageLoad = () => {
		setLoadedImagesCount((prev) => prev + 1);
	};
	useEffect(() => {
		if (
			projects &&
			projects.length > 0 &&
			loadedImagesCount === projects.length
		) {
			setLoading(false);
		}
		console.log(totalPages);
	}, [loadedImagesCount, projects]);

	return (
		!loading && (
			<>
				<div className="m-[1vw] p-[1vw] grid grid-cols-3 justify-center place-items-center items-start gap-x-4 gap-y-2 rtl">
					{projects?.map((project, index) => (
						<StartupCard
							name={project.name}
							id={project.id}
							image={project.image}
							description={project.description}
							likeCount={project.like_count}
							subcategories={project.subcategories}
							key={index}
							onImageLoad={handleImageLoad}
						/>
					))}
				</div>
				{projects.length > 0 && (
					<div className="m-[2vw] transition-all duration-300">
						<Pagination>
							<PaginationContent className="rtl">
								{pageNumber !== 1 && (
									<PaginationItem>
										<PaginationLink
											className="px-[1.5vw] hover:cursor-pointer"
											onClick={() => {
												Navigate(
													`/starboard/${
														pageNumber - 1
													}`
												);
												setPageNumber(pageNumber - 1);
											}}
										>
											<SlArrowRight />
										</PaginationLink>
									</PaginationItem>
								)}
								{pages.map(
									(page, index) =>
										pageNumber + page > 0 &&
										pageNumber + page <= totalPages && (
											<PaginationItem key={index}>
												<PaginationLink
													onClick={() => {
														Navigate(
															`/starboard/${
																pageNumber +
																page
															}`
														);
														setPageNumber(
															pageNumber + page
														);
													}}
													isActive={page === 0}
													className={`hover:cursor-pointer ${
														page === 0 &&
														styles.current
													}`}
												>
													{pageNumber + page}
												</PaginationLink>
											</PaginationItem>
										)
								)}
								{pageNumber !== totalPages && (
									<PaginationItem>
										<PaginationLink
											className="px-[1.5vw] hover:cursor-pointer"
											onClick={() => {
												Navigate(
													`/starboard/${
														pageNumber + 1
													}`
												);
												setPageNumber(pageNumber + 1);
											}}
										>
											<SlArrowLeft />
										</PaginationLink>
									</PaginationItem>
								)}
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</>
		)
	);
}

export default StartupPagination;
