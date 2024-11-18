import LogoutButton from "../Custom/LogoutButton/LogoutButton";
import HomeButton from "../Custom/HomeButton/HomeButton";
import NavbarLogin from "../Custom/NavbarLogin/NavbarLogin";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";

function Navbar() {
  return (
    <navbar>
      <LogoutButton />
      <HomeButton />
      {/* <NavbarLogin /> */}
      <NavbarLogin />
      <ProfileDropDown />
    </navbar>
  );
}

export default Navbar;
