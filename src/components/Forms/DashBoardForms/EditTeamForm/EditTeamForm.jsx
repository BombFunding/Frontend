import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import formStyles from "../DashBoardForm.module.scss";
import styles from "./EditTeamForm.module.scss";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";

const EditTeamForm = () => {
  return (
    <form className="flex flex-col gap-4 items-center font-vazirmatn m-5">
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="نقش عضو در تیم"
      />
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="توضیحات"
      />
      {/* <div className={formStyles.input_box}>
        <Label className={formStyles.label_style}>نقش عضو در تیم</Label>
        <Input className={formStyles.input_style}></Input>
      </div>
      <div className={formStyles.input_box}>
        <Label className={formStyles.label_style}>توضیحات</Label>
        <Textarea className={formStyles.input_style}></Textarea>
      </div> */}
      <Button>ثبت تغییرات</Button>
    </form>
  );
};

export default EditTeamForm;
