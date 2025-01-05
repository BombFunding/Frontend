import Editor from "@/components/Editor/Editor";
import EditorJS from "@editorjs/editorjs";
import EditorTools from "@/components/Editor/EditorTools";
import FaTranslation from "@/components/Editor/FaTranslation";
import { Card } from "@/components/ui/card";
import { getData } from "@/Services/ApiClient/Services";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useParams } from "react-router-dom";

const PageView = () => {
  const [data, setData] = useState(null);
  const { projectId } = useParams();
  useEffect(() => {
    getData(`/projects/detail/${projectId}/`).then((data) => {
      console.log("data", data)
      setData(data.page);
    });
  }, []);
  useEffect(() => {
    console.log("effectdata: ", data);
    if (data) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data: data,
        tools: EditorTools(),
        i18n: FaTranslation(),
        readOnly: true,
      });

      return () => {
        editor.isReady
          .then(() => editor.destroy())
          .catch((error) => console.log(error));
      };
    }
  }, [data]);
  return <Card
  className="w-[85vw] rtl shadow-top-bottom" id="editorjs"></Card>;
};

export default PageView;
