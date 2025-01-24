import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import AVT from "@/assets/A1.jpg";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmptySection from "@/components/EmptySection/EmptySection";
import styles from "./InvestorDialogBox.module.scss";
import { Button } from "@/components/ui/button";
import { getData } from "@/Services/ApiClient/Services";
import { useNavigate } from "react-router-dom";

const InvestotItem = ({ username, valueOfInvestment, investTime, id, profile }) => {
	const Navigate = useNavigate();
	function timeDiff(time) {
		const now = new Date(); // Current time
		const date = new Date(time); // Convert the comment time to a Date object

		const timeDifference = Math.floor((now - date) / 1000); // Difference in seconds

		if (timeDifference < 60) {
			return `همین الان`;
		} else if (timeDifference < 3600) {
			const minutes = Math.floor(timeDifference / 60);
			return `${minutes} دقیقه قبل`;
		} else if (timeDifference < 86400) {
			const hours = Math.floor(timeDifference / 3600);
			return `${hours} ساعت قبل`;
		} else {
			const days = Math.floor(timeDifference / 86400);
			return `${days} روز قبل`;
		}
	}
	const [avatar, setAvatar] = useState(null);
	useEffect(() => {
		getData(`/auth/baseuser_search_by_name/${username}/`).then((data) => {
			setAvatar(
				`http://localhost:8000${data.baseuser_profile.profile_picture}`
			);
		});
	}, []);
	return (
		<div
			className="flex gap-2 w-full hover:cursor-pointer"
			onClick={() => Navigate(`/profile/${username}`)}
		>
			<Avatar>
				<AvatarFallback>
					{username.slice(0, 2).toUpperCase()}
				</AvatarFallback>
				<AvatarImage src={profile} />
			</Avatar>
			<div className="flex rtl justify-between w-full">
				<Label className="rtl text-gray-400 hover:cursor-pointer place-self-center">
					{timeDiff(investTime)}
				</Label>
				<div className="flex flex-col justify-center items-end">
					<Label className="hover:cursor-pointer">{username}</Label>
					<Label className="text-xs hover:cursor-pointer">
						{valueOfInvestment}
					</Label>
				</div>
			</div>
			<div className="hidden">{id}</div>
		</div>
	);
};

const InvestorDialogBox = ({ className, projectId }) => {
	const mockData = [
		{ username: "Ali", avatar: AVT, valueOfInvestment: "1000$" },
		{ username: "Reza", avatar: AVT, valueOfInvestment: "2000$" },
		{ username: "Meahdi", avatar: AVT, valueOfInvestment: "300$" },
		{ username: "Medi", avatar: AVT, valueOfInvestment: "3000$" },
		{ username: "Maefhdi", avatar: AVT, valueOfInvestment: "300$" },
		{ username: "Mhdai", avatar: AVT, valueOfInvestment: "300$" },
		{ username: "ehdgi", avatar: AVT, valueOfInvestment: "300$" },
		{ username: "Meadi", avatar: AVT, valueOfInvestment: "3000$" },
		{ username: "Meahgi", avatar: AVT, valueOfInvestment: "300$" },
	];
	const [investments, setInvestments] = useState([]);
	useEffect(() => {
		getData(`/invest/history/project/${projectId}/amount/`).then((data) => {
			setInvestments(data);
			console.log("invest", data);
		});
	}, []);
	return (
		<>
			<div className={`${className}`}>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="link"
							className=" text-bomborange hover:text-black text-xl mb-3"
						>
							{investments.length} بار روی این پروژه سرمایه گذاری
							شده است.
						</Button>
					</DialogTrigger>
					<DialogContent className="pt-10 bg-white text-gray-600 rounded-lg w-96">
						<Label>سرمایه گذاران</Label>
						<Separator />
						<Command className="border-solid border-2 border-gray-200 p-3">
							<CommandInput
								className={`rtl ${styles.searchBox}`}
								placeholder="جستجو کنید ..."
							/>
							<CommandList>
								{/* <CommandEmpty>
									<EmptySection
										type="سرمایه گذار"
									/>
								</CommandEmpty> */}
								<CommandGroup heading="نتایج">
									{(investments ? investments : mockData).map(
										(item, index) => (
											<CommandItem
												className="hover:cursor-pointer"
												key={index}
											>
												<InvestotItem
													username={item.username}
													valueOfInvestment={
														item.investment_amount
													}
													investTime={
														item.investment_date
													}
													id={Math.random()}
                          profile={item.user_picture}
												/>
											</CommandItem>
										)
									)}
								</CommandGroup>
								<CommandEmpty>
									<EmptySection type="سرمایه گذار" />
								</CommandEmpty>
							</CommandList>
						</Command>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default InvestorDialogBox;
