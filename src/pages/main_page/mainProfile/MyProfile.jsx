import ChatProfileHeader from "../../../components/main/ChatProfileHeader";
import UserProfileSection from "../../../components/main/mainProfile/user_profile/UserProfileSection";
import ProductSection from "../../../components/main/mainProfile/user_profile/ProductSection";
import PostSection from "../../../components/main/mainProfile/user_profile/PostSection";
import { API_URL } from '../../../constants/defaultUrl';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import AuthContext from "../../../context/AuthProvider";

function MainProfile() {
    const [InfoState, setInfoState] = useContext(AuthContext);

    const params = useParams();
    const accountname = params.accountname;

    const [user, setUser] = useState({
        accountname: "",
        username: "",
        image: "",
        intro: "",
        followings: "",
        followers: "",
        isfollow: "",
        followingCount: "",
        followerCount: "",
    });

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
                    `${ API_URL }/profile/${accountname}`,
                    config,
                );

                console.log(JSON.stringify(response));

                setUser({
                    accountname: response.data.profile.accountname,
                    username: response.data.profile.username,
                    image: response.data.profile.image,
                    intro: response.data.profile.intro,
                    followings: response.data.profile.followingCount,
                    followers: response.data.profile.followerCount,
                    isfollow: response.data.profile.isfollow,
                    followingCount: response.data.profile.followingCount,
                    followerCount: response.data.profile.followingCount,
                });

            } catch (error) {
                console.error(error);
            }
        }
        getUser();

    }, [accountname]);
    
    return (
        <>
        <ChatProfileHeader />
        <UserProfileSection user={user} />
        {/* {InfoState.MyInformations[2].itemName.length !== 0 && <ProductSection />} */}
        <ProductSection accountname={accountname} />
        <PostSection accountname={accountname} />
        </>
    );
}

export default MainProfile;
