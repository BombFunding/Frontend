import React from "react";
import styles from "./EditPositionForm.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";

const EditPositionForm = () => {
  return (
    <form className="flex flex-col gap-4 items-center font-vazirmatn m-5">
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="نام پوزیشن"
      />
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="توضیحات"
      />
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="سرمایه مورد نیاز"
      />
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="زمان (روز)"
        type={"number"}
      />
      {/* <div className={styles.input_box}>
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
      </div> */}
      <Button>ویرایش پوزیشن</Button>
    </form>
  );
};

export default EditPositionForm;
