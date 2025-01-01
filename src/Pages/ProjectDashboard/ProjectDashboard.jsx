import Editor from "@/components/Editor/Editor";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UnderNavbar from "@/assets/UnderNavbar.svg?react";
import picture from "../../assets/baner.jpg";
import TypewriterComponent from "typewriter-effect";
import MetaBox from "@/components/ProjectDashboard/MetaBox/MetaBox";
import PositionBox from "@/components/ProjectDashboard/PositionBox/PositionBox";
import InvestorDialogBox from "@/components/ProjectDashboard/InvestorDialogBox/InvestorDialogBox";
import TagBox from "@/components/ProjectDashboard/TagBox/TagBox";
import styles from "./ProjectDashboard.module.scss";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";

const ProjectDashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { updateProject } = useProjectStore();
  useEffect(() => {
    updateProject(projectId);
  }, []);
  return (
    <>
      <div className={styles.full_page}>
        <div className={styles.typer}>
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
        <MetaBox
          className={"w-11/12 h-full md:h-[50vh] bg-white rounded-lg shadow-md"}
        />
        <PositionBox className={"w-11/12"} />
        <div className={styles.down_box}>
          <div className="flex flex-col gap-2 items-center w-full md:w-1/2">
            <div className="w-full flex justify-center items-center bg-bomborange rounded-lg shadow-md p-5">
              <button
                onClick={() => navigate(`/Editor/${projectId}`)}
                className="btn bg-white text-black hover:bg-black hover:text-white"
              >
                شخصی سازی پروژه
              </button>
            </div>
            <InvestorDialogBox
              className={
                "bg-white shadow-sm rounded-lg w-full flex justify-center items-center"
              }
            />
          </div>
          <TagBox
            className={"bg-white shadow-sm h-full rounded-lg md:w-1/2 w-full"}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectDashboard;
