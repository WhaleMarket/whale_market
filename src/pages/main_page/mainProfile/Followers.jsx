import FollowHeader from "../../../components/main/mainProfile/follow/FollowHeader";
import FollowSection from "../../../components/main/mainProfile/follow/FollowSection";
import { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useParams } from "react-router-dom";
import PostingContext from "../../../context/PostingProvider";
import axios from "axios";
import { API_URL } from "../../../constants/defaultUrl";

function Followers() {
  const [InfoState] = useContext(AuthContext);
  const [, setPostingState] = useContext(PostingContext);

  const params = useParams();
  const accountname = params.accountname;

  useEffect(() => {
    async function getFollowerUser() {
      try {
        const followerConfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const followerResponse = await axios.get(
          `${API_URL}/profile/${accountname}/follower`,
          followerConfig
        );
        setPostingState((PostingState) => {
          PostingState.data[0] = {
            ...PostingState.data[0],
            followeruser: followerResponse.data,
          };
          return { data: PostingState.data };
        });
      } catch (error) {
        console.error(error);
      }
    }
    getFollowerUser();
  }, [accountname, InfoState.MyInformations, setPostingState]);
  return (
    <>
      <FollowHeader />
      <FollowSection />
    </>
  );
}

export default Followers;
