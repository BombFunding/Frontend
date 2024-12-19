import React, { useRef } from "react";
import styles from "./Editor.module.scss";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import editorjsColumns from "@calumk/editorjs-columns";
import FaTranslation from "./FaTranslation.js";
import { useEffect } from "react";
import useEditorStore from "@/stores/EditorStore/EditorStore";
import SaveIcon from "@mui/icons-material/Save";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import "./Editor.css";

const Editor = () => {
  const { data, updateData } = useEditorStore();
  console.log(data);
  const editorRef = useRef(null);
  const columnTools = {
    header: Header,
    paragraph: Paragraph,
    image: ImageTool,
  };
  useEffect(() => {
    console.log("effectdata: ", data);
    const editor = new EditorJS({
      holder: "editorjs",
      data: data ?? { blocks: [], time: Date.now() },
      tools: {
        header: Header,
        list: List,
        image: ImageTool,
        paragraph: Paragraph,
        columns: {
          class: editorjsColumns,
          config: {
            EditorJsLibrary: EditorJS, // Pass Editor.js instance
            tools: columnTools,
            i18n: FaTranslation(), // Pass tools to be used inside columns
          },
        },
      },
      i18n: FaTranslation(),
    });

    editorRef.current = editor;

    return () => {
      editor.isReady
        .then(() => editor.destroy())
        .catch((error) => console.log(error));
    };
  }, [data]);

  const handelSave = async () => {
    const savedData = await editorRef.current.save();
    //   editorRef.current.destroy();
    await updateData(savedData);
    console.log(savedData);
  };

  return (
    <>
      <Label className="p-8 text-3xl"> ویرایشگر</Label>
      <Card id="editorjs" className={styles.editor} />

      <button className={styles.save_btn} onClick={handelSave}>
        <SaveIcon className={styles.save_icon} />
        <span className={styles.save_txt}>ذخیره</span>
      </button>
    </>
  );
};

export default Editor;
