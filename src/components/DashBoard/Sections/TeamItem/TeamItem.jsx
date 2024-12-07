import React from "react";
import styles from "./TeamItem.module.scss";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import AVATAR from "@/assets/A1.jpg";
import { Label } from "@radix-ui/react-label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import EditTeamForm from "@/components/Forms/DashBoardForms/EditTeamForm/EditTeamForm";
import { getData } from "@/Services/ApiClient/Services";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const TeamItem = ({ memberData, className }) => {
  const [profileData, setProfileData] = React.useState(null);
  const formattedDescription = memberData.description.split("\n");
  console.log("memberData: ", memberData);
  React.useEffect(() => {
    if (memberData?.username) {
      getData(`/startup/profile/${memberData?.username}/`).then((res) => {
        setProfileData(res.profile);
      });
    }
  }, []);
  return (
    <Card className={`${styles.card_style} ${className}`}>
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AvatarImage
            className="w-[60px] aspect-square rounded-full"
            src={memberData.profile_pic}
          />
        </Avatar>
        <Label>{memberData.username}</Label>
        <Label>{memberData.role}</Label>
      </div>
      <Separator />
      <div className="flex justify-center items-center">
        <Dialog>
          <DialogTrigger>
            <Button className={styles.button_style}>توضیحات</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="p-5">
              {formattedDescription.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <div className="flex flex-row items-center justify-center gap-2">
        <Drawer>
          <DrawerTrigger>
            <Button className={styles.button_style}>ویرایش</Button>
          </DrawerTrigger>
          <DrawerContent>
            <EditTeamForm memberData={memberData} />
            <DrawerClose asChild>
              <Button variant="outline">بازگشت</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
        <Button className={styles.button_style}>حذف</Button>
      </div>
    </Card>
  );
};

export default TeamItem;
