import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { patchData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useParams } from "react-router-dom";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
function ExtendPositionForm({
  setPositions,
  positionData,
  setExtendPositionOpen,
  id,
}) {
  const [days, setDays] = useState(0);
  const { projectId } = useParams();
  const { updateProject } = useProjectStore();
  const { username } = useProfileStore();
  const onSubmit = (e) => {
    e.preventDefault();
    const timestamp = Date.parse(positionData?.end_time); // Parse the end_time
    const end_date = new Date(timestamp); // Convert to Date object

    if (isNaN(end_date)) {
      throw new Error("Invalid end_time format"); // Handle invalid dates gracefully
    }

    // Create a future date by adding days to the end_date
    const daysToAdd = parseInt(days, 10); // Convert days to integer
    const futureDate = new Date(end_date); // Clone the end_date
    futureDate.setDate(futureDate.getDate() + daysToAdd); // Add days

    // Format the future date as a string in ISO format
    let endTime = futureDate.toISOString().slice(0, 19); // ISO without milliseconds
    endTime += " +03:30"; // Append the offset
    patchData(`/position/extend/${id}/`, {
      end_time: endTime,
    })
      .then((res) => {
        console.log(res);
        toast.success(<CustomToast Header="پوزیشن با موفقیت تمدید شد" />);
        updateProject(projectId);
        setExtendPositionOpen(false);
        // setTimeout(() => {
        //   setPositions(data);
        // }, 3000);
      })
      .catch((err) => {
        console.log("RR: ", err);
        toast.error(<CustomToast Header="خطا" Message={err.response?.data} />);
      });
  };
  return (
    <form
      className="flex flex-col gap-4 items-center font-vazirmatn m-5"
      onSubmit={onSubmit}
    >
      <Label className="text-black text-lg place-self-center mt-[2vw] font-vazirmatn">
        چه مقدار میخواهید این پوزیشن را تمدید کنید؟
      </Label>
      <CustomInput
        inputClassName={"w-[60vw]"}
        placeholder="روز"
        value={days}
        onChange={setDays}
        type="number"
      />
      <Button
        type="submit"
        className="m-[3vw] btn bg-bomborange hover:text-white hover:bg-black"
      >
        تمدید پوزیشن
      </Button>
    </form>
  );
}

export default ExtendPositionForm;
