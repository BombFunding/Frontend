import ProjectItem from "../ProjectItem/ProjectItem";
import EmptySection from "@/components/EmptySection/EmptySection";
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import { Loading } from "@/components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import styles from "./Bookmarks.module.scss";
const Bookmarks = ({ className, type }) => {
	const Navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		setLoading(true);
		getData(`/bookmark/`).then((data) => {
			console.log("bookmark", data);
			setProjects(data);
			setLoading(false);
		});
	}, []);
	if (loading) {
		return (
			<div className={`${className} ${styles.box}`}>
				<Loading size={8} className="pt-[8vh] pb-[11vh] place-self-center" />
			</div>
		);
	}
	return (
		<div className={`${className} ${styles.box}`}>
			{projects?.length > 0 ? (
				<div className={styles.project_list}>
					{projects?.map((project, index) => (
						<ProjectItem
							header={`http://104.168.46.4:8000${project.project_header_picture}`}
							name={project.project_name}
							add={false}
							key={index}
							onClick={() => {
								window.scrollTo(0, 0);
								Navigate(`/projects/${project.project_id}`);
							}}
						/>
					))}
				</div>
			) : (
				<EmptySection type={type} />
			)}
		</div>
	);
};

export default Bookmarks;
