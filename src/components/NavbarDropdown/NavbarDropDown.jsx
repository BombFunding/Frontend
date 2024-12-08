import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiBarChart2,
  FiChevronDown,
  FiHome,
  FiPieChart,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import TeamPic from "../../assets/TeamPic.jpg";
import Inv1 from "../../assets/Investor1.jpg";
import Inv2 from "../../assets/Investor2.jpg";
import Inv3 from "../../assets/Investor3.jpg";
import Inv4 from "../../assets/Investor4.jpg";
import { Avatar } from "../ui/avatar";

function NavbarDropDown() {
  return (
    <div className="relative w-full h-full z-[-30] justify-start bg-bomborang text-neutral-200 md:justify-end place-items-center">
      <Tabs />
    </div>
  );
}

export default NavbarDropDown;

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex flex-row z-[-20] gap-10 font-vazirmatn"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center z-[-10] gap-1 font-vazirmatn h-full align-middle place-self-center rounded-lg px-3 py-1.5 text-sm transition-colors ${
        selected === tab ? " bg-bomborange text-neutral-100" : "text-neutral-800"
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-[#1d232a] p-4"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

const Startups = () => {
  return (
    <div>
      <div className="flex flex-row gap-10 ml-2">
        <div>
          <h3 className="mb-2 text-sm font-medium">آرایشی بهداشتی</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            اکستنشن تهرانی
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            آقایی
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            سفیر
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            روژا
          </a>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">تکنولوژی</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            پارسا الکترونیکز
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            تکنولایف
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            مقداد آی تی
          </a>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">خرید و فروش</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            ترب
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            دیوار
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            شیپور
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            باسلام
          </a>
        </div>
      </div>

      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>نمایش بیشتر</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const Investors = () => {
  return (
    <div className="h-32 gap-4 divide-x divide-neutral-700 flex flex-row ">
      <a
        href="#"
        className="flex flex-col w-1/4 h-full items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <img src={Inv1} className="object-hidden rounded-md" />
        <span className="text-xs mt-2">پویا</span>
      </a>
      <a
        href="#"
        className="flex flex-col w-1/4 h-full items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <img src={Inv2} className="object-hidden rounded-md" />
        {/* <Avatar ref={Inv2} /> */}
        <span className="text-xs mt-2">طاها</span>
      </a>
      <a
        href="#"
        className="flex flex-col w-1/4 h-full items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <img src={Inv3} className="object-hidden rounded-md" />
        {/* <Avatar ref={Inv2} /> */}
        <span className="text-xs mt-2">ایمان</span>
      </a>
      <a
        href="#"
        className="flex flex-col w-1/4 h-full items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <img src={Inv4} className="object-hidden rounded-md" />
        {/* <Avatar ref={Inv2} /> */}
        <span className="text-xs mt-2">سعید</span>
      </a>
      {/* <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiPieChart className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Enterprise</span>
      </a> */}
    </div>
  );
};

const AboutUs = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <a href="#" className="">
          <img
            className="mb-2 h-14 w-full rounded object-cover"
            src={TeamPic}
            alt="Team members image"
          />
          <h4 className="mb-0.5 text-sm font-medium">تیم لایق فرانت</h4>
          <p className="text-xs text-neutral-400">
            تیم لایق و زحمتکش جلو-انتها که مداوم با تلاش های روزافزون در راستای
            تکمیل وظایف محول شده در اسپرینت به انجام آنها پرداختند
          </p>
        </a>
        <a href="#" className="">
          <img
            className="mb-2 h-14 w-full rounded object-cover"
            src={TeamPic}
            alt="Team members image"
          />
          <h4 className="mb-0.5 text-sm font-medium">تیم کارکن بک</h4>
          <p className="text-xs text-neutral-400">
            تیم بک که شامل میلاد زارعی و ترانه عبداللهی می باشد به مقدار زیادی
            کار می کنند
          </p>
        </a>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>View more</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const TABS = [
  {
    title: "استارت آپ ها",
    Component: Startups,
  },
  {
    title: "سرمایه گذاران",
    Component: Investors,
  },
  {
    title: "درباره ما",
    Component: AboutUs,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
