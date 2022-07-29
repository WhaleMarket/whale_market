import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../context/AuthProvider";
import PostingContext from "../../../context/PostingProvider";
import { API_URL } from "../../../constants/defaultUrl";
import RewardProfileHeader from "../../../components/main/RewardProfileHeader";
import UserProfileSection from "../../../components/main/mainProfile/user_profile/UserProfileSection";
import ProductSection from "../../../components/main/mainProfile/user_profile/ProductSection";
import PostSection from "../../../components/main/mainProfile/user_profile/PostSection";

function MainProfile() {
  const [InfoState] = useContext(AuthContext);
  const [, setPostingState] = useContext(PostingContext);

  const params = useParams();
  const accountname = params.accountname;

  // 희: 유저 프로필 정보 받아오기
  useEffect(() => {
    async function getUser() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${API_URL}/profile/${accountname}`,
          config
        );

        setPostingState((PostingState) => {
          PostingState.data[0] = {
            ...PostingState.data[0],
            accountname: accountname,
            user: response.data.profile,
          };
          return { data: PostingState.data };
        });
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [accountname, InfoState.MyInformations, setPostingState]);

  return (
    <>
      <RewardProfileHeader />
      <UserProfileSection />
      <ProductSection />
      <PostSection />
    </>
  );
}

export default MainProfile;
