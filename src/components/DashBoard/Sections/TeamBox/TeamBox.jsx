import React from "react";
import styles from "./TeamBox.module.scss";
import TeamItem from "../TeamItem/TeamItem";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddPositionForm from "@/components/Forms/DashBoardForms/AddPositionForm/AddPositionForm";
import { Button } from "@/components/ui/button";
import AddTeamForm from "@/components/Forms/DashBoardForms/AddTeamForm/AddTeamForm";

const TeamBox = ({ className }) => {
  return (
    <div className={`${styles.team_box} ${className}`}>
      <div className={styles.create_member}>
        <Drawer>
          <DrawerTrigger>
            <Button variant="default" className="m-2">
              اضافه کردن عضو جدید
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <AddTeamForm />
            <DrawerClose asChild>
              <Button variant="outline">بازگشت</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
      <div className={styles.team_list}>
        <TeamItem />
        <TeamItem />
        <TeamItem />
        <TeamItem />
      </div>
    </div>
  );
};

export default TeamBox;
