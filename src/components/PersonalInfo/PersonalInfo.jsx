import headerpic from "../../assets/upProfile.jpg";
import styles from "./PersonalInfo.module.scss";
import defaultpfp from "../../assets/defaultpfp.png";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
function PersonalInfo({ loading }) {
  const x = true;
  const { fullname, username, phone, email, bio, avatar, header } =
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
        } absolute place-self-end rounded-full w-[72px] h-[72px]  sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] lg:w-[130px] lg:h-[130px] xl:w-[165px] xl:h-[165px] object-cover translate-x-[-5vw] mt-[6vw] border-solid ${
          loading ? "" : "ring-[0.5vw]"
        } ring-bomborange`}
      />
      <Button
        className="absolute border-solid border-2 bg-bomborange hover:bg-white flex items-center justify-center"
        style={{
          width: "clamp(60px, 10vw, 150px)",
          height: "calc(clamp(60px, 10vw, 150px) / 3)",
          fontSize: "calc(clamp(60px, 10vw, 150px) / 10)",
          top: "clamp(2px, 5vh, 40px)",
          left: "clamp(10px, 5vw, 25px)",
        }}
        onClick={() => {
          window.scrollTo(0, 0);
          Navigate("/editprofile");
        }}
      >
        <span>ویرایش اطلاعات</span>
      </Button>

      {/* <Likes count={2} className="absolute mt-[11.2vw] ml-[1.5vw]" /> */}
      <Label className="text-xl pt-[3vw] mr-4">اطلاعات کاربری</Label>
      <div className="absolute translate-x-[5.2vw] -translate-y-[4vh] z-0"></div>
      <div className="flex justify-between">
        <h1 className="text-gray-500 text-lg place-self-center ml-4">
          @{username}
        </h1>
        {fullname !== "null null" && (
          <h1 className={`text-xl mr-4`}>{fullname}</h1>
        )}
      </div>
      <section
        className={`${
          x ?? "border-solid border-2 border-bomborange"
        } border-solid border-2 border-bomborange rounded-lg py-[3vw] px-[5vw] place-content-end`}
      >
        {/* <div className="flex gap-[0.75vw]">
					<img src={calendarIcon} className="h-[2vw]" />
					<div className="text-[1.5vw] place-self-center place-content-center align-middle">
						عضویت از 2024/12/5
					</div>
				</div> */}
        <div className="flex justify-between items-center w-full text-[1.5vw]">
          {/* Left Section (Empty or for other content) */}

          {/* Right Section */}
          <div className="w-1/2 flex justify-end pl-5 items-center gap-2">
            {phone && (
              <>
                <div className="phone-value text-[#555]">{phone}</div>
                <Label className="text-xl">شماره تماس</Label>
              </>
            )}
          </div>
          <div className="w-1/2 flex justify-end pr-5 items-center gap-2">
            <div className="phone-value text-[#555]">{email}</div>
            <Label className="text-xl">ایمیل</Label>
          </div>
        </div>
        {bio && (
          <div className="mt-6">
            <Label className="text-lg mr-4">بیوگرافی</Label>
            <p className="rtl text-[1.5vw] border-solid border-2 mt-2 p-[2vw] rounded-lg">
              {bio}
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default PersonalInfo;
