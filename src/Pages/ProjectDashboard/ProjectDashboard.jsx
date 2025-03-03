import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaBox from "@/components/ProjectDashboard/MetaBox/MetaBox";
import PositionBox from "@/components/ProjectDashboard/PositionBox/PositionBox";
import InvestorDialogBox from "@/components/ProjectDashboard/InvestorDialogBox/InvestorDialogBox";
import TagBox from "@/components/ProjectDashboard/TagBox/TagBox";
import styles from "./ProjectDashboard.module.scss";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import Error403 from "../Error/Error403/Error403";
import { Loading } from "@/components/Loading/Loading";
import MainChart from "@/components/BarChart/MainChart";

const ProjectDashboard = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const { updateProject, error, setLoading, loading } = useProjectStore();
	useEffect(() => {
		setLoading(true);
		updateProject(projectId);
		window.scrollTo(0, 0);
	}, []);
	if (error) return <Error403 />;
	if (loading) return <Loading className="pt-52 pb-64 place-self-center" />;
	return (
		<>
			<div className="justify-center items-center flex flex-col">
				<div className={styles.full_page}>
					<div></div>
					<MetaBox
						className={
							"w-11/12 h-full md:h-[50vh] bg-white rounded-lg shadow-top-bottom"
						}
					/>
					<PositionBox className={"w-11/12"} />
					<div
						className={styles.down_box}
					>
						<div className="flex flex-col gap-2 items-center w-full md:w-1/2">
							<div className="w-full flex justify-center items-center bg-bomborange rounded-lg shadow-md p-5">
								<button
									onClick={() => {
										window.scrollTo(0, 0);
										navigate(`/Editor/${projectId}`);
									}}
									className="btn bg-white text-black hover:bg-black hover:text-white"
								>
									شخصی سازی پروژه
								</button>
							</div>
							<InvestorDialogBox
								projectId={projectId}
								className={
									"bg-white shadow-top-bottom rounded-lg w-full flex justify-center items-center"
								}
							/>
						</div>
						<TagBox
							dashboard={true}
							className={
								"bg-white shadow-top-bottom h-full rounded-lg md:w-1/2 w-full min-h-[133px]"
							}
						/>
					</div>
					<MainChart
						projectId={projectId}
						className="w-11/12 mb-6"
						color={"#FF7517"}
						label="fund"
						apiEndpoints={{
							"30d": `/profile_statics/project/${projectId}/fund/last-30-days/`,
							"90d": `/profile_statics/project/${projectId}/fund/last-90-days/`,
							"365d": `/profile_statics/project/${projectId}/fund/last-year/`,
						}}
					/>
					<MainChart
						projectId={projectId}
						className="w-11/12 mb-6"
						color={"#FF0000"}
						label="like"
						apiEndpoints={{
							"30d": `/profile_statics/project/${projectId}/last-30-days/`,
							"90d": `/profile_statics/project/${projectId}/last-90-days/`,
							"365d": `/profile_statics/project/${projectId}/last-year/`,
						}}
					/>
					<MainChart
						projectId={projectId}
						className="w-11/12 mb-6"
						color={"#0000FF"}
						label="view"
						apiEndpoints={{
							"30d": `/profile_statics/project/${projectId}/last-30-days/`,
							"90d": `/profile_statics/project/${projectId}/last-90-days/`,
							"365d": `/profile_statics/project/${projectId}/last-year/`,
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default ProjectDashboard;
