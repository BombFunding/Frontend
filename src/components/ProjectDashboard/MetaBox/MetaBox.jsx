import React, { useEffect, useRef } from "react";
import styles from "./MetaBox.module.scss";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { Label } from "@/components/ui/label";
import IMG from "@/assets/A1.jpg";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { DrawerDialog } from "@/components/Custom/DrawerDialog/DrawerDialog";
import Button from "@/components/EditButton/EditButton";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import MetaForm from "@/components/Forms/ProjectDashboardForms/MetaForm/MetaForm";
import Likes from "@/components/Likes/Likes";
import Baner from "../../../assets/baner.jpg";
import { getData, patchData, postData } from "@/Services/ApiClient/Services";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MetaBox = ({ className }) => {
  const fileInputRef = useRef(null);
  // const [bannerFile, setBannerFile] = React.useState(Baner);
  const { projectName, description, image, updateProject } = useProjectStore();
  const [closer, setCloser] = React.useState(false);
  const { projectId } = useParams();

  const handleBannerClick = () => {
    fileInputRef.current.click();
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // setBannerFile(reader.result);
        const formData = new FormData();
        formData.append("image", file);
        // setImageLoading(true);
        const toastId = toast(
          // <ErrorMessage message={"بنر در حال بروزرسانی ..."} />,
          <CustomToast Header="بنر در حال بروزرسانی ..." />,
          {
            autoClose: 20000,
          }
        );
        patchData(`/projects/${projectId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            console.log("Image posted successfully:", res);
            updateProject(projectId);
            toast.dismiss(toastId);
            toast.success(
              // <ErrorMessage
              // 	message={"بنر با موفقیت بروزرسانی شد"}
              // />
              <CustomToast Header="بنر با موفقیت بروزرسانی شد" />
            );
          })
          .catch((err) => {
            console.log("Image posting FAILED:", err);
            toast.dismiss(toastId);
            toast.error(
              // <ErrorMessage message={"بنر بروزرسانی نشد"} />
              <CustomToast Header="بنر بروزرسانی نشد" />
            );
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className={`overflow-hidden flex flex-col md:flex-row-reverse justify-between ${className}`}
      >
        <div className="w-full md:w-3/5 relative flex justify-end">
          <img
            src={image}
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
          <div className="w-full text-right flex gap-3">
            <Label className="text-xl text-black">{projectName}</Label>
            {/* <Label className="place-self-center text-base">
							یک دو سه چهار
						</Label> */}
          </div>
          <div className="w-full text-right mb-6 flex gap-3">
            <Label className="text-xl text-black">توضیحات</Label>
            <Label className="place-self-center">{description}</Label>
          </div>
          <div className="absolute bottom-4 flex">
            {/* <Likes /> */}
            <DrawerDialog
              open={closer}
              onOpenChange={setCloser}
              title={"ویرایش اطلاعات پروژه"}
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
              <MetaForm setClose={setCloser} />
            </DrawerDialog>
            <Likes
              className="z-[10] translate-x-[-23vw] translate-y-[-1vw]"
              count={10}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MetaBox;
