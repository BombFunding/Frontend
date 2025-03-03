import EditorJS from "@editorjs/editorjs";
import EditorTools from "@/components/Editor/EditorTools";
import FaTranslation from "@/components/Editor/FaTranslation";
import { Card } from "@/components/ui/card";
import { getData } from "@/Services/ApiClient/Services";
import { useEffect, useState } from "react";
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
  className="w-full rtl shadow-top-bottom text-xl" id="editorjs"></Card>;
};

export default PageView;
