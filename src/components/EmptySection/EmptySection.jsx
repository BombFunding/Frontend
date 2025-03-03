import EmptyBox from "../../assets/EmptyBox.png";
import { Label } from "../ui/label";
function EmptySection({
  image,
  type,
  className,
  imageClassName,
  textClassName,
}) {
  return (
    <div className={`flex flex-col place-self-center place-content-center place-items-center w-full gap-5 p-10 ${className}`}>
      <img
        src={image ?? EmptyBox}
        className={`w-[10%] ${imageClassName}`}
      />
      <Label
        className={`text-2xl text-center ${textClassName} `}
      >{`هیچ ${type}ی وجود ندارد`}</Label>
    </div>
  );
}

export default EmptySection;
