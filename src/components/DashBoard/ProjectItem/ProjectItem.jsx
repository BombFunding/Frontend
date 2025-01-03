import AddProjectForm from "@/components/Forms/DashBoardForms/AddProjectForm/AddProjectForm";
import styles from "./ProjectItem.module.scss";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ProjectItem = ({ header, name, add, className, onClick }) => {
	if (add)
		return (
			<AddProjectForm
				addProjectCard={
					<Card
						className={`rounded-lg shadow-lg w-[30vw] h-full place-content-center text-gray-400 bg-gray-200 hover:cursor-pointer ${className}`}
					>
						<Label
							className={`text-[2vw] place-self-center place-content-center place-items-center flex flex-col`}
						>
							<p>+</p>
							<p>پروژه جدید</p>
						</Label>
					</Card>
				}
			/>
		);
	return (
		<Card
			className={`rounded-lg shadow-lg w-[30vw] hover:cursor-pointer ${className}`}
			onClick={onClick}
		>
			<img src={header} className={styles.image} />
			<Label className={styles.text}>{name}</Label>
		</Card>
	);
};

export default ProjectItem;
