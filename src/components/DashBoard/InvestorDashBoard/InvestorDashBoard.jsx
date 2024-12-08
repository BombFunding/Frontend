import React from "react";
import styles from "./InvestorDashBoard.module.scss";
import { Card } from "@/components/ui/card";
import PositionBox from "../Sections/PositionBox/PositionBox";
import Accounting from "@/components/Accounting/Accounting";
import StartupProfiles from "@/components/StartupProfiles/StartupProfiles";
import CommentSection from "@/components/CommentSection/CommentSection";
import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import TeamBox from "../Sections/TeamBox/TeamBox";
import { Label } from "@/components/ui/label";
import BookmarkBox from "../BookmarkBox/BookmarkBox";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MoreInfo from "@/components/Forms/DashBoardForms/MoreInfoForm/MoreInfoForm";

const InvestorDashBoard = () => {
  const [loading, setLoading] = useState(false);
  const { setFullname, setUsername, setBio, setAvatar } = useProfileStore();
  useEffect(() => {
    setLoading(true);
    getData("/startup/view_own_startup_profile/").then((data) => {
      console.log("Startup data: ", data.startup_profile);
      setFullname(
        data.startup_profile.first_name + " " + data.startup_profile.last_name
      );
      setUsername(data.startup_profile.name);
      setBio(data.startup_profile.bio);
      setAvatar(
        `http://104.168.46.4:8000${data.startup_profile.profile_picture}`
      );
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Card className={styles.card_style}>
        <PersonalInfo loading={loading} />
        <Card className="bg-bomborange text-white px-5 py-3 flex gap-2 justify-end items-center">
          <Drawer>
            <DrawerTrigger>
              <Button variant="default" className="bg-white h-8">
                تکمیل
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <MoreInfo />
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerContent>
          </Drawer>
          <Label>:لطفا اطلاعات خود را تکمیل کنید</Label>
        </Card>
        <Label className={styles.label_style}>پوزیشن ها</Label>
        <PositionBox />
        <div className="flex flex-row justify-between gap-2 mt-2">
          <div className="flex flex-col w-2/6 gap-2">
            <Label className={styles.label_style}>حساب</Label>
            <Accounting className={"h-[265px]"} />
          </div>
          <div className="flex flex-col w-4/6 gap-2">
            <Label className={styles.label_style}>ذخیره</Label>
            <BookmarkBox />
          </div>
        </div>
        {/* <div className={styles.position_box}>Team</div> */}
        {/* <div className={styles.team_row}></div> */}
        {/* <div className={styles.position_box}>profiles</div> */}
        <StartupProfiles />
        <CommentSection />
        <div className={styles.position_box}>history</div>
      </Card>
    </>
  );
};

export default InvestorDashBoard;
