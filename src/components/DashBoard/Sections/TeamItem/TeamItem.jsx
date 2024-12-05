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
import AddTeamForm from "@/components/Forms/DashBoardForms/AddTeamForm/AddTeamForm";
import { Edit } from "lucide-react";
import EditTeamForm from "@/components/Forms/DashBoardForms/EditTeamForm/EditTeamForm";

const TeamItem = () => {
  return (
    <Card className={styles.card_style}>
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AvatarImage
            className="w-[60px] aspect-square rounded-full"
            src={AVATAR}
          />
        </Avatar>
        <Label>UserName</Label>
        <Label>Role</Label>
      </div>
      <Separator orientation="vertical" />
      <div>
        <Label>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus
          numquam amet quia, commodi totam accusamus quisquam id aliquid?
          Deleniti praesentium perferendis deserunt qui vero cum fuga dolorum
          voluptatum numquam tenetur?
        </Label>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col items-center justify-center gap-4">
        <Drawer>
          <DrawerTrigger>
            <Button className={styles.button_style}>ویرایش</Button>
          </DrawerTrigger>
          <DrawerContent>
            <EditTeamForm />
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
        <Button className={styles.button_style}>حذف</Button>
      </div>
    </Card>
  );
};

export default TeamItem;
