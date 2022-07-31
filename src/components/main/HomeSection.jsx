import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import styled from 'styled-components';
import whale from '../../assets/Logo.png';
import Feed from '../main/homeFeed/FeedContent';
import axios from 'axios';
import { API_URL } from '../../constants/defaultUrl';
import LoadingPage from '../../pages/LoadingPage';

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
    const [InfoState, setInfoState] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getFeedData() {
            try {
                setLoading(true);
                //피드 정보
                const feedConfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const feedResponse = await axios.get(
                    `${API_URL}/post/feed/?limit=100&skip=0`,
                    feedConfig
                );
                feedResponse.data.posts.map((value) => {
                    return setInfoState((InfoState) => {
                        InfoState.MyInformations[3] = {
                            ...InfoState.MyInformations[3],
                            id: [...InfoState.MyInformations[3].id, value.id],
                            username: [
                                ...InfoState.MyInformations[3].username,
                                value.author.username,
                            ],
                            accountname: [
                                ...InfoState.MyInformations[3].accountname,
                                value.author.accountname,
                            ],
                            content: [
                                ...InfoState.MyInformations[3].content,
                                value.content,
                            ],
                            image: [
                                ...InfoState.MyInformations[3].image,
                                value.image,
                            ],
                            heartCount: [
                                ...InfoState.MyInformations[3].heartCount,
                                value.heartCount,
                            ],
                            commentCount: [
                                ...InfoState.MyInformations[3].commentCount,
                                value.commentCount,
                            ],
                            hearted: [
                                ...InfoState.MyInformations[3].hearted,
                                value.hearted,
                            ],
                            updatedAt: [
                                ...InfoState.MyInformations[3].updatedAt,
                                value.updatedAt,
                            ],
                            createdAt: [
                                ...InfoState.MyInformations[3].createdAt,
                                value.createdAt,
                            ],
                        };
                        return { MyInformations: InfoState.MyInformations };
                    });
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getFeedData();
    }, [InfoState.MyInformations, setInfoState]);

    return loading ? (
        <LoadingPage />
    ) : parseInt(InfoState.MyInformations[0].myFollowingCount) > 0 ? (
        InfoState.MyInformations[3].accountname.length > 0 ? (
            <Feed />
        ) : (
            <Section>
                <Logo src={whale} alt="whale" />
                <Title>팔로우 한 유저의 게시물이 없습니다.</Title>
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
