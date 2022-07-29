import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import styled from "styled-components";
import whale from "../../assets/Logo.png";
import Feed from "../main/homeFeed/FeedContent";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 110px);
  padding: 50px 0 60px 0;
`;

const Logo = styled.img`
  width: auto;
  height: 100px;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 14px;
`;

const Search = styled.button`
  width: 120px;
  padding: 13px 0;
  margin-top: 20px;
  border: none;
  border-radius: 44px;
  background-color: #00bcd4;
  color: white;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

function HomeSection() {
  const [InfoState] = useContext(AuthContext);

  return parseInt(InfoState.MyInformations[0].myFollowingCount) > 0 ? (
    InfoState.MyInformations[5].accountname.length > 0 ? (
      <Feed />
    ) : (
      <Section>
        <Logo src={whale} alt="whale" />
        <Title>팔로우 한 유저들의 게시물이 없습니다.</Title>
        <Link to="/home/search">
          <Search type="button">검색하기</Search>
        </Link>
      </Section>
    )
  ) : (
    <Section>
      <Logo src={whale} alt="whale" />
      <Title>유저를 검색해 팔로우 해보세요!</Title>
      <Link to="/home/search">
        <Search type="button">검색하기</Search>
      </Link>
    </Section>
  );
}

export default HomeSection;
