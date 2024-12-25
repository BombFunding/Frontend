import Editor from "@/components/Editor/Editor";
import React from "react";
import { useParams } from "react-router-dom";
import PicHolder from "@/assets/picHolder.svg?react";

const ProjectEditor = () => {
  const { projectId } = useParams();
  return (
    <>
      <div className="text-3xl p-8 ">ویرایشگر</div>
      <PicHolder className="w-[100%] h-auto" />
      <Editor id={projectId} />
    </>
  );
};

export default ProjectEditor;
