import { getData } from "@/Services/ApiClient/Services";
import { useEffect, useState } from "react";

const useProjectBox = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData("/projects/").then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);
  console.log("projects: ", projects);
  return { projects, loading };
};
export default useProjectBox;
