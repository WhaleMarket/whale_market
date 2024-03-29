import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';
import PostingContext from '../../../context/PostingProvider';
import { API_URL } from '../../../constants/defaultUrl';
import LoadingPage from '../../LoadingPage';
import FollowHeader from '../../../components/main/mainProfile/follow/FollowHeader';
import FollowSection from '../../../components/main/mainProfile/follow/FollowSection';

function Followings() {
    const [InfoState] = useContext(AuthContext);
    const [, setPostingState] = useContext(PostingContext);
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const accountname = params.accountname;

    useEffect(() => {
        async function getUser() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
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

    useEffect(() => {
        async function getFollowingUser() {
            setLoading(true);
            try {
                const followingConfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const followingResponse = await axios.get(
                    `${API_URL}/profile/${accountname}/following/?limit=100&skip=0`,
                    followingConfig
                );
                setPostingState((PostingState) => {
                    PostingState.data[0] = {
                        ...PostingState.data[0],
                        followinguser: followingResponse.data,
                    };
                    return { data: PostingState.data };
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getFollowingUser();
    }, [accountname, InfoState.MyInformations, setPostingState]);
    return loading ? (
        <LoadingPage />
    ) : (
        <>
            <FollowHeader />
            <FollowSection />
        </>
    );
}

export default Followings;
