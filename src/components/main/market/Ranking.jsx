import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import crown from "../../../assets/crown.png";
import AuthContext from "../../../context/AuthProvider";
import axios from "axios";
import { API_URL } from "../../../constants/defaultUrl";

const RankingSection = styled.section`
  margin: 50px;
  padding-bottom: 100px;
  text-align: center;
  color: #515151;
  @media screen and (max-width: 1200px) {
    margin-top: 40px;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    padding-bottom: 90px;
  }
`;

const RankingTit = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: #515151;
  @media screen and (max-width: 1200px) {
    font-size: 32px;
  }
  @media screen and (max-width: 480px) {
    margin: 14px auto;
  }
  ::before {
    display: inline-block;
    left: 0;
    vertical-align: middle;
    width: 48px;
    height: 48px;
    margin-right: 16px;
    background-image: url(${crown});
    background-size: 48px 48px;
    background-repeat: no-repeat;
    content: "";
  }
`;

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  margin: 50px auto;
  @media screen and (max-width: 1200px) {
    margin: 30px auto;
  }
  @media screen and (max-width: 480px) {
    width: 90%;
    gap: 16px;
  }
`;

const FollowWrapper = styled.div``;

const UserList = styled.p`
  font-size: 16px;
  line-height: 28px;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

function Ranking() {
  const [InfoState] = useContext(AuthContext);
  const [followingPosting, setFollowingPosting] = useState([]);
  useEffect(() => {
    async function getFollowingUser() {
      try {
        const followingConfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const followingResponse = await axios.get(
          `${API_URL}/profile/${InfoState.MyInformations[0].myAccountname}/following/?limit=100&skip=0`,
          followingConfig
        );
        let data = [];
        followingResponse.data.map(async (value) => {
          const config = {
            headers: {
              Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
              "Content-type": "application/json",
            },
          };
          const response = await axios.get(
            `${API_URL}/post/${value.accountname}/userpost/?limit=100&skip=0`,
            config
          );
          data = [...data, value.accountname, response.data.post];
          setFollowingPosting(data);
        });
      } catch (error) {
        console.error(error);
      }
    }
    getFollowingUser();
  }, [InfoState.MyInformations[0].myAccountname]);

  //   followingPosting.map((value) => {
  //     return value.length !== 0
  //       ? value.map((post) => {
  //           post.heartCount;
  //         })
  //       : value;
  //   });

  console.log(followingPosting);
  return (
    <RankingSection>
      <RankingTit>Ranking</RankingTit>
      <UserWrapper>
        <FollowWrapper>
          <UserList>1. follower name</UserList>
        </FollowWrapper>
        <FollowWrapper>
          <UserList>1. follower name</UserList>
        </FollowWrapper>
      </UserWrapper>
    </RankingSection>
  );
}

export default Ranking;
