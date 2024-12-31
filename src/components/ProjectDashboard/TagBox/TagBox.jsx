import React from "react";
import styles from "./TagBox.module.scss";
import Tags from "@/components/Tags/Tags";
import plus from "../../../assets/plus.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import EmptySection from "@/components/EmptySection/EmptySection";
import { Label } from "@/components/ui/label";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import { patchData, postData } from "@/Services/ApiClient/Services";
import { use } from "react";

const TagBox = ({ className }) => {
  const tagCategories = [
    "هوش مصنوعی",
    "اینترنت اشیا",
    "نرم‌افزار",
    "امنیت",
    "واقعیت افزوده",
    "موسیقی",
    "سینما",
    "صنایع دستی",
    "تغذیه",
    "روان‌شناسی",
    "درمان",
    "فرهنگی",
    "شهری",
    "بین‌المللی",
    "کتب و نشریات",
    "توسعه فردی",
    "مؤسسات آموزشی",
    "صندوق سرمایه‌گذاری",
    "رمزارز",
    "بیمه",
  ];

  const persianToEnglish = {
    "هوش مصنوعی": "Artificial Intelligence",
    "اینترنت اشیا": "Internet of Things",
    نرم‌افزار: "Software",
    امنیت: "Security",
    "واقعیت افزوده": "Augmented Reality",
    موسیقی: "Music",
    سینما: "Cinema",
    "صنایع دستی": "Handicrafts",
    تغذیه: "Nutrition",
    روان‌شناسی: "Psychology",
    درمان: "Therapy",
    فرهنگی: "Cultural",
    شهری: "Urban",
    بین‌المللی: "International",
    "کتب و نشریات": "Books and Publications",
    "توسعه فردی": "Personal Development",
    "مؤسسات آموزشی": "Educational Institutions",
    "سرمایه‌گذاری": "Investment Fund",
    رمزارز: "Cryptocurrency",
    بیمه: "Insurance",
  };

  const englishToPersian = {
    "Artificial Intelligence": "هوش مصنوعی",
    "Internet of Things": "اینترنت اشیا",
    Software: "نرم‌افزار",
    Security: "امنیت",
    "Augmented Reality": "واقعیت افزوده",
    Music: "موسیقی",
    Cinema: "سینما",
    Handicrafts: "صنایع دستی",
    Nutrition: "تغذیه",
    Psychology: "روان‌شناسی",
    Therapy: "درمان",
    Cultural: "فرهنگی",
    Urban: "شهری",
    International: "بین‌المللی",
    "Books and Publications": "کتب و نشریات",
    "Personal Development": "توسعه فردی",
    "Educational Institutions": "مؤسسات آموزشی",
    "Investment Fund": "سرمایه‌گذاری",
    Cryptocurrency: "رمزارز",
    Insurance: "بیمه",
  };
  const { subCategories, projectId, updateProject } = useProjectStore();

  const handleAddTag = (tag) => {
    console.log("Adding tag: ", tag);
    const formData = new FormData();
    formData.append(
      "subcategories",
      JSON.stringify([...subCategories, persianToEnglish[tag]])
    );
    patchData(`/projects/${projectId}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((data) => {
        console.log("Data: ", data);
        updateProject(projectId);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  return (
    <div className={`${className} flex flex-col p-5`}>
      <Label>دسته بندی ها :</Label>
      <div className="flex flex-row gap-[0.6vw]">
        <Tags tags={subCategories?.map((tag) => englishToPersian[tag])} />
        <Popover>
          <PopoverTrigger>
            <button
              // className="btn h-8 bg-bomborange text-white"
              className="flex h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3]"
              style={{ "min-height": "2px" }}
            >
              اضافه کردن
              <img src={plus} className="h-[70%] mt-[0.1vw] mr-[0.2vw]" />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <Command
              className={`border-solid border-2 border-gray-200 p-3 ${styles.box}`}
            >
              <CommandInput
                className={`rtl ${styles.searchBox}`}
                placeholder="جستجو کنید ..."
              />
              <CommandList>
                <CommandEmpty>
                  <EmptySection
                    textClassName="text-xs"
                    imageClassName="w-2"
                    type="سرمایه گذار"
                  />
                </CommandEmpty>
                <CommandGroup className={`rtl font-vazirmatn ${styles.box}`}>
                  {tagCategories.map((item, index) => (
                    <CommandItem
                      value={item}
                      key={index}
                      className={`cursor-pointer ${styles.box}`}
                    >
                      <p
                        onClick={() => handleAddTag(item)}
                        className={`px-2 py-[2px] text-center text-xs  max-w-max rounded font-semibold text-[#7281a3] ${styles.box}`}
                      >
                        {item}
                      </p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TagBox;
