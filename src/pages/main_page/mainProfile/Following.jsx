import FollowHeader from "../../../components/main/mainProfile/follow/FollowHeader";
import FollowSection from "../../../components/main/mainProfile/follow/FollowSection";
import { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useParams } from "react-router-dom";
import PostingContext from "../../../context/PostingProvider";
import { API_URL } from "../../../constants/defaultUrl";
import axios from "axios";

function Followings() {
  const [InfoState] = useContext(AuthContext);
  const [, setPostingState] = useContext(PostingContext);

  const params = useParams();
  const accountname = params.accountname;

  useEffect(() => {
    async function getFollowingUser() {
      try {
        const followingConfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const followingResponse = await axios.get(
          `${API_URL}/profile/${accountname}/following`,
          followingConfig
        );
        setPostingState((PostingState) => {
          PostingState.data[0] = {
            ...PostingState.data[0],
            followinguser: followingResponse.data,
          };
          return { data: PostingState.data };
        });
      } catch (error) {
        console.error(error);
      }
    }
    getFollowingUser();
  }, [accountname, InfoState.MyInformations, setPostingState]);
  return (
    <>
      <FollowHeader />
      <FollowSection />
    </>
  );
}

export default Followings;
