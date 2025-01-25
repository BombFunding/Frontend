import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiChevronDown,
  FiHome,
  FiPieChart,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
function NavbarDropDown() {
  return (
    <div className="relative w-full z-[-30] justify-start top-[-3.8vh] bg-bomborang place-items-center">
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
      className="relative flex flex-row z-[-20] gap-[2vw] font-vazirmatn"
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
      className={`flex items-center z-[-10] gap-1 font-vazirmatn h-fit align-middle place-self-center rounded-lg px-3 py-1.5 text-sm transition-colors ${
        selected === tab ? "text-neutral-100" : "text-neutral-800"
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

const Content = ({ selected }) => {
  const [position, setPosition] = useState({ left: 0 });

  useEffect(() => {
    if (selected !== null) {
      updatePosition();
    }
  }, [selected]);

  const updatePosition = () => {
    const hoveredTab = document.getElementById(`shift-tab-${selected}`);
    if (!hoveredTab) return;

    const tabRect = hoveredTab.getBoundingClientRect();
    const contentWidth = 1000;
    const tabCenter = tabRect.left + tabRect.width / 2;

    setPosition({
      left: tabCenter - contentWidth / 2,
    });
  };

  return (
    <motion.div
      id="overlay-content"
      style={{ left: position.left }}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute top-[calc(100%_+_24px)] w-fit rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-[#1d232a] p-4"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => (
        <div className="overflow-hidden" key={t.id}>
          {selected === t.id && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <t.Component />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (selected !== null) {
      updateNubPosition();
    }
  }, [selected]);

  const updateNubPosition = () => {
    const hoveredTab = document.getElementById(`shift-tab-${selected}`);
    if (!hoveredTab) return;

    const tabRect = hoveredTab.getBoundingClientRect();
    const tabCenter = tabRect.left / 500 + tabRect.width * 2.2;

    setLeft(tabCenter);
  };

  return (
    <motion.span
      style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)" }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

const Technology = () => {
  return (
    <div>
      <div className="flex flex-row gap-10 ml-2">
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            هوش مصنوعی
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            اینترنت اشیا
          </a>
        </div>
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            امنیت
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            واقعیت افزوده
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            نرم افزار
          </a>
        </div>
      </div>

      <button className="ml-auto mt-2 flex items-center gap-1 text-sm text-indigo-300">
        <span>نمایش بیشتر</span>
        <FiArrowRight />
      </button>
    </div>
  );
};
const Tourism = () => {
  return (
    <div>
      <div className="flex flex-row gap-10 ml-2">
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            فرهنگی
          </a>
        </div>
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            بین المللی
          </a>
        </div>
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            شهری
          </a>
        </div>
      </div>

      <button className="ml-auto mt-2 flex items-center gap-1 text-sm text-indigo-300">
        <span>نمایش بیشتر</span>
        <FiArrowRight />
      </button>
    </div>
  );
};
const Education = () => {
  return (
    <div>
      <div className="flex flex-row gap-10 ml-2">
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            کتاب و نشریات
          </a>
        </div>
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            توسعه فردی
          </a>
          <a href="#" className="mt-2 block text-sm text-neutral-400">
            آموزشگاه
          </a>
        </div>
      </div>

      <button className="ml-auto mt-2 flex items-center gap-1 text-sm text-indigo-300">
        <span>نمایش بیشتر</span>
        <FiArrowRight />
      </button>
    </div>
  );
};
const Financial = () => {
  return (
    <div>
      <div className="flex flex-row gap-10 ml-2">
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            صندوق سرمایه گذاری
          </a>
        </div>
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            ارز دیجیتال
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            بیمه
          </a>
        </div>
      </div>

      <button className="ml-auto mt-2 flex items-center gap-1 text-sm text-indigo-300">
        <span>نمایش بیشتر</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const Arts = () => {
  return (
    <div>
      <div className="flex flex-row gap-10 ml-2">
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            صنایع دستی
          </a>
        </div>
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            سینما
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            موسیقی
          </a>
        </div>
      </div>

      <button className="ml-auto mt-2 flex items-center gap-1 text-sm text-indigo-300">
        <span>نمایش بیشتر</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const Health = () => {
  return (
    <div>
      <div className="flex flex-row gap-10 ml-2">
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            تغذیه
          </a>
        </div>
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            روان
          </a>
        </div>
        <div>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            درمان{" "}
          </a>
        </div>
      </div>

      <button className="ml-auto mt-2 flex items-center gap-1 text-sm text-indigo-300">
        <span>نمایش بیشتر</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const TABS = [
  {
    title: "تکنولوژی",
    Component: Technology,
  },
  {
    title: "گردشگری",
    Component: Tourism,
  },
  {
    title: "آموزش",
    Component: Education,
  },
  {
    title: "اعتباری",
    Component: Financial,
  },
  {
    title: "هنری",
    Component: Arts,
  },
  {
    title: "سلامت",
    Component: Health,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
