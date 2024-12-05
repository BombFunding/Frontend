import React from "react";
import styles from "./PositionBox.module.scss";
import PositionItem from "../PositionItem/PositionItem";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import AddPositionForm from "@/components/Forms/DashBoardForms/AddPositionForm/AddPositionForm";

const PositionBox = () => {
  return (
    <div className={styles.position_box}>
      <div className={styles.create_position}>
        <Drawer>
          <DrawerTrigger>
            <Button variant="default" className="m-2">ساخت پوزیشن جدید</Button>
          </DrawerTrigger>
          <DrawerContent>
            <AddPositionForm />
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
      <div className={styles.position_list}>
        <PositionItem />
        <PositionItem />
        <PositionItem />
        <PositionItem />
      </div>
    </div>
  );
};

export default PositionBox;
