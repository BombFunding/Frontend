import styles from "./ProjectsInvested.module.scss";
import { useEffect } from "react";
import { getData } from "@/Services/ApiClient/Services";
import { Loading } from "@/components/Loading/Loading";
import useProjectBoxStore from "@/stores/ProjectStore/ProjectBoxStore";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Label } from "recharts";
import EmptySection from "../EmptySection/EmptySection";

const InvestedItem = ({ header, className, onClick, amount }) => {
	return (
		<Card
			onClick={onClick}
			className={`rounded-lg shadow-lg w-[30vw] hover:cursor-pointer ${className}`}
		>
			<img src={header} className={styles.image} />
			<Label className={styles.text}>{name}</Label>
		</Card>
	);
};

const ProjectsInvested = ({ className }) => {
	const Navigate = useNavigate();
	const { projects, loading } = useProjectBoxStore();
	const { username } = useProfileStore();
	useEffect(() => {
		getData(`/invest/history/${username}/amount/`).then((data) => {
			console.log("history", data);
            
		});
	}, []);
	if (loading) {
		return (
			<div className={`${className} ${styles.box}`}>
				<Loading size={8} className="pt-16 pb-20" />
			</div>
		);
	}
	return (
		<div className={`${className} ${styles.box}`}>
            {console.log("projects", projects)}
			{projects?.length > 0 ? (
				<div className={styles.project_list}>
					{projects?.map((project, index) => (
						<InvestedItem
							header={project.image}
							name={project.name}
							add={false}
							key={index}
                            amount={project.investment_amount}
							onClick={() => {
								window.scrollTo(0, 0);
								Navigate(`/projects/${project.id}`);
							}}
						/>
					))}
				</div>
			) : (
				<EmptySection type={"پروژه‌ا"} />
			)}
		</div>
	);
};

export default ProjectsInvested;
