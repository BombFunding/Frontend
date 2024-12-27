import Editor from "@/components/Editor/Editor";
import React from "react";
import { useParams } from "react-router-dom";
import UnderNavbar from "@/assets/UnderNavbar.svg?react";
import TypewriterComponent from "typewriter-effect";
import MetaBox from "@/components/ProjectDashboard/MetaBox/MetaBox";
import PositionBox from "@/components/DashBoard/Sections/PositionBox/PositionBox";
import InvestorDialogBox from "@/components/ProjectDashboard/InvestorDialogBox/InvestorDialogBox";
import TagBox from "@/components/ProjectDashboard/TagBox/TagBox";

const ProjectEditor = () => {
  const { projectId } = useParams();
  return (
    <>
      <div className="min-h-screen bg-[#FFF5E1] relative flex flex-col gap-5 items-center justify-start rtl">
        <div className="relative rounded-lg mt-5 p-5 w-11/12 shadow-sm bg-bomborange text-white">
          <TypewriterComponent
            options={{
              typeSpeed: 120,
              deleteSpeed: 120,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("سلام دوست خوبم، به داشبورد پروژه خوش اومدی :)")
                .pauseFor(1000)
                .deleteAll()
                .typeString("اینجا قراره یچیز بمب درست کنیم !!!")
                .pauseFor(1000)
                .deleteAll()
                .typeString(
                  "پس بزن بریم :) رو این دکمه هه بزن اگه توضیحات بیشتری میخوای ==>"
                )
                .start()
                .callFunction(() => {
                  console.log("String typed out!");
                });
            }}
          />
        </div>
        <MetaBox className={"w-11/12 bg-white rounded-lg shadow-md"} />
        <PositionBox className={"w-11/12"} />
        <div className="w-11/12 flex justify-center items-center bg-bomborange rounded-lg shadow-md p-5">
          <button className="btn bg-white text-black hover:bg-black hover:text-white">
            شخصی سازی پروژه
          </button>
        </div>
        <div className="w-11/12 flex justify-between items-center gap-5">
          <InvestorDialogBox
            className={"bg-white shadow-sm rounded-lg w-1/2 flex justify-center items-center"}
          />
          <TagBox className={"bg-white shadow-sm rounded-lg w-1/2"} />
        </div>
      </div>
    </>
  );
};

export default ProjectEditor;
