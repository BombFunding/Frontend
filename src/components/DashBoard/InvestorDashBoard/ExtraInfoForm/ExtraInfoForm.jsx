import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";

function ExtraInfoForm({ check, setCheck }) {
  return (
    <Card
      className={`bg-bomborange text-white px-5 py-3 flex gap-2 justify-end items-center ${
        !check ? "" : "hidden"
      }`}
    >
      <Drawer>
        <DrawerTrigger>
          <Button variant="default" className="bg-white h-8">
            تکمیل
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <MoreInfo />
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
      <Label>:لطفا اطلاعات خود را تکمیل کنید</Label>
    </Card>
  );
}

export default ExtraInfoForm;
