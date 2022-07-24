import ChatProfileHeader from "../../../components/main/ChatProfileHeader";
import UserProfileSection from "../../../components/main/mainProfile/user_profile/UserProfileSection";
import ProductSection from "../../../components/main/mainProfile/user_profile/ProductSection";
import PostSection from "../../../components/main/mainProfile/user_profile/PostSection";

function MainProfile() {
  return (
    <>
      <ChatProfileHeader />
      <UserProfileSection />
      <ProductSection />
      <PostSection />
    </>
  );
}

export default MainProfile;
