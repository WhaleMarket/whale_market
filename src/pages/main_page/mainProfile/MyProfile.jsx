import ChatProfileHeader from "../../../components/main/ChatProfileHeader";
import UserProfileSection from "../../../components/main/mainProfile/user_profile/UserProfileSection";
import ProductSection from "../../../components/main/mainProfile/user_profile/ProductSection";
import PostSection from "../../../components/main/mainProfile/user_profile/PostSection";
import { API_URL } from '../../../constants/defaultUrl';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from "../../../context/AuthProvider";

function MainProfile() {
  const [InfoState, setInfoState] = useContext(AuthContext);

  const params = useParams();
    const accountname = params.accountname;

    useEffect(() => {
        // 희: 유저 프로필 정보 받아오기
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

                setInfoState((InfoState) => {
                    InfoState.MyInformations[8] = {
                        ...InfoState.MyInformations[8],
                        accountname: response.data.profile.accountname,
                        username: response.data.profile.username,
                        image: response.data.profile.image,
                        intro: response.data.profile.intro,
                        following: response.data.profile.following,
                        follower: response.data.profile.follower,
                        isfollow: response.data.profile.isfollow,
                        followingCount: response.data.profile.followingCount,
                        followerCount: response.data.profile.followerCount,
                    };
                    return { MyInformations: InfoState.MyInformations }
                });
                
                console.log('마이프로덕트', InfoState.MyInformations[2]);
                console.log('유저인포', InfoState.MyInformations[8]);

            } catch (error) {
                console.error(error);
            }
        }
        getUser();
        
        // 희: 유저 상품 정보 받아오기
        async function getProduct() {
            try {
                const config = {
                    headers: {
                      Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                      "Content-type": "application/json",
                    },
                  };
                const response = await axios.get(
                    `${ API_URL }/product/${accountname}`,
                    config,
                );

                console.log(JSON.stringify(response));

                response.data.product.map((value) => {
                    return setInfoState((InfoState) => {
                      InfoState.MyInformations[9] = {
                        ...InfoState.MyInformations[9],
                        itemName: [
                          ...InfoState.MyInformations[9].itemName,
                          value.itemName,
                        ],
                        price: [...InfoState.MyInformations[9].price, value.price],
                        link: [...InfoState.MyInformations[9].link, value.link],
                        itemImage: [
                          ...InfoState.MyInformations[9].itemImage,
                          value.itemImage,
                        ],
                      };
                      return { MyInformations: InfoState.MyInformations };
                    });
                  });
                
                console.log('유저 프로덕트', InfoState.MyInformations[9]);


            } catch (error) {
                console.error(error);
            }
        }
        getProduct();

    }, [accountname]);
    
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
