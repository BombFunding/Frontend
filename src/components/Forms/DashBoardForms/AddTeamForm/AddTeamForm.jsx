import React from "react";
import styles from "./AddTeamForm.module.scss";
import formStyles from "../DashBoardForm.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddTeamForm = () => {
  return (
    <form className="flex flex-col gap-4 items-center font-vazirmatn m-5">
      <div className={formStyles.input_box}>
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
      </div>
      <Button>اضافه کردن</Button>
    </form>
  );
};

export default AddTeamForm;
