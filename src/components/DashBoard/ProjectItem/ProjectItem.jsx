import AddProjectForm from "@/components/Forms/DashBoardForms/AddProjectForm/AddProjectForm";
import styles from "./ProjectItem.module.scss";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProjectItem = ({ header, name, add, className, onClick }) => {
	const [open, setOpen] = useState(false);
	if (add)
		return (
			<>
				<AddProjectForm
        setOpen={setOpen}
        open={open}
					addProjectCard={
						<Card
							onClick={() => {
								setOpen(true);
							}}
							className={`rounded-lg shadow-lg w-[30vw] h-full place-content-center text-gray-400 bg-gray-200 hover:cursor-pointer min-h-[250px] ${className}`}
						>
							<Label
								className={`text-[2vw] place-self-center place-content-center place-items-center flex flex-col h-full min-h-14 hover:cursor-pointer`}
							>
								<p>+</p>
								<p>پروژه جدید</p>
							</Label>
						</Card>
					}
				/>
			</>
		);
	return (
		<Card
			onClick={onClick}
			className={`rounded-lg shadow-lg w-[30vw] hover:cursor-pointer min-h-14 ${className}`}
		>
			<img src={header} className={styles.image} />
			<Label className={styles.text}>{name}</Label>
		</Card>
	);
};

export default ProjectItem;
