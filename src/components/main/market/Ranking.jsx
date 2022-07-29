import styled from "styled-components";
import crown from "../../../assets/crown.png";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios from "axios";
import { API_URL } from "../../../constants/defaultUrl";
import '../../../fonts/font.css';

const RankingSection = styled.section`
    margin: 40px 20px 20px;
    padding-bottom: 100px;
    text-align: center;
    color: #515151;
    box-sizing: border-box;

    @media screen and (max-width: 768px) {
      margin-top: 40px;
    }

    @media screen and (max-width: 390px) {
      width: 330px;
      margin: 0;
      padding: 0 4% 100px;
    }
`;

const RankingTit = styled.h1`
    font-family: 'TmoneyRoundWindExtraBold';
    font-size: 26px;
    color: #515151;

    @media screen and (max-width: 768px) {
      font-size: 20px;
    }

    @media screen and (max-width: 390px) {
    font-size: 22px;
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

      @media screen and (max-width: 768px) {
      font-size: 20px;
      width: 30px;
      height: 30px;
      background-size: 30px 30px;
      }
      
      @media screen and (max-width: 390px) {
      margin-right: 3px;
      }
    }
`;

const UserWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    width: 800px;
    margin: 20px auto;

    @media screen and (max-width: 768px) {
      margin: 30px auto;
      width: 380px;
    }

    @media screen and (max-width: 560px) {
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      margin: 40px 5%;
    }
`;

const FollowWrapper = styled.div`
    text-align: initial;
`;

const HeartNumber = styled.strong`
    font-family: 'TmoneyRoundWindExtraBold';
    font-size: 18px;
    color: #00BCD4;
`

const UserList = styled.p`
    font-size: 16px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    @media screen and (max-width: 768px) {
      font-size: 14px;
      line-height: 24px;
    }

    @media screen and (max-width: 390px) {
      font-size: 16px;
      line-height: 40px;
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
          let heart = 0;
          response.data.post.map((value) => {
            heart += value.heartCount;
          });
          data = [...data, [value.username, value.accountname, heart]];
          setFollowingPosting(data);
        });
      } catch (error) {
        console.error(error);
      }
    }
    getFollowingUser();
  }, [InfoState.MyInformations[0].myAccountname]);

  followingPosting.sort((a1, a2) => {
    return a1[2] !== a2[2]
      ? a1[2] > a2[2]
        ? -1
        : a1[2] < a2[2]
        ? 1
        : 0
      : a1[0] < a2[0]
      ? -1
      : a1[0] > a2[0]
      ? 1
      : 0;
  });

  const rendering1 = () => {
    const result = [];
    for (
      let i = 0;
      i < (followingPosting.length > 5 ? 5 : followingPosting.length);
      i++
    ) {
      result.push(
        <UserList key={i}>
          {i + 1}. {followingPosting[i][0]} @{followingPosting[i][1]}{" "}
          <HeartNumber>{followingPosting[i][2]}개</HeartNumber>
        </UserList>
      );
    }
    return result;
  };

  const rendering2 = () => {
    const result = [];
    for (
      let i = 5;
      i < (followingPosting.length > 10 ? 10 : followingPosting.length);
      i++
    ) {
      result.push(
        <UserList key={i}>
          {i + 1}. {followingPosting[i][0]} @{followingPosting[i][1]}{" "}
          <HeartNumber>{followingPosting[i][2]}개</HeartNumber>
        </UserList>
      );
    }
    return result;
  };

  return (
    <RankingSection>
      <RankingTit>가장 칭찬을 많이 받은 사람은?</RankingTit>
      <UserWrapper>
        <FollowWrapper>{rendering1()}</FollowWrapper>
        <FollowWrapper>{rendering2()}</FollowWrapper>
      </UserWrapper>
    </RankingSection>
  );
}

export default Ranking;
