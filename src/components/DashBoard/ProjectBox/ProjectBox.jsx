import styles from "./ProjectBox.module.scss";
import ProjectItem from "../ProjectItem/ProjectItem";
import EmptySection from "@/components/EmptySection/EmptySection";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import { use, useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import { Loading } from "@/components/Loading/Loading";

const ProjectBox = ({ className, type }) => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(null);
  const [updateProjects, setUpdateProjects] = useState(false);
  useEffect(() => {
    setLoading(true);
    getData("/projects/").then((data) => {
      console.log("projects:", data);
      setProjects(data);
      setLoading(false);
    });
  }, [updateProjects]);
  if (loading) {
    return (
      <div className={`${className} ${styles.box}`}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={`${className} ${styles.box}`}>
      {projects?.length > 0 ? (
        <div className={styles.project_list}>
          {projects?.map((project, index) => (
            <ProjectItem
              header={project.header}
              name={project.name}
              key={index}
            />
          ))}
        </div>
      ) : (
        <EmptySection type={type} />
      )}
      <button
        className="btn bg-bomborange text-white h-8"
        style={{ "min-height": "0px" }}
      >
        ساخت پروژه جدید
      </button>
    </div>
  );
};

export default ProjectBox;
