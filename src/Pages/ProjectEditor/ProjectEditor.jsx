import Editor from "@/components/Editor/Editor";
import React from "react";
import { useParams } from "react-router-dom";

const ProjectEditor = () => {
  const { projectId } = useParams();
  return (
    <>
      <div className="text-3xl p-8 ">ویرایشگر</div>
      <Editor id={projectId} />
    </>
  );
};

export default ProjectEditor;
