import { Card } from "@/components/ui/card";
import React from "react";
import AvatarImg from "@/assets/A1.jpg";
import { Label } from "@radix-ui/react-label";
const PublicCommonProfile = ({ className }) => {
  return (
    <Card
      className={`${className} w-[70vw] h-[80vh] bg-slate-50 p-0 overflow-hidden`}
    >
      <div className="h-1/3 bg-orange-500 overflow-hidden relative">
        <div className="absolute bg-orange-300 opacity-70  w-[60%] aspect-square rounded-full top-[-60%] left-[-10%]"> </div>
      </div>
      <div className="relative">
        <div className="flex justify-center items-center shadow-lg w-[100px] h-[100px] rounded-full overflow-hidden bg-white absolute top-[-70px] right-5">
          <div className="w-[90px] rounded-full overflow-hidden">
            <img src={AvatarImg} />
          </div>
        </div>
        <div className="m-1 mr-24">
          <Label className="font-vazirmatn text-sm">اطلاعات کاربری</Label>
          
        </div>
      </div>
    </Card>
  );
};

export default PublicCommonProfile;
