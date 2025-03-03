"use client";
import * as React from "react";
import "./NavbarDropDownSCN.css";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";

const components = [
	{
		title: "تکنولوژی",
		subs: {
			"هوش مصنوعی": "/ai",
			"اینترنت اشیا": "/iot",
			امنیت: "/security",
			نرم‌افزار: "/software",
			"واقعیت افزوده": "/ar",
		},
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "گردشگری",
		subs: {
			فرهنگی: "/cultural",
			بین‌المللی: "/international",
			شهری: "/urban",
		},
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "آموزش",
		subs: {
			"کتاب و نشریات": "/books",
			"توسعه فردی": "/self-development",
			آموزشگاه: "/academy",
		},
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "مالی",
		subs: {
			"ارز دیجیتال": "/financial",
			بیمه: "/financial",
			"سرمایه‌ گذاری": "/financial",
		},
		description: "Visually or semantically separates content.",
	},
	{
		title: "هنری",
		subs: {
			سینما: "/arts",
			موسیقی: "/arts",
			"صنایع دستی": "/arts",
		},
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "سلامت",
		subs: {
			تغذیه: "/health",
			روان: "/health",
			درمان: "/health",
		},
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

// function Dropdown({ selected, i, comp }) {
//   const [isVisible, setIsVisible] = React.useState(false);
//   console.log(`selected: ${selected}, i: ${i}, comp: ${comp}`);
//   console.log(isVisible);

//   return (
//     <div
//       className={`p-2 container rtl overflow-hidden grid text-center w-[15vw] bg-gray-800 mt-1 rounded-md sm:-translate-x-[1vw] md:-translate-x-[0vw] ${
//         selected === i
//           ? "grid-cols-2 gap-2 auto-rows-auto text-[1vw] unfader"
//           : "hidden"
//         // : "opacity-0"
//       } pointer-events-${isVisible ? "all" : "none"}`}
//     >
//       {Object.entries(comp.subs).map(([label, link], index) => (
//         <a
//           key={index}
//           href={link}
//           className="text-white hover:bg-gray-700 p-2 rounded-md"
//         >
//           {label}
//         </a>
//       ))}
//     </div>
//   );
// }

function NavbarDropDownSCN() {
	const Navigate = useNavigate();
	const {
		searchQuery,
		sorting,
		resultsPerPage,
		pageNumber,
		setProjects,
		setTotalPages,
		setLoading,
		setPageNumber,
		setResults,
		setMainCategory,
		setSubcategory,
		reset,
	} = useStarboardStore();
	const [selected, setSelected] = React.useState(null);
	const [isHovering, setIsHovering] = React.useState(false);
	//   console.log(components);
	const handleMouseEnter = (index) => {
		setSelected(index);
		setIsHovering(true);
	};
	const searchProject = (category, subcategory) => {
		console.log(category, subcategory);
		setMainCategory(category);
		setSubcategory(subcategory);
	};
	const handleMouseLeave = () => {
		setIsHovering(false);
		setTimeout(() => setSelected(null), 500); // Delay hiding for smooth opacity transition
	};
	const Dropdown = ({ i, comp }) => (
		<div
			className={`p-2 container rtl overflow-hidden grid text-center w-[15vw] bg-gray-800 mt-1 rounded-md sm:-translate-x-[1vw] md:-translate-x-[0vw] ${
				selected === i
					? `${isHovering ? "unfader" : "opacity-0"}`
					: "hidden"
			}`}
		>
			{Object.entries(comp.subs).map(([label, link], index) => (
				<a
					key={index}
					href={link}
					className="text-white hover:bg-gray-700 p-2 rounded-md"
				>
					{label}
				</a>
			))}
		</div>
	);
	return (
		<div className="w-screen -translate-y-2 h-7 mt-6 grid grid-cols-6 px-[9vw] gap-[1.5vw] sm:text-[1.6vw] md:text-[0.75rem] lg:text-[1rem] font-vazirmatn">
			{components.map((comp, i) => {
				return (
					<div
						key={i}
						className="place-items-center"
						onMouseEnter={() => setSelected(i)}
						// onMouseEnter={() => handleMouseEnter()}
						onMouseLeave={() => setSelected(null)}
						// onMouseLeave={() => handleMouseLeave()}
					>
						<div className="hover:cursor-pointer place-content-center h-fit ml-[2.5vw] px-[1vw] w-[12vw] flex flex-row text-black">
							<label className="sm:translate-y-1 lg:translate-y-0">
								{comp.title}
							</label>
							<FiChevronDown
								className={`mt-1.5 ml-[0.2vw] transition ${
									selected == i
										? "rotate-180  duration-500"
										: ""
								}`}
							/>
						</div>
						{/* <Dropdown i={i} comp={comp} /> */}
						<div
							className={`p-2 container rtl overflow-hidden grid grid-cols-2 gap-2 auto-rows-auto text-[1vw] text-center w-[15vw] bg-gray-800 mt-1 rounded-md sm:-translate-x-[1vw] md:-translate-x-[0vw] ${
								selected === i
									? "unfader pointer-events-auto "
									: "fader pointer-events-none"
							}`}
						>
							{Object.entries(comp.subs).map(
								([label, link], index) => (
									<a
										key={index}
										className="text-white hover:bg-gray-700 p-2 rounded-md hover:cursor-pointer"
										onClick={() => {
											console.log(
												"label",
												comp.title,
												label
											);
											window.scrollTo(0, 0);
											searchProject(comp.title, label);
											Navigate("/starboard");
										}}
									>
										{label}
									</a>
								)
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default NavbarDropDownSCN;
