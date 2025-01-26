import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "react-responsive";

export function DrawerDialog({
  children,
  triggerButton,
  closeButton,
  title,
  open: controlledOpen, // Controlled state
  onOpenChange,         // External state handler
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  // If the component is controlled, use the provided state; otherwise, use internal state.
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-10">
          <DialogTitle>{title ?? ""}</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="p-4">{title ?? ""}</DrawerTitle>
        {children}
        <DrawerFooter className="flex flex-col items-center">
          <DrawerClose asChild>{closeButton}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
