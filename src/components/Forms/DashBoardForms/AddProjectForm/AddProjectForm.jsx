import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { DrawerDialog } from "@/components/Custom/DrawerDialog/DrawerDialog";
import { postData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import { use } from "react";
import useProjectBox from "@/hooks/StartupDashboard/ProjectBoxHook";
import useProjectBoxStore from "@/stores/ProjectStore/ProjectBoxStore";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const AddProjectForm = ({ addProjectCard }) => {
  const { updateProjects } = useProjectBoxStore();
  const {username} = useProfileStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    postData("/projects/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log("Response:", response);
      updateProjects(username);
      toast.success("پروژه با موفقیت اضافه شد");
    });
  };

  return (
    <>
      <DrawerDialog
        title={"پروژه جدید"}
        closeButton={
          <button
            type="submit"
            className="btn bg-bomborange text-white h-8"
            style={{ "min-height": "0px" }}
          >
            بستن
          </button>
        }
        triggerButton={addProjectCard}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 flex flex-col items-center gap-5"
        >
          <CustomInput
            holderClassName={"w-full"}
            inputClassName={"w-full"}
            name={"name"}
            register={register}
            placeholder={"نام پروژه"}
          />
          <CustomTextArea
            holderClassName={"w-full"}
            inputClassName={"w-full h-32"}
            name={"description"}
            register={register}
            placeholder={"توضیحات"}
          />
          <button
            type="submit"
            className="btn bg-bomborange text-white h-8"
            style={{ "min-height": "0px" }}
          >
            ثبت اطلاعات
          </button>
        </form>
      </DrawerDialog>
    </>
  );
};

export default AddProjectForm;
