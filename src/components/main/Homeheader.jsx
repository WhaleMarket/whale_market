import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import search_icon from '../../assets/icon-search.png';
import whale from '../../assets/whale-small.png';
import clear from '../../assets/sun.png';
import snow from '../../assets/snow.png';
import thunderstorm from '../../assets/thunder.png';
import rain from '../../assets/rain.png';
import mist from '../../assets/fog.png';
import clouds from '../../assets/cloud.png';

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 54px;
    padding: 13px 12px 13px 16px;
    border-bottom: 0.5px solid #bdbdbd;
    background-color: #ffffff;
    box-sizing: border-box;

    @media screen and (max-width: 390px) {
        padding: 13px 2% 13px;
    }
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

const Title = styled.div`
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
        content: '';
    }
`;

const Today = styled.strong`
    font-size: 14px;
    margin-left: 16px;

    @media screen and (max-width: 390px) {
        margin-left: 5px;
        font-size: 12px;
    }
`;

const TodayWeather = styled.img`
    height: 16px;
    width: auto;
    margin-left: 5px;
    vertical-align: middle;
`;

const ArrowBox = styled.p`
    display: none;
    position: absolute;
    top: 52px;
    left: 255px;
    width: 150px;
    padding: 8px;
    border-radius: 8px;
    background: #444444ba;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    
    &.on{
        display: block;
    }
    &::after{
        position: absolute;
        left: 50%;
        bottom: 100%;
        width: 0;
        height: 0;
        margin-left: -10px;
        border: solid transparent;
        border-color: rgba(51, 51, 51, 0);
        border-bottom-color: #444444ba;
        border-width: 10px;
        pointer-events: none;
        content: ' ';
    }

    @media screen and (max-width: 390px) {
        left: 190px;

        &::after{
        left: 65%;
        }
    }
`

function Header() {
    const date = new Date();
    const [weather, setWeather] = useState('');
    const [hover, setHover] = useState(false);
    // const [weatherIcon, setWeatherIcon] = useState('')
    
    const TakeWeather = async () => {
        const API_KEY = 'd4389cad7412a6a110847e67b352fffb';
        const CITY_NAME = 'SEOUL';
        await axios
        .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
            )
            .then((response) => {
                setWeather(response.data.weather[0].main);
            });
        };
        TakeWeather();

        // switch (weather.toLowerCase()) {
        //     case 'clear':
        //         setWeatherIcon(clear);
        //         break;
        //     case 'clouds':
        //         setWeatherIcon(clouds);
        //         break;
        //     case 'rain':
        //         setWeatherIcon(rain);
        //         break;
        //     case 'mist':
        //         setWeatherIcon(mist);
        //         break;
        //     case 'snow':
        //         setWeatherIcon(snow);
        //         break;
        //     case 'thunderstorm':
        //         setWeatherIcon(thunderstorm);
        //         break;
        //     default:
        //         setWeatherIcon(clear);
        //         break;
        // }
        
        return (
            <Head>
            <Title>
                웨일마켓 피드
                <Today>
                    {date.getFullYear()}년 {date.getMonth() + 1}월{' '}
                    {date.getDate()}일{' '}
                    {date.toLocaleString('ko-KR', { weekday: 'long' })}
                </Today>
                <TodayWeather onMouseOver={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} src={weather.toLowerCase() === 'clear' ? clear : (weather.toLowerCase() === 'rain' ? rain : (weather.toLowerCase() === 'clouds' ? clouds : (weather.toLowerCase() === 'mist' ? mist : (weather.toLowerCase() === 'snow' ? snow : thunderstorm))))} alt="today weather" />
                <ArrowBox className={`${hover ? 'on' : ''}`}>서울 날씨 기준입니다.</ArrowBox>
            </Title>
            <Link to="/home/search">
                <Search />
            </Link>
        </Head>
    );
}

export default Header;
