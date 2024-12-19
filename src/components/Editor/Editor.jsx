import React from "react";
import styles from "./Editor.module.scss";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import editorjsColumns from "@calumk/editorjs-columns";
import FaTranslation from "./FaTranslation.js";
import { useEffect } from "react";

const Editor = () => {
  const columnTools = {
    header: Header,
    paragraph: Paragraph,
    image: ImageTool,
  };
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
        image: ImageTool,
        paragraph: Paragraph,
        columns: {
          class: editorjsColumns,
          config: {
            EditorJsLibrary: EditorJS, // Pass Editor.js instance
            tools: columnTools, // Pass tools to be used inside columns
          },
        },
      },
      data: {
        time: Date.now(),
      },
      i18n: FaTranslation(),
    });
  }, []);

  return (
    <>
      <div id="editorjs" className={styles.editor} />
    </>
  );
};

export default Editor;
