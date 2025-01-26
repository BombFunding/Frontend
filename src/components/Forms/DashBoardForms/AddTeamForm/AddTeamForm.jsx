import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getData, postData } from "@/Services/ApiClient/Services";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  description: Yup.string().required("Name is required"),
  role: Yup.string().required("Email is required"),
});
const AddTeamForm = ({ setFormOpen, setMembers }) => {
  const { username } = useProfileStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const bodyData = {
      username: data.username,
      role: data.role,
      description: data.description,
    };

    postData(`/startup/profile/team/add/`, bodyData)
      .then((data) => {
        getData(`/startup/profile/team/list/${username}/`).then((res) => {
          toast.success(<CustomToast Header="عضو جدید تیم اضافه شد" />);
          setTimeout(() => {
            setMembers(res);
            setFormOpen(false);
          }, 3000);
        });
      })
      .catch((err) => {
        console.log("E: ", err);
        if (err.response?.data?.error === "User already in team") {
          toast.error(
            <CustomToast Header="خطا" Message="کاربر در تیم وجود دارد" />
          );
        } else {
          toast.error(<CustomToast Header="خطا" Message="کاربر وجود ندارد" />);
        }
        console.log(err);
      });
  };
  return (
    <form
      className="flex flex-col gap-4 items-center font-vazirmatn m-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomInput
        inputClassName={"w-[60vw] text-left translate-x-[-0.5vw]"}
        placeholder="نام کاربری"
        register={register}
        name={"username"}
        style={{"direction": "ltr"}}
      />
      <CustomInput
        inputClassName={"w-[60vw] text-right rtl translate-x-[-0.5vw]"}
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
      <Button className="btn bg-bomborange hover:text-white hover:bg-black">
        اضافه کردن
      </Button>
    </form>
  );
};

export default AddTeamForm;
