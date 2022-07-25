import ChatProfileHeader from "../../../components/main/ChatProfileHeader";
import UserProfileSection from "../../../components/main/mainProfile/user_profile/UserProfileSection";
import ProductSection from "../../../components/main/mainProfile/user_profile/ProductSection";
import PostSection from "../../../components/main/mainProfile/user_profile/PostSection";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";

function MainProfile() {
  const [InfoState] = useContext(AuthContext);
  return (
    <>
      <ChatProfileHeader />
      <UserProfileSection />
      {InfoState.MyInformations[2].itemName.length !== 0 && <ProductSection />}
      <PostSection />
    </>
  );
}

export default MainProfile;
