import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

const EditProfile = () => {
  return (
      <div className="font-vazirmatn mt-8 h-auto">
        <Label className=" text-black text-2xl">اطلاعات کاربری</Label>
        <Card className={styles.card_style}>
          <div className={styles.avatar_container}>
            <AvatarWithFileUpload />
          </div>
          <div className="m-5">
            <Separator className="my-4" />
            <div className="flex flex-col gap-6">
              <div className={styles.input_row}>
                <div className={styles.input_block}>
                  <Label className={styles.input_label} htmlFor="email">
                    نام
                  </Label>
                  <Input
                    disabled={false}
                    className={styles.input_field}
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className={styles.input_block}>
                  <div className="flex justify-between items-center gap-2 mx-3">
                    <Label className={styles.input_label} htmlFor="email">
                      نام خانوادگی
                    </Label>
                    <div className="flex items-center gap-[3px]">
                      <Label className="text-[14px] text-gray-500">Edit</Label>
                      <EditIcon sx={{ fontSize: 16, color: "gray" }} />
                    </div>
                  </div>
                  <Input
                    disabled={false}
                    className={styles.input_field}
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className={styles.input_row}>
                <div className={styles.input_block}>
                  <div className="flex justify-between items-center gap-2">
                    <Label className={styles.input_label} htmlFor="email">
                      ایمیل
                    </Label>
                    <div className="flex items-center gap-1">
                      <Label className="text-[14px] text-green-700">
                        تایید شده
                      </Label>
                      <VerifiedUserIcon sx={{ fontSize: 16, color: "green" }} />
                    </div>
                  </div>
                  <Input
                    disabled={false}
                    className={styles.input_field}
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className={styles.input_block}>
                  <Label className={styles.input_label} htmlFor="email">
                    شماره تماس
                  </Label>
                  <Input
                    disabled={false}
                    className={styles.input_field}
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="grid w-full gap-1.5 ">
                <Label className={styles.input_label} htmlFor="message">
                  بیوگرافی
                </Label>
                <Textarea
                  disabled={false}
                  className={`${styles.input_text_field} `}
                  placeholder="بیوگرافی خود را در این بخش بنویسید"
                  id="message"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
  );
};

export default EditProfile;
