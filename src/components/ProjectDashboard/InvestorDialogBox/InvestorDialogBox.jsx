import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import AVT from "@/assets/A1.jpg";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmptySection from "@/components/EmptySection/EmptySection";
import styles from "./InvestorDialogBox.module.scss";
import { Button } from "@/components/ui/button";

const InvestotItem = ({ name, avatar, valueOfInvestment }) => {
  return (
    <>
      <div className="flex gap-2 ">
        <Avatar>
          <AvatarImage src={avatar ?? AVT} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center items-start">
          <Label>{name}</Label>
          <Label className="text-xs">{valueOfInvestment}</Label>
        </div>
      </div>
    </>
  );
};

const InvestorDialogBox = ({ className }) => {
  const mockData = [
    { name: "Ali", avatar: AVT, valueOfInvestment: "1000$" },
    { name: "Reza", avatar: AVT, valueOfInvestment: "2000$" },
    { name: "Meahdi", avatar: AVT, valueOfInvestment: "300$" },
    { name: "Medi", avatar: AVT, valueOfInvestment: "3000$" },
    { name: "Maefhdi", avatar: AVT, valueOfInvestment: "300$" },
    { name: "Mhdai", avatar: AVT, valueOfInvestment: "300$" },
    { name: "ehdgi", avatar: AVT, valueOfInvestment: "300$" },
    { name: "Meadi", avatar: AVT, valueOfInvestment: "3000$" },
    { name: "Meahgi", avatar: AVT, valueOfInvestment: "300$" },
  ];
  return (
    <>
      <div className={`${className}`}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className=" text-bomborange hover:text-black">
              {mockData.length} نفر روی این پروژه سرمایه گذاری کرده اند.
            </Button>
          </DialogTrigger>
          <DialogContent className="pt-10 bg-white text-gray-600 rounded-lg w-96">
            <Label>سرمایه گذاران</Label>
            <Separator />
            <Command className="border border-solid border-2 border-gray-200 p-3">
              <CommandInput className={`rtl ${styles.searchBox}`} placeholder="جستجو کنید ..." />
              <CommandList>
                <CommandEmpty>
                  <EmptySection imageClassName={"w-2"} type="سرمایه گذار" />
                </CommandEmpty>
                <CommandGroup heading="نتایج">
                  {mockData.map((item, index) => (
                    <CommandItem value={item.name} key={index}>
                      <InvestotItem {...item} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default InvestorDialogBox;
