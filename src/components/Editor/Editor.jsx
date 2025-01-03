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
import JoyrideComponent from "./Joyride.jsx";
import ColumnTools from "./ColumnTools";
import EditorTools from "./EditorTools";

const Editor = () => {
  const { projectId } = useParams();
  const { updateProject } = useProjectStore();
  const { data, getData, saveData } = useEditorStore();
  const [update, setUpdate] = useState(false);
  const editorRef = useRef(null);
  const holderRef = useRef(null);
  const [run, setRun] = useState(data ? false : true);

  useEffect(() => {
    const fetchData = async () => {
      await updateProject(projectId);
      await getData(projectId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("effectdata: ", data);
    if (holderRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data: data,
        tools: EditorTools(),
        i18n: FaTranslation(),
      });

      editorRef.current = editor;
      return () => {
        editor.isReady
          .then(() => editor.destroy())
          .catch((error) => console.log(error));
      };
    }
  }, [data, update, editorRef]);

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
    saveData(savedData, projectId);
  };
  const handelDiscard = async () => {
    console.log("imupdating with id: ", projectId);
    await updateProject(projectId);
    getData(projectId);
  };

  return (
    <>
      <JoyrideComponent run={run} />
      <div className=" bg-[#FFF5E1]">
        <div className="pt-8 px-6 pb-4 StartTour">
          <Label className="text-3xl text-gray-600 "> :ویرایشگر</Label>
        </div>
        <div className={`${styles.holder}`}>
          <Card
            ref={holderRef}
            id="editorjs"
            className={`${styles.editor} EditorTour`}
          ></Card>
        </div>
        <div className="h-24 bg-blue-950 sticky bottom-0 right-0 left-0 z-[3] flex justify-center items-center gap-10">
          <button
            className="SaveTour btn bg-bomborange text-white hover:bg-white hover:text-black animate-kreep hover:animate-none"
            onClick={handelSave}
          >
            ذخیره
          </button>
          <button
            className="btn bg-bomborange text-white hover:bg-white hover:text-black hover:animate-none"
            onClick={handelDiscard}
          >
            فراموشی
          </button>
        </div>
      </div>
    </>
  );
};

export default Editor;
