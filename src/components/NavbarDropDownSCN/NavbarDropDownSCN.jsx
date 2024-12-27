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

const components = [
  {
    title: "category1",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "category2",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "category3",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "category4",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "category5",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "category6",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function NavbarDropDownSCN() {
  const [selected, setSelected] = React.useState(null);
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
    <div className="w-screen -translate-y-2 h-7 grid grid-cols-6 px-[9vw] gap-[1.5vw] sm:text-[1.6vw] md:text-[1.5vw] lg:text-[1.2vw]">
      {components.map((comp, i) => {
        return (
          <div key={i}>
            <div
              className="hover:cursor-pointer h-fit ml-[2.5vw] px-[1vw] w-[12vw] flex flex-row text-black"
              onMouseEnter={() => setSelected(i)}
              onMouseLeave={() => setSelected(null)}
            >
              {comp.title}
              <FiChevronDown
                className={`mt-1.5 ml-[0.2vw] transition duration-400 ${
                  selected == i ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              className={`h-fit p-2 overflow-hidden text-center w-[15vw] bg-gray-800 mt-1 rounded-md sm:-translate-x-[1vw] md:-translate-x-[0vw] ${
                selected == i ? "" : "hidden"
              }`}
            >
              {comp.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NavbarDropDownSCN;
