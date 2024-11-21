import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BANNER from "@/assets/baner.jpg";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import AVATARIMG from "@/assets/A1.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AvatarWithFileUpload from "@/components/Custom/AvatarWithFileUpload/AvatarWithFileUpload";
import styles from "./EditProfile.module.scss";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import EditableInput from "@/components/Custom/EditableInput/EditableInput";
import VerifiableInput from "@/components/Custom/VerifiableInput/VerifiableInput";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import WebIcon from "@mui/icons-material/Web";
import EditButton from "@/components/Custom/EditButton/EditButton";
import CloseIcon from "@mui/icons-material/Close";

const EditProfile = () => {
  return (
    <div className="font-vazirmatn mt-8 h-auto">
      <Label className=" text-black text-2xl">اطلاعات کاربری</Label>
      <Card className={styles.card_style}>
        <form>
          <div className={styles.avatar_container}>
            <img
              className="w-full object-cover absolute"
              src={BANNER}
              alt="avatar"
            />
            <AvatarWithFileUpload className={"m-4"} />
            <EditButton
              name1={"تغییر"}
              name2={"کنسل"}
              icon1={<EditIcon />}
              icon2={<CloseIcon />}
              className={"absolute bottom-2 left-3 "}
            />
          </div>
          <div className="m-5">
            <Label className="z-10 text-xl colo">نام کاربری</Label>
            <Separator className="my-4" />
            <div className="flex flex-col gap-6">
              <div className={styles.input_row}>
                <EditableInput name={"نام"} value={"نام"} />
                <EditableInput name={"نام خانوادگی"} value={"نام خانوادگی"} />
              </div>
              <div className={styles.input_row}>
                <VerifiableInput
                  isVerified={true}
                  name={"ایمیل"}
                  value={"ایمیل"}
                />
                <EditableInput name={"شماره تماس"} value={"شماره تماس"} />
              </div>
              <div className="grid w-full gap-1.5 ">
                <EditableInput
                  name={"بیوگرافی"}
                  isTextArea={true}
                  value={
                    "سیبدهیسدلهبدهیسبد سیهدبهدبهسی دهیس دبهد سید یسدهب یسهبدهسیدبه دصثهلد هحدلاخسجیلخئ هخیلت خهد سهخیبدلهیدل خخ لهخ لی دخد  "
                  }
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className={styles.input_row}>
                  <EditableInput
                    icon={<LinkedInIcon />}
                    name={"لینکدین"}
                    value={"لینکدین"}
                  />
                  <EditableInput
                    icon={<TelegramIcon />}
                    name={"تلگرام"}
                    value={"تلگرام"}
                  />
                </div>
                <div className={styles.input_row}>
                  <EditableInput
                    icon={<WebIcon />}
                    name={"سایت"}
                    value={"سایت"}
                  />
                  <EditableInput
                    icon={<XIcon />}
                    name={"ایکس"}
                    value={"ایکس"}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;
