import styled from "styled-components";
import search_icon from "../../assets/icon-search.png";
import { Link } from "react-router-dom";
import whale from "../../assets/whale-small.png";
import axios from "axios";
import { useState } from "react";

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 54px;
  padding: 13px 12px 13px 16px;
  border-bottom: 0.5px solid #BDBDBD;
  background-color: #FFFFFF;
  box-sizing: border-box;
`;

const Search = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: inherit;
  background-image: url(${search_icon});
  background-size: 24px 24px;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;

  ::before {
    display: inline-block;
    left: 0;
    vertical-align: middle;
    width: 28px;
    height: 18px;
    margin-right: 5px;
    background-image: url(${whale});
    background-size: 28px 18px;
    background-repeat: no-repeat;
    content: "";
  }
`;

const Today = styled.strong`
  font-size: 14px;
  margin-left: 16px;
`

function Header() {
  const date = new Date();
  const [weather, setWeather] = useState('');

  const TakeWeather = async() =>{
      const API_KEY = 'd4389cad7412a6a110847e67b352fffb';
      const CITY_NAME = 'SEOUL';
      await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
      ).then((response) => {
        console.log(response)
      setWeather(response.data.weather[0].main);
      })
  };
  TakeWeather();

  console.log(weather);

  return (
    <Head>
      <Title>
        웨일마켓 피드
        <Today>
          {date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 {date.toLocaleString("ko-KR", {weekday: "long"})} {weather}
        </Today>
      </Title>
      <Link to="/home/search">
        <Search />
      </Link>
    </Head>
  );
}

export default Header;
