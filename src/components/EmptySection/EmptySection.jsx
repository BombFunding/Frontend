import EmptyBox from "../../assets/EmptyBox.png";
import { Label } from "../ui/label";
import styles from "./EmptySection.module.scss";
function EmptySection({
  image,
  type,
  className,
  imageClassName,
  textClassName,
}) {
  return (
    <div className={`${className} ${styles.container}`}>
      <img
        src={image ?? EmptyBox}
        className={`${imageClassName} ${styles.image}`}
      />
      <Label
        className={`${textClassName} ${styles.text}`}
      >{`هیچ ${type}ی وجود ندارد`}</Label>
    </div>
  );
}

export default EmptySection;
