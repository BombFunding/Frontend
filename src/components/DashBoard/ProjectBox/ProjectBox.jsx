import styles from "./ProjectBox.module.scss";
import ProjectItem from "../ProjectItem/ProjectItem";
import EmptySection from "@/components/EmptySection/EmptySection";

const ProjectBox = ({ projects, className, type, add }) => {
	return (
		<div className={`${className} ${styles.box}`}>
			{projects?.length > 0 ? (
				<div className={styles.project_list}>
					{projects?.map((project, index) => (
						<ProjectItem
							header={project.header}
							name={project.name}
							add={false}
							key={index}
						/>
					))}
					{add ? <ProjectItem add={add} /> : <></>}
				</div>
			) : (
				<EmptySection type={type} />
			)}
		</div>
	);
};

export default ProjectBox;
