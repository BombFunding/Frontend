import { useClickAway } from "react-use";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
// import { routes } from "../../routes/routes";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const routes = [
  {
    title: "خانه",
    href: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "پروفایل",
    href: "EditProfile",
    Icon: CgProfile,
  },
  {
    title: "جستجو",
    href: "",
    Icon: FiSearch,
  },
  // {
  //   title: "Pricing",
  //   href: "editprofile",
  //   Icon: IoPricetagsOutline,
  // },
  // {
  //   title: "About",
  //   href: "#",
  //   Icon: PiChatCircleBold,
  // },
];

function HamburgerMenu({ isOpen, setOpen, mode }) {
  // const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className={mode}>
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20"
            className="fixed left-0 shadow-4xl right-0 top-[3rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20"
          >
            <ul className="grid gap-2">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                  >
                    <a
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                      }
                      href={route.href}
                    >
                      <Icon className="text-xl" />
                      <span className="flex gap-1 text-lg">{route.title}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HamburgerMenu;
