import React from "react";
import styles from "./TagBox.module.scss";
import Tags from "@/components/Tags/Tags";
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

const TagBox = ({ className }) => {
  const tagCategories = [
    "کشاورزی",
    "صنعتی",
    "فناوری",
    "خدماتی",
    "مالی",
    "بیمه",
    "سلامت",
    "فرهنگی",
    "ورزشی",
    "خیریه",
  ];
  return (
    <div className={`${className} flex flex-col items-center p-5`}>
      <Tags />
      <Popover>
        <PopoverTrigger>
          <button
            className="btn h-8 bg-bomborange text-white"
            style={{ "min-height": "2px" }}
          >
            اضافه کردن
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <Command className="border border-solid border-2 border-gray-200 p-3">
            <CommandInput
              className={`rtl ${styles.searchBox}`}
              placeholder="جستجو کنید ..."
            />
            <CommandList>
              <CommandEmpty>
                <EmptySection imageClassName={"w-2"} type="سرمایه گذار" />
              </CommandEmpty>
              <CommandGroup heading="نتایج">
                {tagCategories.map((item, index) => (
                  <CommandItem value={item} key={index}>
                    <p className="px-2 py-[2px] text-center text-xs bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3]">
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
  );
};

export default TagBox;
