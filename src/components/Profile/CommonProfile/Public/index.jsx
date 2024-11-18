import { Card } from "@/components/ui/card";
import React from "react";
import AvatarImg from "@/assets/A1.jpg";
import upProgImg from "@/assets/upProfile.jpg";
import { Label } from "@radix-ui/react-label";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";

const PublicCommonProfile = ({ className }) => {
  return (
    <Card className={`${className} bg-slate-50 p-0 overflow-hidden h-[80vh]`}>
      <div className={`h-1/3 overflow-hidden relative`}>
        <img
          className="transition-all duration-1000 ease-in-out top-0 md:top-[-100%] absolute"
          src={upProgImg}
        />
        <div className="transition-all duration-500 ease-in-out absolute bg-white opacity-[27%]  w-[70%] aspect-square rounded-full top-[-30%] left-[-10%] md:top-[-60%]"></div>
      </div>
      <div className="relative">
        <div className="flex justify-center items-center shadow-lg w-[100px] h-[100px] rounded-full overflow-hidden bg-white absolute top-[-70px] right-5">
          <div className="w-[90px] rounded-full overflow-hidden">
            <img src={AvatarImg} />
          </div>
        </div>
        <div className="p-8 flex flex-col gap-3 font-vazirmatn">
          <Label className=" text-base">اطلاعات کاربری</Label>
          <div className="flex flex-col justify-evenly mr-3 gap-1">
            <Label className=" text-xs">نام کاربری: {"Erfan"}</Label>
            <Label className=" text-xs">ایمیل: {"Erfan@gmail.com"}</Label>
            <p className="text-xs text-right text-justify">
              ارفعان، یک توسعه‌دهنده با استعداد و علاقه‌مند به تکنولوژی‌های مدرن
              است که در حال حاضر در پروژه‌های خود از ShadCN استفاده می‌کند. او
              با رویکردی خلاقانه و هدفمند، به دنبال خلق تجربه‌های دیجیتالی
              منحصربه‌فرد و کاربردی است. اشتیاق او به یادگیری مداوم و به‌کارگیری
              تکنولوژی‌های نوین، او را به فردی پیشرو در حوزه توسعه نرم‌افزار
              تبدیل کرده است.
            </p>
          </div>
          <div className="flex justify-center items-center gap-6 ">
            <LinkedInIcon />
            <TelegramIcon />
            <XIcon />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PublicCommonProfile;
