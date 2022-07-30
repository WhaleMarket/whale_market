import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';
import PostingContext from '../../../context/PostingProvider';
import { API_URL } from '../../../constants/defaultUrl';
import FollowHeader from '../../../components/main/mainProfile/follow/FollowHeader';
import FollowSection from '../../../components/main/mainProfile/follow/FollowSection';
import LoadingPage from '../../LoadingPage';

function Followers() {
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
        async function getFollowerUser() {
            setLoading(true);
            try {
                const followerConfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const followerResponse = await axios.get(
                    `${API_URL}/profile/${accountname}/follower/?limit=100&skip=0`,
                    followerConfig
                );
                setPostingState((PostingState) => {
                    PostingState.data[0] = {
                        ...PostingState.data[0],
                        followeruser: followerResponse.data,
                    };
                    return { data: PostingState.data };
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getFollowerUser();
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

export default Followers;
