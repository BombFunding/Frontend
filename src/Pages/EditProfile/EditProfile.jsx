import * as yup from "yup";
import AVATARIMG from "@/assets/A1.jpg";
import AvatarWithFileUpload from "@/components/Custom/AvatarWithFileUpload/AvatarWithFileUpload";
import BANNER from "@/assets/baner.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import DrawerButton from "@/components/Custom/DrawerButton";
import EditButton from "@/components/Custom/EditButton/EditButton";
import EditIcon from "@mui/icons-material/Edit";
import EditableInput from "@/components/Custom/EditableInput/EditableInput";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React, { useEffect, useRef } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import VerifiableInput from "@/components/Custom/VerifiableInput/VerifiableInput";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WebIcon from "@mui/icons-material/Web";
import XIcon from "@mui/icons-material/X";
import styles from "./EditProfile.module.scss";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorMessage from "@/components/messages/ErrorMessage/ErrorMessage";
import { getData, postData, postImageData } from "@/Services/ApiClient";
import Profile from "../Profile";
import { Loading } from "@/components/Loading";

// const schema = yup.object().shape({});
const schema = yup.object().shape({
  firstName: yup.string().optional().nullable(),
  lastName: yup.string().optional().nullable(),
  phoneNumber: yup
    .string()
    .optional()
    .nullable()
    .matches(/^09[0-9]{9}$|^$/, "شماره تلفن معتبر وارد کنید"),

  bio: yup.string().max(300, "بیوگرافی نباید بیشتر از ۳۰۰ کاراکتر باشد"),

  telegramAccount: yup
    .string()
    .nullable()
    .optional()
    .matches(/^@[\w]+$|^$/, "آیدی تلگرام باید با @ شروع شود"),

  linkedinAccount: yup
    .string()
    .nullable()
    .optional()
    .url("آدرس لینکدین معتبر وارد کنید")
    .matches(/linkedin\.com|^$/, "لینک باید مربوط به لینکدین باشد"),

  twitterAccount: yup
    .string()
    .nullable()
    .optional()
    .matches(/^@[\w]+$|^$/, "آیدی توییتر (ایکس) باید با @ شروع شود"),

  website: yup
    .string()
    .nullable()
    .optional()
    .url("آدرس وب‌سایت معتبر وارد کنید")
    .matches(
      /^https?:\/\/[\w\-\.]+\.[a-z]{2,}$|^$/,
      "فرمت آدرس وب‌سایت صحیح نیست"
    ),
});

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [profileInfo, setProfileInfo] = React.useState({});
  const [bannerFile, setBannerFile] = React.useState(null);
  const [avatarFile, setAvatarFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);

  useEffect(() => {
    const fetchDefaultValues = async () => {
      setLoading(true);
      // await getData("/startup/view_own_startup_profile/", {
      //   headers: {
      //     "Cache-Control": "no-cache",
      //     Pragma: "no-cache",
      //   },
      // });
      await getData("/startup/view_own_startup_profile/")
        .then((data) => {
          console.log(data);
          const profile = data.startup_profile;
          console.log("recived profile: ", profile);
          setBannerFile(`http://104.168.46.4:8000${profile.header_picture}`);
          setAvatarFile(`http://104.168.46.4:8000${profile.profile_picture}`);
          const profileInfo_ = {
            firstName: profile.first_name ?? "",
            lastName: profile.last_name ?? "",
            phoneNumber: profile.phone ?? "",
            bio: profile.bio ?? "",
            telegramAccount: profile.socials?.telegram ?? "",
            linkedinAccount: profile.socials?.linkedin ?? "",
            twitterAccount: profile.socials?.twitter ?? "",
            website: profile.socials?.website ?? "",
            email: profile.email ?? "",
          };
          setProfileInfo(profileInfo_);
          reset(profileInfo_);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchDefaultValues();
  }, [reset]);

  useEffect(() => {
    if (errors) {
      console.log("errors: ", errors);
      Object.values(errors).map((err) => {
        // console.log(err.message);
        // toast.error(err.message);
        toast.error(<ErrorMessage message={err.message} />);
      });
    }
  }, [errors]);

  const onSubmit = (data) => {
    console.log("Form submitted");
    console.log(data);
    const bodyData = {
      phone: data.phoneNumber ?? profileInfo.phoneNumber,
      first_name: data.firstName ?? profileInfo.firstName,
      last_name: data.lastName ?? profileInfo.lastName,
      bio: data.bio ?? profileInfo.bio,
      socials: {
        linkedin: data.linkedinAccount ?? profileInfo.linkedinAccount,
        twitter: data.twitterAccount ?? profileInfo.twitterAccount,
        telegram: data.telegramAccount ?? profileInfo.telegramAccount,
        website: data.website ?? profileInfo.website,
      },
    };
    const updateData = async (bodyData) => {
      console.log("bodyData: ", bodyData);
      await postData("/startup/update_startup_profile/", bodyData)
        .then((data) => {
          console.log("Data posted successfully:", data);
        })
        .catch((error) => {
          console.log("Data posting FAILED:", error);
        });
    };
    updateData(bodyData);
  };

  const fileInputRef = useRef(null);

  const handleBannerClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file input change
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerFile(reader.result);
        const formData = new FormData();
        formData.append("header_picture", file);
        setImageLoading(true);
        const toastId = toast.success(
          <ErrorMessage message={"بنر در حال بروزرسانی ..."} />,
          {
            autoClose: 20000,
          }
        );
        postImageData("startup/update_startup_profile/", formData)
          .then((res) => {
            console.log("Image posted successfully:", res);
            setImageLoading(false);
            toast.dismiss(toastId);
            toast.success(
              <ErrorMessage message={"بنر با موفقیت بروزرسانی شد"} />
            );
          })
          .catch((err) => {
            console.log("Image posting FAILED:", err);
            setImageLoading(false);
            toast.dismiss(toastId);
            toast.error(<ErrorMessage message={"بنر بروزرسانی نشد"} />);
          });
      };
      reader.readAsDataURL(file);
    }
  };
  // useEffect(() => {
  //   // const formData = new FormData();
  //   // formData.append("header_picture", new File([bannerFile], ".png"));
  //   // console.log("bannerFile: ", bannerFile);
  //   // console.log("formData: ", formData);
  //   const formData = new FormData();
  //   formData.append("imageFile", bannerFile);
  //   postImageData("startup/update_startup_profile/", formData)
  //     .then((res) => {
  //       console.log("Image posted successfully:", res);
  //     })
  //     .catch((err) => {
  //       console.log("Image posting FAILED:", err);
  //     });
  // }, [bannerFile]);
  if (loading) return <Loading />;
  return (
    <>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      /> */}
      {/* <button onClick={() => toast.error("hello")}>notify</button> */}
      <div className="font-vazirmatn mt-8 h-auto">
        <Label className=" text-black text-2xl">اطلاعات کاربری</Label>

        <Card className={styles.card_style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.avatar_container}>
              <img
                className="w-full object-cover absolute"
                src={bannerFile}
                alt="avatar"
              />
              <AvatarWithFileUpload
                avatarFileState={[avatarFile, setAvatarFile]}
                className={"m-4"}
              />
              <button
                className="absolute bottom-2 left-3 font-vazirmatn text-xs px-1 bg-gray-100 rounded-xl text-black text-gray-500 hover:text-bomborange transition-all duration-300 ease-in-out transform opacity-[93%] hover:opacity-100 hover:scale-110 bg-slate-50 shadow-md rounded-lg px-1 flex items-center h-4"
                type="button"
                onClick={handleBannerClick}
              >
                تغییر
              </button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }} // Hide the file input element
                ref={fileInputRef} // Attach input to useRef
                onChange={handleBannerChange} // Handle file selection
              />
            </div>
            <div className="m-5">
              <Label className="z-10 text-xl colo">نام کاربری</Label>

              <Separator className="my-4" />
              <div className="flex flex-col gap-6">
                <div className={styles.input_row}>
                  <EditableInput
                    setFocus={setFocus}
                    setValue={setValue}
                    register={register}
                    name={"نام"}
                    value={"نام"}
                    fieldName={"firstName"}
                  />
                  <EditableInput
                    setFocus={setFocus}
                    setValue={setValue}
                    register={register}
                    name={"نام خانوادگی"}
                    value={"نام خانوادگی"}
                    fieldName={"lastName"}
                  />
                </div>
                <div className={styles.input_row}>
                  <VerifiableInput
                    setFocus={setFocus}
                    setValue={setValue}
                    register={register}
                    isVerified={true}
                    name={"ایمیل"}
                    value={"ایمیل"}
                    editable={false}
                    fieldName={"email"}
                  />
                  <EditableInput
                    setFocus={setFocus}
                    setValue={setValue}
                    register={register}
                    name={"شماره تماس"}
                    value={"شماره تماس"}
                    fieldName={"phoneNumber"}
                  />
                </div>
                <div className="grid w-full gap-1.5 ">
                  <EditableInput
                    setValue={setValue}
                    setFocus={setFocus}
                    register={register}
                    name={"بیوگرافی"}
                    isTextArea={true}
                    value={
                      "سیبدهیسدلهبدهیسبد سیهدبهدبهسی دهیس دبهد سید یسدهب یسهبدهسیدبه دصثهلد هحدلاخسجیلخئ هخیلت خهد سهخیبدلهیدل خخ لهخ لی دخد  "
                    }
                    fieldName={"bio"}
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <div className={styles.input_row}>
                    <EditableInput
                      setFocus={setFocus}
                      setValue={setValue}
                      register={register}
                      icon={<LinkedInIcon />}
                      name={"لینکدین"}
                      value={"لینکدین"}
                      fieldName={"linkedinAccount"}
                    />
                    <EditableInput
                      setFocus={setFocus}
                      setValue={setValue}
                      register={register}
                      icon={<TelegramIcon />}
                      name={"تلگرام"}
                      value={"تلگرام"}
                      fieldName={"telegramAccount"}
                    />
                  </div>
                  <div className={styles.input_row}>
                    <EditableInput
                      setFocus={setFocus}
                      setValue={setValue}
                      register={register}
                      icon={<WebIcon />}
                      name={"سایت"}
                      value={"سایت"}
                      fieldName={"website"}
                    />
                    <EditableInput
                      setFocus={setFocus}
                      setValue={setValue}
                      register={register}
                      icon={<XIcon />}
                      name={"ایکس"}
                      value={"ایکس"}
                      fieldName={"twitterAccount"}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <GeneralDrawerButton classNames="fixed bottom-4 right-5" icon={<SaveIcon />}>
            <span>ذخیره</span>
          </GeneralDrawerButton> */}
            <button className={styles.save_btn} type="submit">
              <SaveIcon className={styles.save_icon} />
              <span className={styles.save_txt}>ذخیره</span>
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditProfile;
