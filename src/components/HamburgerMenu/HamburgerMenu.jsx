import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
// import { routes } from "../../routes/routes";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GrTechnology } from "react-icons/gr";
import { IoMdBrush } from "react-icons/io";
import { BsHeartPulse, BsInfoCircle } from "react-icons/bs";
import { LuPlane } from "react-icons/lu";
import { FaBookOpen } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { SlLogin, SlLogout } from "react-icons/sl";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getDataParams } from "@/Services/ApiClient/Services";
import { MdSpaceDashboard, MdOutlineSpaceDashboard } from "react-icons/md";
import useTokenStore from "@/stores/TokenStore";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { RiListCheck } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
// import { pic } from "../../assets/defaultpfp.png";
function HamburgerMenu({ isOpen, setOpen, mode, token, setIsVisible }) {
	const ref = useRef(null);
	const [showCategories, toggleShowCategories] = useState(false);
	const [color, setColor] = useState("black");
	const { deleteToken } = useTokenStore();
	const Navigate = useNavigate();
	const { username, fullname, avatar } = useProfileStore();
	const { accessToken } = useTokenStore();
	const {
		searchQuery,
		sorting,
		resultsPerPage,
		pageNumber,
		setProjects,
		setLoading,
		setTotalPages,
		setPageNumber,
		setMainCategory,
		setResults,
		reset,
	} = useStarboardStore();
	const searchProject = (category, subcategory) => {
		setLoading(true);
		setMainCategory(category);
		window.scrollTo(0, 0);
		Navigate("/starboard");
	};

	const handleToggle = (value) => {
		setOpen(value);
		if (value === true) {
			setColor("gray");
		} else {
			setColor("black");
		}
	};
	const routes = [
		accessToken
			? {
					title: "پروفایل",
					href: `/profile/${username}`,
					Icon: CgProfile,
			  }
			: {
					title: "ورود",
					href: "/login",
					Icon: SlLogin,
			  },
		{
			title: "داشبورد",
			href: "/dashboard",
			Icon: MdOutlineSpaceDashboard,
		},
		{
			title: "استاربورد",
			href: "/starboard",
			Icon: RiListCheck,
		},
		{
			title: "خانه",
			href: "/",
			Icon: BiHomeAlt2,
		},
		{
			title: "جستجو",
			href: "",
			Icon: FiSearch,
		},
		{
			title: "دسته بندی ها",
			href: "",
			Icon: FiChevronDown,
			categories: [
				{
					title: "تکنولوژی",
					href: "/starboard",
					Icon: GrTechnology,
				},
				{
					title: "هنری",
					href: "/starboard",
					Icon: IoMdBrush,
				},
				{
					title: "سلامت",
					href: "/starboard",
					Icon: BsHeartPulse,
				},
				{
					title: "گردشگری",
					href: "/starboard",
					Icon: LuPlane,
				},
				{
					title: "آموزشی",
					href: "/starboard",
					Icon: FaBookOpen,
				},
				{
					title: "مالی",
					href: "/starboard",
					Icon: FaCoins,
				},
			],
		},
		{
			title: "درباره ما",
			href: "/aboutus",
			Icon: BsInfoCircle,
		},
		{
			title: "خروج",
			href: "#",
			Icon: SlLogout,
		},
	];
	// console.log(`fullname: ${fullname}`);
	return (
		<div ref={ref} className={`${mode}`}>
			<Hamburger
				toggled={isOpen}
				size={20}
				toggle={handleToggle}
				color={color}
			/>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed left-0 shadow-4xl h-screen right-0 p-5 overflow-hidden overflow-y-scroll pt-0 bg-neutral-950 border-b border-b-white/20"
					>
						<ul className="grid gap-2">
							{routes.map((route, idx) => {
								const { Icon } = route;
								if (route.title == "خروج" && !accessToken) {
									return;
								}
								return (
									<motion.li
										initial={{ scale: 0, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										key={idx}
										transition={{
											type: "spring",
											stiffness: 260,
											damping: 20,
											delay: 0.1 + idx / 10,
										}}
										className={`w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-700 via-neutral-950 ${
											!showCategories
												? "to-neutral-700"
												: "to-neutral-950"
										}`}
									>
										<a
											onClick={(e) => {
												if (route.categories) {
													e.preventDefault(); // Prevent navigation
													toggleShowCategories(
														(prev) => !prev
													);
												} else if (
													route.title === "خروج"
												) {
													deleteToken();
													handleToggle(false);
												} else if (
													route.title === "جستجو"
												) {
													e.preventDefault();
													setIsVisible(true);
												}
											}}
											href={route.href}
											className={`flex items-center justify-between w-full p-5 ${
												showCategories
													? ""
													: "rounded-xl"
											} bg-neutral-950`}
										>
											{route.categories ? (
												<Icon
													className={`transition-transform duration-300 ${
														showCategories
															? "rotate-180"
															: ""
													}`}
												/>
											) : route.title !== "پروفایل" ? (
												<Icon className="text-xl" />
											) : (
												<Avatar className="w-[17vw] h-[17vw] border-solid border-4 border-bomborange">
													<AvatarImage src={avatar} />
												</Avatar>
											)}
											{route.title !== "پروفایل" ? (
												<span className="flex gap-1 text-lg">
													{route.title}
												</span>
											) : (
												<div className="flex flex-col gap-2">
													<div className="font-extrabold text-[4.5vw]">
														{fullname ===
														"null null"
															? fullname
																	.split(
																		"null"
																	)
																	.join("")
															: fullname}
													</div>
													<div className="text-[2vw]">
														@{username}
													</div>
												</div>
											)}
										</a>
										{showCategories &&
											route.categories &&
											route.categories.map(
												(category, i) => {
													const { Icon } = category;
													return (
														<motion.li
															initial={{
																scale: 0,
																opacity: 0,
															}}
															animate={{
																scale: 1,
																opacity: 1,
															}}
															transition={{
																type: "spring",
																stiffness: 260,
																damping: 20,
															}}
															key={i}
															className="px-3 text-[#7e8089]"
														>
															<a
																onClick={() => {
																	setOpen(
																		false
																	);
																	searchProject(
																		category.title,
																		""
																	);
																}}
																className={
																	"flex justify-between w-full p-1 bg-inherit"
																}
																href={
																	category.href
																}
															>
																<Icon className="text-lg" />
																<span className="flex gap-1 text-md">
																	{
																		category.title
																	}
																</span>
															</a>
														</motion.li>
													);
												}
											)}
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
