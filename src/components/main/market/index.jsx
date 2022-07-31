import Reward from './Reward';
import styled from 'styled-components';
import Ranking from './Ranking';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../context/AuthProvider';
import axios from 'axios';
import { API_URL } from '../../../constants/defaultUrl';
import questionMark from '../../../assets/question-mark.png'

const Guide = styled.article`
    /* position: relative; */
    padding-top: 90px;
    line-height: 25px;
    text-align: center;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
`;

const Strong = styled.strong`
    font-size: 18px;
    font-weight: 900;
    color: #00bcd4;
`;

const RewardWrapper = styled.ul`
    display: flex;
    justify-content: space-between;
    width: 1000px;
    padding-top: 40px;
    margin: 0 auto;
    box-sizing: border-box;

    @media screen and (max-width: 768px) {
        width: 400px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 16px;
    }

    @media screen and (max-width: 390px) {
        display: flex;
        flex-direction: column;
        width: 280px;
        padding-left: 15px;
        padding: 0 0 50px;
    }
`;

const Question = styled.img`
    width: 12px;
    height: auto;
`

const ArrowBox = styled.p`
    display: none;
    position: absolute;
    width: 220px;
    padding: 10px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 10px;
    background: #444444ba;
    color: #FFFFFF;
    font-size: 13px;
    text-align: center;
    line-height: 18px;
    left: 37%;
    /* margin: 5px auto 0; */

    &.on{
        display: block;
        top: 155px;
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

    @media screen and (max-width: 768px) {
        left: 25%;
    }

    @media screen and (max-width: 390px) {
        left: 5%;
    }
`

function Market({ List }) {
    const [InfoState] = useContext(AuthContext);
    const [heart, setHeart] = useState(0);
    const [hover, setHover] = useState(false)

    async function getPost() {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-type': 'application/json',
                },
            };
            const response = await axios.get(
                `${API_URL}/post/${InfoState.MyInformations[0].myAccountname}/userpost/?limit=100&skip=0`,
                config
            );
            let heartCount = 0;
            response.data.post.map((value) => {
                return (heartCount += value.heartCount);
            });
            setHeart(heartCount);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        InfoState.MyInformations[0].myAccountname && getPost();
    }, [InfoState.MyInformations[0].myAccountname]);

    return (
        <>
            <Guide>
                <Strong>칭찬</Strong>의 개수에 따라 새우부터 차례대로 <br />
                고래의 <Strong>먹이</Strong> <Question onMouseOver={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} src={questionMark} alt="question mark" /> 를 획득하실 수 있습니다.
                <ArrowBox className={`${hover ? 'on' : ''}`}>프로필 페이지 게시물 우측 상단의<br/>고래 아이콘을 눌러보세요!</ArrowBox>
            </Guide>
            <RewardWrapper>
                {List?.map((value, key) => {
                    return (
                        <Reward
                            key={key}
                            data={value}
                            heart={heart}
                            index={key}
                        />
                    );
                })}
            </RewardWrapper>
            <Ranking />
        </>
    );
}

export default Market;
