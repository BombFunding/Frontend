import AddProjectForm from "@/components/Forms/DashBoardForms/AddProjectForm/AddProjectForm";
import styles from "./ProjectItem.module.scss";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const ProjectItem = ({ header, name, add, className, onClick }) => {
  if (add)
    return (
      <>
        <AddProjectForm
          addProjectCard={
            <Card
              className={`rounded-lg shadow-lg w-[30vw] h-full place-content-center text-gray-400 bg-gray-200 hover:cursor-pointer min-h-[150px] ${className}`}
            >
              <Label
                className={`text-[2vw] place-self-center place-content-center place-items-center flex flex-col h-full`}
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
