import Header from "@editorjs/header";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import editorjsColumns from "@calumk/editorjs-columns";
import ToggleBlock from "editorjs-toggle-block";
import CodeTool from "@editorjs/code";
import BreakLine from "editorjs-break-line";

const uploadByFile = async (file) => {
  // Create a FormData object to send the image file
  const formData = new FormData();
  formData.append("image", file);

  try {
    // Send the POST request to your API
    const response = await postData("/projects/image/", formData, {
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

const ColumnTools = () => {
  return {
    code: CodeTool,
    breakLine: {
      class: BreakLine,
      inlineToolbar: true,
    },
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
    toggle: {
      class: ToggleBlock, // Replace with the actual toggle block class you're using
      config: {
        placeholder:
          "تغییر وضعیت خالی. برای اضافه کردن، بلوک‌ها را اینجا کلیک یا بکشید.",
        label: "تغییر وضعیت",
      },
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
};

export default ColumnTools;
