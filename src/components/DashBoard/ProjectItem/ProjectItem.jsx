import styles from "./ProjectItem.module.scss";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ProjectItem = ({ header, name }) => {
	return (
		<Card className={styles.container}>
			<img src={header} className={styles.image} />
			<Label className="p-[2vw] flex place-self-center text-center text-xl">
				{name}
			</Label>
		</Card>
	);
};

export default ProjectItem;
