"use client";

import * as React from "react";
// import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { Link } from "radix-ui";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { getDataParams } from "@/Services/ApiClient/Services";

const components = [
	{
		title: "تکنولوژی",
		subs: {
			"هوش مصنوعی": "/ai",
			"اینترنت اشیا": "/iot",
			امنیت: "/security",
			"نرم افزار": "/software",
			"واقعیت افزوده": "/ar",
		},
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "گردشگری",
		subs: {
			فرهنگی: "/cultural",
			"بین المللی": "/international",
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
			"سرمایه‌گذاری": "/financial",
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
			"سلامت روان": "/health",
			درمان: "/health",
		},
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

function NavbarDropDownSCN() {
	const Navigate = useNavigate();
	const [selected, setSelected] = React.useState(null);
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
	const searchProject = (category, subcategory) => {
		console.log(category, subcategory);
		setMainCategory(category);
		setSubcategory(subcategory);
		// setLoading(true);
		// const formData = {
		// 	category: category,
		// 	subcategory: subcategory,
		// 	search: searchQuery,
		// 	results_per_page: resultsPerPage,
		// 	page_number: pageNumber,
		// };
		// setPageNumber(1);
		// console.log(formData);
		// getDataParams(`/starboard/${sorting}/`, null, formData).then((data) => {
		// 	setResults(data.result_count);
		// 	setTotalPages(data.total_pages);
		// 	setProjects(data.results);
		// 	setLoading(false);
		// });
	};
	//   console.log(components);
	return (
		// <NavigationMenu className="translate-y-[-1.5vw] bg-transparent">
		//   <NavigationMenuList className="left-40">
		//     {components.map((comp, i) => {
		//       return (
		//         <NavigationMenuItem key={i} className="">
		//           <NavigationMenuTrigger className="bg-transparent text-black">
		//             {comp.title}
		//           </NavigationMenuTrigger>
		//           <NavigationMenuContent className={`ml-40`}>
		//             <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
		//               <li className="row-span-3">
		//                 <NavigationMenuLink asChild>
		//                   <a
		//                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
		//                     href={comp.href}
		//                   >
		//                     <div className="mb-2 mt-4 text-lg font-medium">
		//                       {comp.title}
		//                     </div>
		//                     <p className="text-sm leading-tight text-muted-foreground">
		//                       {comp.description}
		//                     </p>
		//                   </a>
		//                 </NavigationMenuLink>
		//               </li>
		//             </ul>
		//           </NavigationMenuContent>
		//         </NavigationMenuItem>
		//       );
		//     })}
		//   </NavigationMenuList>
		// </NavigationMenu>
		<div className="w-screen -translate-y-[1.5vh] h-7 mt-6 grid grid-cols-6 px-[9vw] gap-[1.5vw] sm:text-[1.6vw] md:text-[1.5vw] lg:text-[1.2vw] font-vazirmatn">
			{components.map((comp, i) => {
				return (
					<div
						key={i}
						className="place-items-center"
						onMouseEnter={() => setSelected(i)}
						onMouseLeave={() => setSelected(null)}
					>
						<div className="hover:cursor-pointer place-content-center h-fit ml-[2.5vw] px-[1vw] w-[12vw] flex  flex-row text-black">
							{comp.title}
							<FiChevronDown
								className={`mt-[0.7vh] ml-[0.2vw] transition ${
									selected == i
										? "rotate-180  duration-300"
										: ""
								}`}
							/>
						</div>
						<div
							className={`p-2 container rtl overflow-hidden grid text-center w-[15vw] bg-gray-800 mt-[1vh] rounded-md sm:-translate-x-[1vw] md:-translate-x-[0vw] ${
								selected === i
									? "grid-cols-2 gap-2 auto-rows-auto text-[1vw]"
									: "hidden"
							}`}
						>
							{Object.entries(comp.subs).map(([label], index) => (
								// <a
								// 	key={index}
								// 	href={link}
								// 	className="text-white hover:bg-gray-700 p-2 rounded-md"
								// >
								// 	{label}
								// </a>
								<div
									key={index}
									className="text-white hover:bg-gray-700 p-2 rounded-md hover:cursor-pointer"
									onClick={() => {
										console.log("label", comp.title, label);
										searchProject(comp.title, label);
										Navigate("/starboard");
									}}
								>
									{label}
								</div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default NavbarDropDownSCN;
