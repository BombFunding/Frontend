import React, { useRef } from "react";
import styles from "./MetaBox.module.scss";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { Label } from "@/components/ui/label";
import IMG from "@/assets/A1.jpg";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { DrawerDialog } from "@/components/Custom/DrawerDialog/DrawerDialog";
import Button from "@/components/EditButton/EditButton";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const MetaBox = ({ className }) => {
  const fileInputRef = useRef(null);
  const [bannerFile, setBannerFile] = React.useState(null);

  const handleBannerClick = () => {
    fileInputRef.current.click();
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerFile(reader.result);
        const formData = new FormData();
        formData.append("header_picture", file);
        // setImageLoading(true);
        const toastId = toast.success(
          // <ErrorMessage message={"بنر در حال بروزرسانی ..."} />,
          <CustomToast Header="بنر در حال بروزرسانی ..." />,
          {
            autoClose: 20000,
          }
        );
        // postImageData("/auth/update_baseuser_profile/", formData)
        //   .then((res) => {
        //     console.log("Image posted successfully:", res);
        //     setImageLoading(false);
        //     toast.dismiss(toastId);
        //     toast.success(
        //       // <ErrorMessage
        //       // 	message={"بنر با موفقیت بروزرسانی شد"}
        //       // />
        //       <CustomToast Header="بنر با موفقیت بروزرسانی شد" />
        //     );
        //   })
        //   .catch((err) => {
        //     console.log("Image posting FAILED:", err);
        //     setImageLoading(false);
        //     toast.dismiss(toastId);
        //     toast.error(
        //       // <ErrorMessage message={"بنر بروزرسانی نشد"} />
        //       <CustomToast Header="بنر بروزرسانی نشد" />
        //     );
        //   });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={`overflow-hidden flex flex-col md:flex-row-reverse justify-between ${className}`}>
        <div className="w-full md:w-3/5 relative flex justify-end">
          <img
            src={bannerFile}
            alt="project image"
            className="h-full aspect-[16/9] object-cover"
          />
          <button
            className={`${styles.btn} btn h-6 rounded-full bg-bomborange text-white absolute bottom-5 left-5`}
            onClick={handleBannerClick}
          >
            تغییر
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }} // Hide the file input element
            ref={fileInputRef} // Attach input to useRef
            onChange={handleBannerChange} // Handle file selection
          />
        </div>
        <div className="w-full md:w-2/5 p-5 flex flex-col justify-evenly items-center relative">
          <Label className="w-full text-right">نام پروژه</Label>
          <Label className="w-full text-right mb-6">توضیحات</Label>
          <div className="absolute bottom-4">
            <DrawerDialog
              triggerButton={
                <button
                  className={`${styles.btn} h-8 btn bg-bomborange text-white`}
                >
                  ویرایش
                </button>
              }
              closeButton={
                <button
                  className={`${styles.btn} h-6 btn bg-bomborange text-white`}
                >
                  بستن
                </button>
              }
            >
              <div className="m-5">hello</div>
            </DrawerDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default MetaBox;
