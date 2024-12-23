import styles from "./ProfileDropDown.module.scss";
import profile from "../../assets/defaultpfp.png";
import { useNavigate } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import LogoutButton from "../Custom/LogoutButton/LogoutButton";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { useEffect } from "react";

function ProfileDropDown() {
	const { avatar, username } = useProfileStore();
	const Navigate = useNavigate();
	useEffect(() => {
		console.log("avatar: ", avatar);
	}, []);
	return (
		<DropdownMenu className="z-30">
			<DropdownMenuTrigger className={styles.trigger}>
				<img
					src={avatar}
					alt="Avatar"
					className={styles.ProfileNavbar}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={styles.content}>
				<DropdownMenuItem
					className={styles.item}
					onClick={() => Navigate(`/profile/${username}`)}
				>
					پروفایل
				</DropdownMenuItem>
				<DropdownMenuItem
					className={styles.item}
					onClick={() => Navigate("/dashboard")}
				>
					داشبورد
				</DropdownMenuItem>
				{/* <DropdownMenuItem
					className={styles.item}
					onClick={() => Navigate("/starboard")}
				>
					استار بورد
				</DropdownMenuItem>
				<DropdownMenuItem
					className={styles.item}
					onClick={() => Navigate("/invesboard")}
				>
					اینوس بورد
				</DropdownMenuItem> */}
				<DropdownMenuItem className={styles.logout}>
					<LogoutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default ProfileDropDown;
