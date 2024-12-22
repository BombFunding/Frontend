import React, { useRef, useState } from "react";
import styles from "./Editor.module.scss";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import editorjsColumns from "@calumk/editorjs-columns";
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

const Editor = ({ id }) => {
  const steps = [
    {
      target: ".step1",
      content: "این یکه",
      placement: "top",
    },
    {
      target: ".custom-toolbar-plus", // The "+" button for adding new blocks
      content: "Click this button to add a new block to your editor.",
    },
  ];

  const [update, setUpdate] = useState(false);
  const { data, updateData } = useEditorStore();
  console.log(data);
  const editorRef = useRef(null);

  const uploadByFile = async (file) => {
    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Send the POST request to your API
      const response = await postData("/project/image/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      // The API should return the URL of the uploaded image
      const imageUrl = response.file.url;

      // Return the URL of the uploaded image
      return {
        success: 1,
        file: {
          url: imageUrl, // The URL returned by your API
        },
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      return {
        success: 0,
        error: "Image upload failed",
      };
    }
  };

  const columnTools = {
    header: {
      class: Header,
      config: {
        placeholder: "یک عنوان وارد کنید", // Placeholder text
        levels: [1, 2, 3, 4, 5, 6], // Available heading levels
        defaultLevel: 4, // Default heading level
      },
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true, // Enable inline toolbar for this tool
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      //   shortcut: "CMD+SHIFT+O",
      config: {
        quotePlaceholder: "Enter a quote",
        captionPlaceholder: "Quote's author",
      },
    },
    image: {
      class: ImageTool,
      config: {
        uploader: { uploadByFile },
        // captionPlaceholder: "Enter caption", // (Optional) Placeholder text for captions
        // buttonContent: "Select Image", // (Optional) Button text
      },
    },
  };

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const res = await getData(`/project/${id}/`);
        await updateData(res.page);
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
      data: data ?? { blocks: [], time: Date.now() },
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
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
            uploader: { uploadByFile },
            // captionPlaceholder: "Enter caption", // (Optional) Placeholder text for captions
            // buttonContent: "Select Image", // (Optional) Button text
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true, // Enable inline toolbar for this tool
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          //   shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "نقل قول را وارد کنید",
            captionPlaceholder: "نویسنده را وارد کنید",
          },
        },
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
      onReady: () => {
        const toolbarPlus = document.querySelector(".ce-toolbar__plus");
        toolbarPlus?.classList.add("custom-toolbar-plus"); // Add a custom class
      },
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
    console.log("id: ", id);
    console.log("data:", data);
    if (id == 0) {
      console.log("savedData in server: ", JSON.stringify(savedData));
      await updateData(savedData);
      postData(
        "/project/",
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
        })
        .catch((err) => {
          console.log(err);
          toast.error(<CustomToast Header="خطا در ذخیره پروژه" />);
        });
    } else {
      await updateData(savedData);
      patchData(
        `/project/${id}/`,
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
        })
        .catch((err) => {
          console.log(err);
          toast.error(<CustomToast Header="خطا در ذخیره پروژه" />);
        });
    }
    // setUpdate(!update);
  };

  return (
    <>
      {/* <Label className="p-8 text-3xl"> ویرایشگر</Label> */}
      {/* <Joyride
        steps={steps}
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
      <div className={`${styles.holder} step1`}>
        <Card id="editorjs" className={`${styles.editor}`}></Card>
        <button className={styles.save_btn} onClick={handelSave}>
          <SaveIcon className={styles.save_icon} />
          <span className={styles.save_txt}>ذخیره</span>
        </button>
      </div>
    </>
  );
};

export default Editor;
