import React, { useRef, useState } from "react";
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
  const [update, setUpdate] = useState(false);
  const { data, updateData } = useEditorStore();
  console.log(data);
  const editorRef = useRef(null);
  const columnTools = {
    header: {
      class: Header,
      config: {
        placeholder: "یک عنوان وارد کنید", // Placeholder text
        levels: [1, 2, 3, 4, 5, 6], // Available heading levels
        defaultLevel: 4, // Default heading level
      },
    },
    paragraph: Paragraph,
    image: ImageTool,
  };
  useEffect(() => {
    console.log("effectdata: ", data);
    const editor = new EditorJS({
      holder: "editorjs",
      data: data ?? { blocks: [], time: Date.now() },
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "یک عنوان وارد کنید", // Placeholder text
            levels: [1, 2, 3, 4, 5, 6], // Available heading levels
            defaultLevel: 3, // Default heading level
          },
        },
        list: List,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              // Provide the endpoint for image upload
              byFile:
                "http://104.168.46.4:8000/profilepage/startup_image/{startup_profile_id}", // URL for file upload
              //   byUrl: "https://example.com/fetchUrl", // (Optional) URL to fetch image by URL
            },
            field: "file", // (Optional) Form field name for the file
            additionalRequestHeaders: {
              // (Optional) Add any headers your API requires
              Authorization: "Bearer YOUR_TOKEN",
            },
            captionPlaceholder: "Enter caption", // (Optional) Placeholder text for captions
            buttonContent: "Select Image", // (Optional) Button text
          },
        },
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
  }, [data, update]);

  const handelSave = async () => {
    const savedData = await editorRef.current.save();
    //   editorRef.current.destroy();
    await updateData(savedData);
    console.log("finish", savedData);
    // setUpdate(!update);
  };

  return (
    <>
      <Label className="p-8 text-3xl"> ویرایشگر</Label>
      <div className={styles.holder}>
        <Card id="editorjs" className={styles.editor}></Card>
        <button className={styles.save_btn} onClick={handelSave}>
          <SaveIcon className={styles.save_icon} />
          <span className={styles.save_txt}>ذخیره</span>
        </button>
      </div>
    </>
  );
};

export default Editor;
