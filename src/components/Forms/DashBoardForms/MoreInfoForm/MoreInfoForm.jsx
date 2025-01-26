import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";

const MoreInfoForm = ({ data }) => {
  return (
    <form className="flex flex-col gap-4 items-center font-vazirmatn m-5">
      <CustomInput inputClassName={"w-[60vw]"} placeholder="کد ملی" />
      <CustomInput inputClassName={"w-[60vw]"} placeholder="کد حقوقی" />
      <CustomInput inputClassName={"w-[60vw]"} placeholder="شماره شبا" />
      <CustomInput
        inputClassName={"w-[60vw] text-right"}
        placeholder="نام شرکت"
      />
      <CustomTextArea
        inputClassName={"w-[60vw] text-right"}
        placeholder="آدرس"
      />
      <Button>ثبت تغییرات</Button>
    </form>
  );
};

export default MoreInfoForm;
