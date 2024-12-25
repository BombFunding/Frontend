import EmptyBox from "../../assets/EmptyBox.png";
import { Label } from "../ui/label";
import styles from "./EmptySection.module.scss";
function EmptySection({ image, type }) {
	return (
		<div className={styles.container}>
			<img src={image ?? EmptyBox} className={styles.image} />
			<Label className={styles.text}>{`هیچ ${type}ی وجود ندارد`}</Label>
		</div>
	);
}

export default EmptySection;
