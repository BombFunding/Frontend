import styles from "./ProjectsInvested.module.scss";
import { useEffect } from "react";
import { getData } from "@/Services/ApiClient/Services";
import { Loading } from "@/components/Loading/Loading";
import useProjectBoxStore from "@/stores/ProjectStore/ProjectBoxStore";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Label } from "@/components/ui/label";
import EmptySection from "../EmptySection/EmptySection";
import toman from "../../assets/toman.png";

const InvestedItem = ({ header, className, onClick, amount, name }) => {
	return (
		<Card
			onClick={onClick}
			className={`rounded-lg shadow-lg w-[30vw] hover:cursor-pointer ${className}`}
		>
			<img src={header} className={styles.image} />
			<Label className={styles.text}>{name}</Label>
			<div className="flex pb-2 place-self-center gap-1">
				<img
					src={toman}
					className="w-8 h-auto lg:w-10 place-self-center mb-[0.4vw]"
				/>
                <Label className="text-lg">{amount}</Label>
			</div>
		</Card>
	);
};

const ProjectsInvested = ({ className }) => {
	const Navigate = useNavigate();
	const { projects, setProjects, loading } = useProjectBoxStore();
	const { username } = useProfileStore();
	useEffect(() => {
		getData(`/invest/history/${username}/amount/`).then((data) => {
			console.log("history", data);
			setProjects(data);
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
			{projects?.length > 0 ? (
				<div className={styles.project_list}>
					{projects?.map((item, index) => (
						<InvestedItem
							header={`https://bombfundingbackend.liara.run${item.project.image}`}
							name={item.project.name}
							key={index}
							amount={item.investment_amount}
							onClick={() => {
								window.scrollTo(0, 0);
								Navigate(`/projects/${item.project.id}`);
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
