import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import mockuppic from "../../assets/upProfile.jpg";
import mockuppic2 from "../../assets/baner.jpg";
import clock from "../../assets/clock.png";
import styles from "./StartupCard.module.scss";
import defaultpfp from "../../assets/defaultpfp.png";
import Bookmark from "../Bookmark/Bookmark";
import Tags from "../Tags/Tags";
import Like from "../Like/Like";
import { GoPaperAirplane } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa"; // Import green check icon
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function StartupCard() {
  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // 3 second timer
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <div className={`${styles.container}`}>
      <img src={mockuppic2} className={`${styles.image}`} />
      <Progress
        value={10}
        className={styles.progress_bar}
        ProgressColor="bg-bomborange"
      />
      <div className="flex">
        <img src={defaultpfp} className="rounded-full w-[4vw] m-[1vw]" />
        <h1 className="text-[1.2vw] place-self-center">
          این یک پوزیشن است؟ فکر کنم لورم ایپسام ایپسام ایپسام
        </h1>
        <Like className="pr-[0vw] pl-[1vw] place-self-center" />
        <Bookmark className="pl-[0.9vw] place-self-center" />
        <GoPaperAirplane
          className="-rotate-45 w-[60px] h-[35px] ml-[1vw] pl-[0.5vw] mb-[0.4vh] place-self-center cursor-pointer"
          onClick={handleShare}
        />
      </div>

      <Accordion type="single" collapsible className="w-full p-3">
        <AccordionItem value="item-1">
          <AccordionTrigger>اطلاعات بیشتر</AccordionTrigger>
          <AccordionContent>
            <div className="flex m-[1vw] place-content-center rtl justify-around px-[3vw]">
              <div className={`flex ${styles.hover_trigger}`}>
                <img
                  src={clock}
                  className="w-[1vw] h-[1vw] place-self-center mx-[0.5vw] mb-[0.1vw]"
                />
                2 روز باقیمانده
              </div>
              <div
                className={`border-solid border-[0.1vw] w-0 border-gray-300 rounded-full mx-[1vw]`}
              ></div>
              87% سرمایه جمع شده
            </div>
            <Tags />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {showToast && (
        <div
          className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-3 rounded-lg shadow-lg flex items-center"
          style={{ zIndex: 1000 }}
        >
          <FaCheckCircle className="ml-2 text-green-600 font-vazirmatn" />
          لینک با موفقیت کپی شد.
        </div>
      )}
    </div>
  );
}

export default StartupCard;
