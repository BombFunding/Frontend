import React, { useRef, useState } from "react";
import styles from "./Editor.module.scss";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import editorjsColumns from "@calumk/editorjs-columns";
import ToggleBlock from "editorjs-toggle-block";
import CodeTool from "@editorjs/code";
import BreakLine from "editorjs-break-line";
import FaTranslation from "./FaTranslation.js";
import { useEffect } from "react";
import useEditorStore from "@/stores/EditorStore/EditorStore";
import SaveIcon from "@mui/icons-material/Save";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import "./Editor.css";
import { getData, patchData, postData } from "@/Services/ApiClient/Services";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../Custom/CustomToast/CustomToast";
import Joyride from "react-joyride";
import { useParams } from "react-router-dom";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import JoyrideSteps from "./JoyrideSteps";
import ColumnTools from "./ColumnTools";
import EditorTools from "./EditorTools";

const Editor = () => {
  const { projectId } = useParams();
  const { page: data, updateProject } = useProjectStore();

  const [update, setUpdate] = useState(false);
  const editorRef = useRef(null);
  const pBoxRef = useRef(null);

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const res = await getData(`/projects/${projectId}/`);
        // await updateData(res.page);
        console.log("sucessfully got data from server", res.page);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getDataFromServer();
  }, []);

  useEffect(() => {
    console.log("effectdata: ", data);
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      data: data ?? { blocks: [], time: Date.now() },
      tools: EditorTools(),
      i18n: FaTranslation(),
    });

    editorRef.current = editor;

    return () => {
      editor.isReady
        .then(() => editor.destroy())
        .catch((error) => console.log(error));
    };
  }, [data, update]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent the browser's default save behavior
        handelSave();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handelSave = async () => {
    const savedData = await editorRef.current.save();
    //   editorRef.current.destroy();
    console.log("id: ", projectId);
    console.log("data:", data);

    // await updateData(savedData);
    patchData(
      `/projects/${projectId}/`,
      { page: JSON.stringify(savedData) },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        console.log("finish", res);
        toast.success(<CustomToast Header="پروژه با موفقیت ذخیره شد" />);
        updateProject(projectId);
      })
      .catch((err) => {
        console.log(err);
        toast.error(<CustomToast Header="خطا در ذخیره پروژه" />);
      });

    // setUpdate(!update);
  };

  // const handleJoyrideCallback = (data) => {
  //   const { action, index, type } = data;

  //   if (type === "step:after" && index === 0 && action === "next") {
  //     // editorRef.current.focus();
  //     // editorRef.current.render();
  //     const editorHolder = document.getElementById("editorjs");
  //     if (editorHolder) {
  //       editorHolder.click(); // Trigger a click event
  //     }
  //     else
  //     {
  //       console.log("editorHolder not found");
  //     }
  //   }
  // };

  return (
    <>
      {/* <Label className="p-8 text-3xl"> ویرایشگر</Label> */}
      {/* <Joyride
        steps={steps}
        callback={handleJoyrideCallback}
        continuous
        scrollToFirstStep
        // showProgress
        showSkipButton
        scrollOffset={120}
        locale={{
          back: "قبلی",
          close: "بستن",
          last: "پایان",
          next: "بعدی",
          skip: "رد کردن",
        }}
        styles={{
          options: {
            arrowColor: "rgba(0, 0, 0, 0.5)",
            backgroundColor: "#333",
            textColor: "#fff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            fontFamily: "vazirmatn",
            zIndex: 1000,
          },
          buttonNext: {
            backgroundColor: "#FF7517",
            fontFamily: "vazirmatn",
          },
          buttonBack: {
            color: "#FF7517",
            fontFamily: "vazirmatn",
          },
        }}
      /> */}
      <div className=" bg-[#FFF5E1]">
        <div className={`${styles.holder}`}>
          <Card id="editorjs" className={`${styles.editor} step1`}></Card>
          {/* <button className={styles.save_btn} onClick={handelSave}>
            <SaveIcon className={styles.save_icon} />
            <span className={styles.save_txt}>ذخیره</span>
          </button> */}
        </div>
        <div className="h-24 bg-blue-950 sticky bottom-0 right-0 left-0 z-20 flex justify-center items-center gap-10">
          <button
            className="btn bg-bomborange text-white hover:bg-white hover:text-black animate-kreep hover:animate-none"
            onClick={handelSave}
          >
            save
          </button>
          <button>discard</button>
        </div>
      </div>
    </>
  );
};

export default Editor;
