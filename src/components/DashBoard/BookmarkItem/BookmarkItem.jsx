import React from "react";
import styles from "./BookmarkItem.module.scss";
import { Card } from "@/components/ui/card";

import AVATAR from "@/assets/A1.jpg";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BookmarkItem = () => {
  return (
    <Card className={styles.card_style}>
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src={AVATAR} />
        </Avatar>
        <Label>UserName</Label>
    </Card>
  );
};

export default BookmarkItem;
