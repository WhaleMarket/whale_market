import Reward from './Reward';
import styled from 'styled-components';
import Ranking from './Ranking';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../context/AuthProvider';
import axios from 'axios';
import { API_URL } from '../../../constants/defaultUrl';

const Guide = styled.p`
    padding-top: 90px;
    line-height: 25px;
    text-align: center;
`

const Strong = styled.strong`
    font-size: 18px;
    font-weight: 900;
    color: #00BCD4;
`

const RewardWrapper = styled.ul`
    display: flex;
    justify-content: space-between;
    width: 1000px;
    padding-top: 40px;
    margin: 0 auto;
    box-sizing: border-box;

    @media screen and (max-width: 768px) {
        width: 230px;
        margin: 0 26px;
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 16px;
    }

    @media screen and (max-width: 390px) {
        display: flex;
        flex-direction: column;
        width: 330px;
        margin: 0 auto;
        padding: 53px 4% 68px;
    }
`;

function Market({ List }) {
    const [InfoState] = useContext(AuthContext);
    const [heart, setHeart] = useState(0);

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
        <Guide><Strong>칭찬</Strong>의 개수에 따라 새우부터 차례대로 <br/>고래의 <Strong>먹이</Strong>를 획득하실 수 있습니다.</Guide>
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
