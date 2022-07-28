import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import messageIcon from "../../../../assets/icon-message-circle.png";
import shareIcon from "../../../../assets/icon-share.png";
import AuthContext from "../../../../context/AuthProvider";
import PostingContext from "../../../../context/PostingProvider";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import LoadingPage from "../../../../pages/LoadingPage";

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 400px;
  padding: 30px 55px 26px;
  margin: 48px auto 0 auto;
  box-sizing: border-box;
`;

const ImgDiv = styled.div`
  width: 110px;
  height: 110px;
  margin: 20px auto 0;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border-radius: 50%;
`;

const UserName = styled.h1`
  font-weight: 700;
  margin: 16px 0 6px 0;
`;

const UserId = styled.span`
  color: #767676;
  font-size: 12px;
`;

const UserIntro = styled.span`
  margin: 16px 0 24px;
  color: #767676;
  font-size: 12px;
`;

const Followers = styled(Link)`
  position: absolute;
  left: 15px;
  top: 120px;
  text-align: center;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    left: 65px;
  }
`;

const FollowCount = styled.span`
  display: block;
  color: #000000;
  font-size: 18px;
  font-weight: 700;
`;

const FollowTxt = styled.span`
  color: #767676;
  font-size: 10px;
`;

const Followings = styled(Link)`
  position: absolute;
  right: 15px;
  top: 120px;
  text-align: center;
  text-decoration-line: none;
  @media screen and (max-width: 768px) {
    right: 65px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const MessageButton = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid #dbdbdb;
  border-radius: 30px;
  background-image: url(${messageIcon});
  background-position: center center;
  background-size: 20px 20px;
  background-repeat: no-repeat;
`;

const ShareButton = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid #dbdbdb;
  border-radius: 30px;
  background-color: inherit;
  background-image: url(${shareIcon});
  background-position: center center;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const ProfileEditButton = styled(Link)`
  padding: 8px 26px;
  border: 1px solid #dbdbdb;
  border-radius: 30px;
  background-color: #fff;
  color: #767676;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  line-height: 18px;
  cursor: pointer;
`;

const ProductUploadButton = styled(Link)`
  padding: 8px 23px;
  border: 1px solid #DBDBDB;
  border-radius: 30px;
  background-color: #FFFFFF;
  color: #767676;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  line-height: 18px;
  cursor: pointer;
`;

const FollowButton = styled.button`
  width: 200px;
  box-sizing: border-box;
  padding: 8px 41px;
  border: ${(props) => (props.follow ? "solid 0.5px grey" : "none")};
  border-radius: 30px;
  background-color: ${(props) => (props.follow ? "white" : "#00bcd4")};
  color: ${(props) => (props.follow ? "black" : "white")};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
`;

function UserProfileCard() {
  const [InfoState] = useContext(AuthContext);
  const [PostingState, setPostingState] = useContext(PostingContext);
  const [loading, setLoading] = useState(false);
  const [productResult, setProductResult] = useState([]);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("URL이 복사되었습니다.");
    });
  };

  const useHandleFollow = () => {
    async function fetchData() {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        await axios.post(
          `${API_URL}/profile/${PostingState.data[0].user.accountname}/follow`,
          {},
          config
        );

        const Userconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${API_URL}/profile/${PostingState.data[0].user.accountname}`,
          Userconfig
        );

        setPostingState((PostingState) => {
          PostingState.data[0] = {
            ...PostingState.data[0],
            user: response.data.profile,
          };
          return { data: PostingState.data };
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  };

  const useHandleUnfollow = () => {
    async function fetchData() {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        await axios.delete(
          `${API_URL}/profile/${PostingState.data[0].user.accountname}/unfollow`,
          config
        );

        const Userconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${API_URL}/profile/${PostingState.data[0].user.accountname}`,
          Userconfig
        );

        setPostingState((PostingState) => {
          PostingState.data[0] = {
            ...PostingState.data[0],
            user: response.data.profile,
          };
          return { data: PostingState.data };
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  };

  async function getProduct() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      };
      const response = await axios.get(
        `${API_URL}/product/${PostingState.data[0].accountname}/?limit=100&skip=0`,
        config
      );
      setProductResult(response.data.product);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    PostingState.data[0].accountname && getProduct();
  }, [PostingState.data[0].accountname]);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <UserProfileContainer>
        <p>
          현재 {PostingState.data[0].user.accountname}님의 값어치는{" "}
          <strong>
            {productResult.length !== 0 &&
              productResult
                .map((value) => {
                  return value.price;
                })
                .reduce((a, b) => a + b)
                .toLocaleString("ko-KR")}
          </strong>
          원 상승 했습니다! 대단해요!
        </p>
        <ImgDiv src={PostingState.data[0].user.image} />
        <UserName>{PostingState.data[0].user.username}</UserName>
        <UserId>{`@${PostingState.data[0].user.accountname}`}</UserId>
        <UserIntro>{PostingState.data[0].user.intro}</UserIntro>
        <Followers to={"/followers/" + PostingState.data[0].user.accountname}>
          <FollowCount>{PostingState.data[0].user.followerCount}</FollowCount>
          <FollowTxt>followers</FollowTxt>
        </Followers>
        <Followings to={"/followings/" + PostingState.data[0].user.accountname}>
          <FollowCount>{PostingState.data[0].user.followingCount}</FollowCount>
          <FollowTxt>followings</FollowTxt>
        </Followings>
        <IconWrapper>
          {window.location.pathname !==
          `/main/profile/${InfoState.MyInformations[0].myAccountname}` ? (
            <>
              <MessageButton />
              <FollowButton
                follow={PostingState.data[0].user.isfollow}
                type="button"
                onClick={
                  PostingState.data[0].user.isfollow
                    ? useHandleUnfollow
                    : useHandleFollow
                }
              >
                {PostingState.data[0].user.isfollow ? "언 팔로우" : "팔로우"}
              </FollowButton>
              <ShareButton onClick={copyUrl} />
            </>
          ) : (
            <>
              <ProfileEditButton to="/profileedit">
                프로필 수정
              </ProfileEditButton>
              <ProductUploadButton to="/productupload">
                상품 등록
              </ProductUploadButton>
            </>
          )}
        </IconWrapper>
      </UserProfileContainer>
    </>
  );
}

export default UserProfileCard;
