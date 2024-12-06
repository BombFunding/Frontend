import PublicCommonProfile from "@/components/Profile/CommonProfile/PublicCommonProfile/PublicCommonProfile";
import useTokenStore from "@/stores/TokenStore";
import Error from "../Error/Error";
import StartupProfile from "@/components/Profile/Startup/Startup";
import InvestorProfile from "@/components/Profile/Investor/Investor";

const Profile = () => {
  const userType = useTokenStore((state) => state.userType);
  switch (userType) {
    case "startup":
      return (
        <>
          <PublicCommonProfile className="w-[85vw]" />
          <StartupProfile />
        </>
      );
      break;
    case "investor":
      return (
        <>
          <PublicCommonProfile className="w-[85vw]" />
          <InvestorProfile />
        </>
      );
      break;
    case "basic":
      return (
        <>
          <PublicCommonProfile className="w-[85vw]" />
          <BasicProfile />
        </>
      );
      break;
    default:
      return <Error />;
      break;
  }
};

export default Profile;
