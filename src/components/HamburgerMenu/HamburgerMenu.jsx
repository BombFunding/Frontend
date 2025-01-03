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
import { MdSpaceDashboard } from "react-icons/md";
import useTokenStore from "@/stores/TokenStore";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { useNavigate } from "react-router-dom";
// import { pic } from "../../assets/defaultpfp.png";
function HamburgerMenu({ isOpen, setOpen, mode }) {
	const Navigate = useNavigate();
	const { username, fullname, avatar } = useProfileStore();
	const { accessToken } = useTokenStore();
	const routes = [
		accessToken
			? {
					title: "پروفایل",
					href: `profile/${username}`,
					Icon: CgProfile,
			  }
			: {
					title: "ورود",
					href: "login",
					Icon: SlLogin,
			  },
		accessToken
			? { title: "داشبورد", href: "dashboard", Icon: MdSpaceDashboard }
			: { title: "ورود", href: "login", Icon: SlLogin },
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
	// const [isOpen, setOpen] = useState(false);
	const ref = useRef(null);
	const [showCategories, toggleShowCategories] = useState(false);
	// const [userdata, setUserdata] = useState({ username: "", fullname: "" });
	const [color, setColor] = useState("black");
	const { deleteToken } = useTokenStore();
	const {
		searchQuery,
		sorting,
		resultsPerPage,
		pageNumber,
		englishToPersian,
		setMainCategory,
		setSubcategory,
		setProjects,
		setLoading,
		reset,
	} = useStarboardStore();
	const searchProject = (category, subcategory) => {
		reset();
		setMainCategory(category);
		setSubcategory(subcategory);
		const formData = {
			category: englishToPersian[category],
			subcategory: englishToPersian[subcategory],
			search: searchQuery,
			results_per_page: resultsPerPage,
			page_number: pageNumber,
		};
		// console.log(`/starboard/${sorting}/`, formData);
		setLoading(true);
		getDataParams(`/starboard/${sorting}/`, null, formData).then((data) => {
			setProjects(data);
			setLoading(false);
		});
	};
	// useEffect(() => {
	// 	getData(`/auth/view_own_baseuser_profile/`).then((data) => {
	// 		setUserdata({
	// 			username: data.base_profile.name,
	// 			fullname:
	// 				data.base_profile.first_name +
	// 				" " +
	// 				data.base_profile.last_name,
	// 		});
	// 	});
	// }, []);

	const handleToggle = (value) => {
		setOpen(value);
		if (value === true) {
			setColor("gray");
		} else {
			setColor("black");
		}
	};

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
								if (route.title === "خروج" && !accessToken) {
									return null;
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
												<div className="w-[90px] rounded-full overflow-hidden border-solid border-2 border-bomborange">
													<img
														className="object-cover p-[0.125rem] rounded-full"
														src={avatar}
													/>
												</div>
											)}
											{route.title !== "پروفایل" ? (
												<span className="flex gap-1 text-lg">
													{route.title}
												</span>
											) : (
												<div className="flex flex-col gap-2">
													<div className="font-extrabold text-lg">
														{fullname}
													</div>
													<div className="text-sm">
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
																	console.log(
																		"label",
																		category.title
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
