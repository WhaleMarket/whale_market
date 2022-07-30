import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import { API_URL } from '../../constants/defaultUrl';
import RewardProfileHeader from '../../components/main/RewardProfileHeader';
import Market from '../../components/main/market';
import LoadingPage from '../LoadingPage';

function Reward() {
    const [InfoState] = useContext(AuthContext);
    const [RewardList, setRewardList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getReward() {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const response = await axios.get(
                    `${API_URL}/post/whalegm/userpost/?limit=4&skip=4`,
                    config
                );
                setRewardList(response.data.post);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getReward();
    }, [InfoState.MyInformations]);
    return loading ? (
        <LoadingPage />
    ) : (
        <>
            <RewardProfileHeader />
            <Market List={RewardList} />
        </>
    );
}

export default Reward;
