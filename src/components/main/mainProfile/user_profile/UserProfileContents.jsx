import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import PostingContext from "../../../../context/PostingProvider";
import { API_URL } from "../../../../constants/defaultUrl";
import styled from "styled-components";
import messageIcon from "../../../../assets/icon-message-circle.png";
import shareIcon from "../../../../assets/icon-share.png";
import LoadingPage from "../../../../pages/LoadingPage";
import QuoteModal from "../../../modal/QuoteModal";

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 420px;
  padding: 30px 55px 26px;
  margin: 48px auto 0 auto;
  box-sizing: border-box;
  white-space: pre-wrap;

  @media screen and (max-width: 390px) {
    width: 100%;
    padding: 30px 4% 26px;
  }
`;


const PriceContent = styled.p`
  text-align: center;
  color: #515151;
  font-size: 16px;
  line-height: 24px;
`;

const PriceStrong = styled.strong`
  font-size: 19px;
  font-weight: 600;
  color: #00bcd4;
  word-wrap: break-word;
  word-break: break-all;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const ImgDiv = styled.div`
  width: 110px;
  height: 110px;
  margin: 20px auto 0;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
  line-height: 18px;
  text-align: center;
`;

const Followers = styled(Link)`
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
  background-color: white;
  background-image: url(${messageIcon});
  background-position: center center;
  background-size: 20px 20px;
  background-repeat: no-repeat;

  &:hover {
        cursor: pointer;
    }
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
  background-color: #ffffff;
  color: #767676;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  line-height: 18px;
  cursor: pointer;
  pointer-events: ${(props) => (props.click ? "all" : "none")};
`;

const ProductUploadButton = styled(Link)`
  padding: 8px 23px;
  border: 1px solid #dbdbdb;
  border-radius: 30px;
  background-color: #ffffff;
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
  const [quoteModal, setQuoteModal] = useState(false);
  const quoteList = [
    "칭찬은 고래도 춤추게 한다.",
    "오늘도 수고했어, 토닥토닥!",
    "좋은 칭찬 한 마디면 두 달을 견뎌 낼 수 있다.\n넌 오늘도 최고였어!",
    "넌 사랑받을 줄 아는 사람이야.",
    "백 마디 말보다 한 마디의 말로도 충분하다.\n고마워.",
    "온 우주가 널 도울거야!",
    "당신이 서 있는 오늘과 걸어온 모든 하루를 응원해요!",
    "가장 중요한 것은 눈에 보이지 않는 법이야.",
    "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아간다.",
    "사람은 행복하기로 마음먹은 만큼 행복해요!"
  ]

  const randomnumber = Math.random();

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
        {productResult.length !== 0 ? (
          <PriceContent>
            {PostingState.data[0].user.accountname}님의 웨일 포인트는
            <br />
            {" "}
            <PriceStrong>
              {productResult
                .map((value) => {
                  return value.price;
                })
                .reduce((a, b) => a + b)
                .toLocaleString("ko-KR")}
            </PriceStrong>
            원 적립됐습니다!
            <br />
            대단해요!
          </PriceContent>
        ) : (
          <PriceContent>
            {PostingState.data[0].user.accountname}님의 상품을 등록해
            <br />
            웨일 포인트를 쌓아보세요!
            <br />
            화이팅!
          </PriceContent>
        )}
        <ProfileWrapper>
        <Followers to={"/followers/" + PostingState.data[0].user.accountname}>
          <FollowCount>{PostingState.data[0].user.followerCount}</FollowCount>
          <FollowTxt>followers</FollowTxt>
        </Followers>
        <ImgDiv src={PostingState.data[0].user.image} />
        <Followings to={"/followings/" + PostingState.data[0].user.accountname}>
          <FollowCount>{PostingState.data[0].user.followingCount}</FollowCount>
          <FollowTxt>followings</FollowTxt>
        </Followings>
        </ProfileWrapper>
        <UserName>{PostingState.data[0].user.username}</UserName>
        <UserId>{`@${PostingState.data[0].user.accountname}`}</UserId>
        <UserIntro>{PostingState.data[0].user.intro}</UserIntro>
        <IconWrapper>
          {window.location.pathname !==
          `/main/profile/${InfoState.MyInformations[0].myAccountname}` ? (
            <>
              <MessageButton 
                onClick={
                  ()=>{setQuoteModal(!quoteModal)}
                }
              />
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
              <ProfileEditButton
                click={PostingState.data[0].accountname ? "true" : "false"}
                to="/profileedit"
              >
                프로필 수정
              </ProfileEditButton>
              <ProductUploadButton to="/productupload">
                상품 등록
              </ProductUploadButton>
            </>
          )}
        </IconWrapper>
      </UserProfileContainer>
      <QuoteModal
          quoteModal={quoteModal}
          setQuoteModal={setQuoteModal}
          msgcontent={`${PostingState.data[0].user.username}님이 ${InfoState.MyInformations[0].myUsername}에게 해주고 싶은 말은?`}
          content={quoteList[Math.ceil(randomnumber*10)-1]}
        />
    </>
  );
}

export default UserProfileCard;
