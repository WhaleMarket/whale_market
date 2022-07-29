import RewardProfileHeader from "../../components/main/RewardProfileHeader";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/defaultUrl";
import AuthContext from "../../context/AuthProvider";
import Market from "../../components/main/market";

function Reward() {
  const [InfoState] = useContext(AuthContext);
  const [RewardList, setRewardList] = useState([]);

  useEffect(() => {
    async function getReward() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${API_URL}/post/whalegm/userpost/?limit=4&skip=4`,
          config
        );
        setRewardList(response.data.post);
      } catch (error) {
        console.error(error);
      }
    }
    getReward();
  }, [InfoState.MyInformations]);
  return (
    <>
      <RewardProfileHeader />
      <Market List={RewardList} />
    </>
  );
}

export default Reward;
