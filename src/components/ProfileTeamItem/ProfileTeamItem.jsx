import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { AvatarFallback } from "radix-ui";
// import { Button } from "../ui/button";

export default function ProfileTeamItem({
  profile,
  name,
  role,
  details,
  username,
}) {
  const navigate = useNavigate();
  return (
    <Card
      className="rounded-full place-items-center h-[280px] max-w-[300px] min-w-[200px] shadow-lg cursor-pointer font-vazirmatn"
      // sx={{ maxWidth: 345 }}
      onClick={() => {
        navigate(`/profile/${username}`);
      }}
    >
      <Avatar className="w-24 h-24 mt-3">
        <AvatarImage src={profile} className="object-cover" />
        <AvatarFallback>{`${name}'s avatar`}</AvatarFallback>
      </Avatar>
      <CardContent className="flex flex-col gap-3 place-items-center">
        <h1 className="place-self-center font-extrabold font-vazirmatn">
          {name}
        </h1>
        <Separator className="w-[6rem]" />
        <p className="text-wrap overflow-hidden font-vazirmatn text-ellipsis rtl max-h-12 max-w-[15vw] line-clamp-2 text-center">
          {role}
        </p>
      </CardContent>
      <CardActions>
        <Dialog>
          <DialogTrigger asChild>
            {
              <button
                size="small"
                className="font-vazirmatn text-sm hover:bg-gray-200 p-2 rounded-md"
                // className="bg-slate-400 h-[25px]"
                // onClick={() => setDialogOpen(!isDialogOpen)}
              >
                اطلاعات بیشتر
              </button>
            }
          </DialogTrigger>
          <DialogContent className="sm:max-w-mds">
            <DialogHeader>
              <DialogTitle className="font-bold text-xl mb-4 place-self-center mt-2">
                {name}
              </DialogTitle>
              <DialogDescription className="text-md font-light">
                {details}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {/* <DialogClose> */}
              {/* <Button type="button" variant="secondary">
                Close
              </Button> */}
              {/* </DialogClose> */}
            </DialogFooter>
            {/* <Separator className="my-4" /> */}
            {/* <div className="text-center">
              <Button
                variant="contained"
                onClick={() => {
                  setDialogOpen(!isDialogOpen);
                }}
              >
                بستن
              </Button>
            </div> */}
          </DialogContent>
        </Dialog>
      </CardActions>
    </Card>
  );
}
