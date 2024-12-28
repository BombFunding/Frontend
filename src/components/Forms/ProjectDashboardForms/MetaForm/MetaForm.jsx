import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const MetaForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <form
      className="w-full flex flex-col justify-evenly gap-5 items-center"
      onSubmit={handleSubmit(onSubmit)}
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
        className="btn bg-bomborange text-white h-6"
        style={{ "min-height": "0px" }}
      >
        ثبت اطلاعات
      </button>
    </form>
  );
};

export default MetaForm;
