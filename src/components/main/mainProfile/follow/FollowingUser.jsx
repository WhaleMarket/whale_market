import React, { useState, useContext } from "react";
import AuthContext from "../../../../context/AuthProvider";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import PostingContext from "../../../../context/PostingProvider";
import LoadingPage from "../../../../pages/LoadingPage";

const Wrapper = styled.li`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #767676;
  padding: 10px 0;
`;

const StyledLink = styled(Link)`
  width: 50px;
  height: 50px;
`;

const UserImgDiv = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 0;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border-radius: 50%;
`;

const FollowInfo = styled.div`
  margin-left: 10px;
`;

const FollowName = styled.strong`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
`;

const FollowIntro = styled.p`
  margin-top: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #767676;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 15px;
`;

const FollowButton = styled.button`
  width: 100px;
  padding: 10px 0;
  border-radius: 26px;
  font-size: 12px;
  vertical-align: baseline;
  margin-right: 16px;
  border: ${(props) => (props.follow ? "solid 1px grey" : "none")};
  background-color: ${(props) => (props.follow ? "white" : "#00bcd4")};
  color: ${(props) => (props.follow ? "black" : "white")};
  &:hover {
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  margin-left: 16px;
  align-items: center;
`;

function FollowingUser() {
  const [InfoState] = useContext(AuthContext);
  const [PostingState, setPostingState] = useContext(PostingContext);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {PostingState.data[0].followinguser?.map((value, key) => {
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
                `${API_URL}/profile/${value.accountname}/follow`,
                {},
                config
              );

              if (
                PostingState.data[0].accountname ===
                InfoState.MyInformations[0].myAccountname
              ) {
                setPostingState((PostingState) => {
                  PostingState.data[0].followinguser[key] = {
                    ...PostingState.data[0].followinguser[key],
                    isfollow: true,
                  };
                  return { data: PostingState.data };
                });
              } else {
                const Followingconfig = {
                  headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    "Content-type": "application/json",
                  },
                };
                const Followingresponse = await axios.get(
                  `${API_URL}/profile/${PostingState.data[0].accountname}/following`,
                  Followingconfig
                );
                setPostingState((PostingState) => {
                  PostingState.data[0] = {
                    ...PostingState.data[0],
                    followinguser: Followingresponse.data,
                  };
                  return { data: PostingState.data };
                });
              }
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
                `${API_URL}/profile/${value.accountname}/unfollow`,
                config
              );

              if (
                PostingState.data[0].accountname ===
                InfoState.MyInformations[0].myAccountname
              ) {
                setPostingState((PostingState) => {
                  PostingState.data[0].followinguser[key] = {
                    ...PostingState.data[0].followinguser[key],
                    isfollow: false,
                  };
                  return { data: PostingState.data };
                });
              } else {
                const Followingconfig = {
                  headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    "Content-type": "application/json",
                  },
                };
                const Followingresponse = await axios.get(
                  `${API_URL}/profile/${PostingState.data[0].accountname}/following`,
                  Followingconfig
                );
                setPostingState((PostingState) => {
                  PostingState.data[0] = {
                    ...PostingState.data[0],
                    followinguser: Followingresponse.data,
                  };
                  return { data: PostingState.data };
                });
              }
              setLoading(false);
            } catch (error) {
              console.error(error);
            }
          }
          fetchData();
        };
        return loading ? (
          <LoadingPage />
        ) : (
          <Wrapper key={key}>
            <InfoWrapper>
              <StyledLink to={"/profile/" + value.accountname}>
                <UserImgDiv src={value.image} />
              </StyledLink>
              <FollowInfo>
                <FollowName>{value.username}</FollowName>
                <FollowIntro>{value.intro}</FollowIntro>
              </FollowInfo>
            </InfoWrapper>

            {value.accountname !==
              InfoState.MyInformations[0].myAccountname && (
              <FollowButton
                type="button"
                follow={value.isfollow}
                onClick={value.isfollow ? useHandleUnfollow : useHandleFollow}
              >
                {PostingState.data[0].accountname ===
                InfoState.MyInformations[0].myAccountname
                  ? value.isfollow
                    ? "언 팔로우"
                    : "팔로우"
                  : value.isfollow
                  ? "팔로우 취소"
                  : "팔로우"}
              </FollowButton>
            )}
          </Wrapper>
        );
      })}
    </>
  );
}

export default FollowingUser;
