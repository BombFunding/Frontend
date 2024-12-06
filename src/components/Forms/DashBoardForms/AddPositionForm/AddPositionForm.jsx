import styles from "./AddPositionForm.module.scss";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postData } from "@/Services/ApiClient/Services";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";

const AddPositionForm = () => {
  const addPosition = (e) => {
    e.preventDefault();
    const data = {
      name: "Ali",
      bio: "daaaaa",
      end_time: "2024-12-12T02:01:14",
      funded: 0,
      start_time: "2024-12-10T02:01:14",
      total: 10,
    };
    postData("/startup/create_update_position/", data).then((data) => {
      console.log(data);
    });
  };
  return (
    <form
      // className="flex flex-col gap-4 items-center font-vazirmatn m-5"
      className="font-vazirmatn place-items-center"
      onSubmit={(e) => addPosition(e)}
    >
      <div className="flex flex-col gap-2 justify-evenly items-center">
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
          type="number"
        />
        <CustomInput
          inputClassName={"w-[60vw]"}
          placeholder="مدت زمان (روز)"
          type="number"
        />
        <Button className="m-[3vw]">ثبت پوزیشن</Button>
      </div>
      {/* <div className={styles.input_box}>
				<Label className={styles.label_style}>نام پوزیشن</Label>
				<Input className={styles.input_style}></Input>
			</div> */}
      {/* <div className={styles.input_box}>
				<Label className={styles.label_style}>سرمایه مورد نیاز</Label>
				<Input type="number" className={styles.input_style}></Input>
			</div> */}
      {/* <div className={styles.input_box}>
				<Label className={styles.label_style}>{"مدت زمان (روز)"}</Label>
				<Input type="number" className={styles.input_style}></Input>
			</div> */}
    </form>
  );
};

export default AddPositionForm;