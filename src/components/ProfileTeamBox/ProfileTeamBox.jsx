import ProfileTeamItem from "../ProfileTeamItem/ProfileTeamItem";
import prof01 from "../../assets/Profile01.jpg";
import prof02 from "../../assets/A1.jpg";
import prof03 from "../../assets/baner.jpg";
import prof04 from "../../assets/defaultpfp.png";
import prof05 from "../../assets/logo.png";
import "./scrollBox.css";
// import p from "../../assets/";

const children = [
  {
    name: "علیرضا رحیمی",
    role: "فرانت فلک زده",
    details: ".لطفا در پروسه حذف کمکم کنید",
    profile: prof01,
  },
  {
    name: "عرفان تاجیک میرزایی",
    role: "فرانت خر",
    details: "بستنی میخوام، خوشمزه باشه",
    profile: prof02,
  },
  {
    name: "امین فیروزی",
    role: "فرانت خسته",
    details: ".غلامرضا هستم",
    profile: prof03,
  },
  {
    name: "میلاد زارعی",
    role: "بک لایق و کارکن",
    details: "بی پلنه",
    profile: prof04,
  },
  {
    name: "ترانه عبداللهی",
    role: "بک سریع و پیگیر",
    details: ".اسپرینت فیل شه همتونو میکشم به ولای علی",
    profile: prof05,
  },
];

function ProfileTeamBox() {
  return (
    <div className="hide-scrollbar place-items-center rounded-lg flex flex-row overflow-hidden overflow-x-scroll hide-scrollbar w-[90vw] py-5 px-5 bg-neutral-100 mt-24 text-yellow-500 gap-7">
      {children.map((child, i) => (
        <ProfileTeamItem
          name={child.name}
          role={child.role}
          details={child.details}
          profile={child.profile}
          key={i}
        />
      ))}
    </div>
  );
}

export default ProfileTeamBox;
