import React from "react";
import styles from "./AddTeamForm.module.scss";
import formStyles from "../DashBoardForm.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getData, postData } from "@/Services/ApiClient/Services";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  description: Yup.string().required("Name is required"),
  role: Yup.string().required("Email is required"),
});
const AddTeamForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { profileId } = useProfileStore((state) => state);
  const onSubmit = (data) => {
    console.log(data);
    const bodyData = {
      username: data.username,
      role: data.role,
      description: data.description,
    };
    console.log("bodyData: ", bodyData);
    // console.log("ProfileManager: ", ProfileManager);
    postData(`/startup/profile/${profileId}/team/add/`, bodyData)
      .then((res) => {
        console.log(res);
        getData(`/startup/profile/${profileId}/team/list`).then((res) => {
          console.log("team list: ", res);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form
      className="flex flex-col gap-4 items-center font-vazirmatn m-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="نام کاربری"
        register={register}
        name={"username"}
      />
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="نقش عضو در تیم"
        register={register}
        name={"role"}
      />
      <CustomTextArea
        inputClassName={"w-[60vw] text-right"}
        placeholder="توضیحات"
        register={register}
        name={"description"}
      />
      {/* <div className={formStyles.input_box}>
        <Label className={formStyles.label_style}>نام کاربری</Label>
        <Input className={formStyles.input_style}></Input>
      </div>
      <div className={formStyles.input_box}>
        <Label className={formStyles.label_style}>نقش عضو در تیم</Label>
        <Input className={formStyles.input_style}></Input>
      </div>
      <div className={formStyles.input_box}>
        <Label className={formStyles.label_style}>توضیحات</Label>
        <Textarea className={formStyles.input_style}></Textarea>
      </div> */}
      <Button>اضافه کردن</Button>
    </form>
  );
};

export default AddTeamForm;
