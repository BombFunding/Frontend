import styles from "./StartupDashBoard.module.scss";
import { Card } from "@/components/ui/card";
import PositionBox from "../Sections/PositionBox/PositionBox";
import Accounting from "@/components/Accounting/Accounting";
import StartupProfiles from "@/components/StartupProfiles/StartupProfiles";
// import CommentSection from "@/components/CommentSection/CommentSection";
import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import TeamBox from "../Sections/TeamBox/TeamBox";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/Loading/Loading";
import { BarChart1 } from "@/components/BarChart/BarChart1";
import BarChart2 from "@/components/BarChart/BarChart2";

import Likes from "@/components/Likes/Likes";
const StartupDashBoard = () => {
  const {
    username,
    loading,
    likeCount,
    setFullname,
    setLikeCount,
    setUsername,
    setBio,
    setAvatar,
    setHeader,
    setBalance,
  } = useProfileStore();
  console.log(useProfileStore());
  useEffect(() => {
    getData(`/auth/view_own_baseuser_profile/`).then((data) => {
      console.log("Startup data: ", data.base_profile);
      setFullname(
        data.base_profile.first_name + " " + data.base_profile.last_name
      );
      setUsername(data.base_profile.name);

      // console.log("username: ", username);
      setBio(data.base_profile.bio);
      if (data.base_profile.likeCount) {
        setLikeCount(data.base_profile.likeCount);
      } else {
        setLikeCount(0);
      }
      setAvatar(`http://104.168.46.4:8000${data.base_profile.profile_picture}`);
      setHeader(`http://104.168.46.4:8000${data.base_profile.header_picture}`);
      getData(`/startup/get_startup_profile/${username}/`).then((data) => {
        console.log("positions: ", data.profile.positions);
      });
      getData(`/balance/balance/`).then((data) => setBalance(data.balance));
    });
  }, []);
  if (loading)
    return (
      <div className={"flex justify-center items-center w-[100vw] h[100vh]"}>
        <Loading />;
      </div>
    );

  return (
    <>
      <Card className={styles.card_style}>
        <Likes
          className="translate-x-[1vw] translate-y-[11.5vw]"
          count={likeCount}
        />
        <PersonalInfo loading={loading} />
        <Label className={styles.label_style}>پوزیشن‌ها</Label>
        <PositionBox />
        <div className="flex flex-row justify-between gap-2 mt-2">
          <div className="flex flex-col w-2/6 gap-2">
            <Label className={styles.label_style}>حساب</Label>
            <Accounting className={"h-[265px]"} />
          </div>
          <div className="flex flex-col w-4/6 gap-2">
            <Label className={styles.label_style}>اعضا</Label>
            <TeamBox />
          </div>
        </div>
        {/* <div className={styles.position_box}>Team</div> */}
        {/* <div className={styles.team_row}></div> */}
        {/* <div className={styles.position_box}>profiles</div> */}
        {/* <StartupProfiles /> */}
        {/* <CommentSection /> */}
        {/* <div className={styles.position_box}>stats</div> */}
        <div
          className={`flex flex-wrap gap-6 p-6 rounded-md ${styles.chartbox}`}
        >
          <div className="flex-1 min-w-[300px]">
            <BarChart1 />
          </div>
          <div className="flex-1 min-w-[300px]">
            <BarChart2 />
          </div>
        </div>
      </Card>
    </>
  );
};

export default StartupDashBoard;
