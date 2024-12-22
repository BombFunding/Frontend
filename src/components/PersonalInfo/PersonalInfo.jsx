import headerpic from "../../assets/upProfile.jpg";
import Likes from "../Likes/Likes";
import styles from "./PersonalInfo.module.scss";
import calendarIcon from "../../assets/calendarIcon.png";
import defaultpfp from "../../assets/defaultpfp.png";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
function PersonalInfo({ loading }) {
  const x = true;
  const { likeCount, fullname, username, phone, email, bio, avatar, header } =
    useProfileStore();
  const Navigate = useNavigate();
  console.log(`email: ${email}`);
  return (
    <>
      <img
        src={header ? header : headerpic}
        className="w-[88vw] h-[15vw] mt-[1vh] rounded-lg object-cover"
      />
      <img
        src={avatar ? avatar : defaultpfp}
        className={`${
          styles.on
        } absolute place-self-end rounded-full w-[12vw] translate-x-[-5vw] mt-[6vw] border-solid ${
          loading ? "" : "ring-[0.5vw]"
        } ring-bomborange`}
      />
      <Button
        className="absolute border-solid border-2 bg-bomborange hover:bg-white translate-x-[0.5vw] mt-[1vw]"
        onClick={() => Navigate("/editprofile")}
      >
        ویرایش اطلاعات
      </Button>
      {/* <Likes count={2} className="absolute mt-[11.2vw] ml-[1.5vw]" /> */}
      <section
        className={`${
          x ?? "border-solid border-2 border-bomborange "
        } rounded-lg py-[3vw] px-[5vw] place-content-end`}
      >
        <div className="absolute translate-x-[5.2vw] -translate-y-[4vh] z-0"></div>
        <div className="flex justify-between">
          <h1 className="text-gray-500 text-[1.25vw] place-self-center">
            @{username}
          </h1>
          <h1 className={`text-[2vw]`}>{fullname}</h1>
        </div>
        {/* <div className="flex gap-[0.75vw]">
					<img src={calendarIcon} className="h-[2vw]" />
					<div className="text-[1.5vw] place-self-center place-content-center align-middle">
						عضویت از 2024/12/5
					</div>
				</div> */}
        <p className="rtl text-[1.5vw] border-solid border-2 my-[1vw] p-[2vw] rounded-lg">
          {bio}
        </p>
        <div className="flex justify-between items-center w-full text-[1.5vw]">
          {/* Left Section (Empty or for other content) */}
          <div className="w-1/2 flex justify-between pr-5 items-center gap-2">
            <div className="phone-value text-[#555]">{email}</div>
            <h3 className="phone-label">ایمیل</h3>
          </div>

          {/* Right Section */}
          <div className="w-1/2 flex justify-between pl-5 items-center gap-2">
            <div className="phone-value text-[#555]">{phone}</div>
            <h3 className="phone-label">شماره تماس</h3>
          </div>
        </div>
      </section>
    </>
  );
}

export default PersonalInfo;
