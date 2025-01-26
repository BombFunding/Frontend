import styles from "./ProjectBox.module.scss";
import ProjectItem from "../ProjectItem/ProjectItem";
import { useEffect } from "react";
import { Loading } from "@/components/Loading/Loading";
import useProjectBoxStore from "@/stores/ProjectStore/ProjectBoxStore";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { useNavigate } from "react-router-dom";

const ProjectBox = ({ className, type, add }) => {
  const Navigate = useNavigate();
  const { projects, loading, updateProjects } = useProjectBoxStore();
  const { username } = useProfileStore();
  useEffect(() => {
    updateProjects(username);
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
      <div className={styles.project_list}>
        {projects?.map((project, index) => (
          <ProjectItem
            header={project.image}
            name={project.name}
            add={false}
            key={index}
            onClick={() => {
              window.scrollTo(0, 0);
              Navigate(`/projectDashboard/${project.id}`);
            }}
          />
        ))}
        {add ? <ProjectItem add={add} /> : <></>}
      </div>
    </div>
  );
};

export default ProjectBox;
