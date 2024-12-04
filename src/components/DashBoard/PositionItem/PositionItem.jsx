import React from "react";
import styles from "./PositionItem.module.scss";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const PositionItem = ({ positionData }) => {
  return (
    <Card className={styles.card_style}>
      <div className={styles.col_box}>
        <Label className="text-base font-bold">{positionData?.name}position 1</Label>
        <div className="flex gap-28">
          <div className="self-start ">
            <Label>سرمایه مورد نیاز: </Label>
            <Label>{positionData?.price}1000$</Label>
          </div>
          <div className="self-start">
            <Label>مقدار به دست آمده: </Label>
            <Label>{positionData?.price}300$</Label>
          </div>
        </div>

        <Progress
          value={50}
          className={styles.progress_bar}
          mainColor="bg-gray-50"
          ProgressColor="bg-bomborange"
        />
        <div className="self-start">
          <Label>زمان باقیمانده: </Label>
          <Label>{positionData?.price}5d</Label>
        </div>
        <Progress
          value={50}
          className={styles.progress_bar}
          mainColor="bg-gray-50"
          ProgressColor="bg-bomborange"
        />
      </div>
      <Separator orientation="vertical" className="mx-2" />
      <div className={styles.button_box}>
        <Button variant="default" className={styles.button_style}>
          ویرایش
        </Button>
        <Separator className="my-1" />
        <Button variant="default" className={styles.button_style}>
          بستن
        </Button>
        <Separator className="my-1" />
        <Button variant="default" className={styles.button_style}>
          تمدید
        </Button>
      </div>
    </Card>
  );
};

export default PositionItem;
