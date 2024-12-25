import styles from "./ProjectBox.module.scss";
import ProjectItem from "../ProjectItem/ProjectItem";

const ProjectBox = ({ projects, className }) => {
	return (
		<div className={`${className} ${styles.box}`}>
			<div className={styles.project_list}>
				{projects?.map((project, index) => (
					<ProjectItem
						header={project.header}
						name={project.name}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default ProjectBox;
