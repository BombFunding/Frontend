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
      <div className="flex flex-col gap-2">
        <Label>{positionData?.name}mmmd</Label>
        <div className="flex justify-evenly items-center gap-3">
          <div>
            <label>سرمایه مورد نیاز: </label>
            <label>{"10000"}$</label>
          </div>
          <div>
            <label>سرمایه دریافت شده: </label>
            <label>{"300"}$</label>
          </div>
        </div>
        <Progress
          value={30}
          mainColor="bg-gray-50"
          ProgressColor="bg-bomborange"
          className="w-full h-3 border-black border-solid border-2"
        />
      </div>
      <Separator orientation="vertical" className="mx-2" />
      <div>dflnsdjfldsfnksn</div>
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
