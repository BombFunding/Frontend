import React from "react";
import styles from "./EditPositionForm.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditPositionForm = () => {
  return (
    <form className="flex flex-col gap-4 items-center font-vazirmatn m-5">
      <div className={styles.input_box}>
        <Label className={styles.label_style}>نام پوزیشن</Label>
        <Input className={styles.input_style}></Input>
      </div>
      <div className={styles.input_box}>
        <Label className={styles.label_style}>سرمایه مورد نیاز</Label>
        <Input className={styles.input_style}></Input>
      </div>
      <div className={styles.input_box}>
        <Label className={styles.label_style}>{"مدت زمان (روز)"}</Label>
        <Input
          type="number"
          className={styles.input_style}
          defaultValue={0}
        ></Input>
      </div>
      <Button>ثبت پوزیشن</Button>
    </form>
  );
};

export default EditPositionForm;
