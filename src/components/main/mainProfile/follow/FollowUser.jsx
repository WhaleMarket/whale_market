import React, { useContext } from "react";
import AuthContext from "../../../../context/AuthProvider";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";

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
`;

const FollowButton = styled.button`
  width: 100px;
  padding: 10px 0;
  border-radius: 1.625rem;
  font-size: 12px;
  vertical-align: baseline;
  border: ${(props) => (props.follow ? "solid 1px grey" : "none")};
  background-color: ${(props) => (props.follow ? "white" : "black")};
  color: ${(props) => (props.follow ? "black" : "white")};
  &:hover {
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

function FollowUser() {
  const [InfoState, setInfoState] = useContext(AuthContext);

  const rendering = () => {
    const result = [];

    for (let i = 0; i < InfoState.MyInformations[6].accountname.length; i++) {
      const useHandleFollow = () => {
        async function fetchData() {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                "Content-type": "application/json",
              },
            };
            await axios.post(
              `${API_URL}/profile/${InfoState.MyInformations[6].accountname[i]}/follow`,
              {},
              config
            );

            const Followerconfig = {
              headers: {
                Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                "Content-type": "application/json",
              },
            };
            const Followerresponse = await axios.get(
              `${API_URL}/profile/${InfoState.MyInformations[0].myAccountname}/follower`,
              Followerconfig
            );
            setInfoState((InfoState) => {
              InfoState.MyInformations[6] = {
                ...InfoState.MyInformations[6],
                isfollow: Followerresponse.data.map((item) => {
                  return item.isfollow;
                }),
              };
              return { MyInformations: InfoState.MyInformations };
            });

            //followercount 변경
            const Myinfoconfig = {
              headers: {
                Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                "Content-type": "application/json",
              },
            };
            const Myinforesponse = await axios.get(
              `${API_URL}/user/myinfo`,
              Myinfoconfig
            );
            setInfoState((InfoState) => {
              InfoState.MyInformations[0] = {
                ...InfoState.MyInformations[0],
                myFollowingCount: Myinforesponse.data.user.followingCount,
              };
              return { MyInformations: InfoState.MyInformations };
            });
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      };

      const useHandleUnfollow = () => {
        async function fetchData() {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                "Content-type": "application/json",
              },
            };
            await axios.delete(
              `${API_URL}/profile/${InfoState.MyInformations[6].accountname[i]}/unfollow`,
              config
            );

            //follower 변경
            const Followerconfig = {
              headers: {
                Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                "Content-type": "application/json",
              },
            };
            const Followerresponse = await axios.get(
              `${API_URL}/profile/${InfoState.MyInformations[0].myAccountname}/follower`,
              Followerconfig
            );
            setInfoState((InfoState) => {
              InfoState.MyInformations[6] = {
                ...InfoState.MyInformations[6],
                isfollow: Followerresponse.data.map((item) => {
                  return item.isfollow;
                }),
              };
              return { MyInformations: InfoState.MyInformations };
            });

            //followercount 변경
            const Myinfoconfig = {
              headers: {
                Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                "Content-type": "application/json",
              },
            };
            const Myinforesponse = await axios.get(
              `${API_URL}/user/myinfo`,
              Myinfoconfig
            );
            setInfoState((InfoState) => {
              InfoState.MyInformations[0] = {
                ...InfoState.MyInformations[0],
                myFollowingCount: Myinforesponse.data.user.followingCount,
              };
              return { MyInformations: InfoState.MyInformations };
            });
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      };

      result.push(
        <Wrapper key={i}>
          <InfoWrapper>
            <StyledLink to={"/" + InfoState.MyInformations[6].accountname[i]}>
              <UserImgDiv src={InfoState.MyInformations[6].image[i]} />
            </StyledLink>
            <FollowInfo>
              <FollowName>{InfoState.MyInformations[6].username[i]}</FollowName>
              <FollowIntro>{InfoState.MyInformations[6].intro[i]}</FollowIntro>
            </FollowInfo>
          </InfoWrapper>

          <FollowButton
            type="button"
            follow={InfoState.MyInformations[6].isfollow[i]}
            onClick={
              InfoState.MyInformations[6].isfollow[i]
                ? useHandleUnfollow
                : useHandleFollow
            }
          >
            {InfoState.MyInformations[6].isfollow[i] ? "팔로우 취소" : "팔로우"}
          </FollowButton>
        </Wrapper>
      );
    }
    return result;
  };

  return <>{rendering()}</>;
}

export default FollowUser;
