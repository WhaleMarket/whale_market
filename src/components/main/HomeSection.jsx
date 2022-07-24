import whale from "../../assets/Logo.png"
import styled from "styled-components"
import {Link} from 'react-router-dom'
import Feed from '../main/homeFeed/FeedContent';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthProvider';
import { API_URL } from '../../constants/defaultUrl';
import axios from "axios";

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 110px);
    padding: 50px 0 60px 0;
`

const Logo = styled.img`
    width: auto;
    height: 100px;
`

const Title = styled.h1`
    margin-top: 20px;
    font-size: 14px;
`

const Search = styled.button`
    width: 120px;
    padding: 13px 0;
    margin-top: 20px;
    border: none;
    border-radius: 44px;
    background-color: #00BCD4;
    color: white;
    font-size: 14px;
    &:hover{
        cursor: pointer;
    }
`

function HomeSection(){
    const [InfoState]  = useContext(AuthContext);
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        async function getFeed(){
            try{
                const config = {
                    headers : {
                        "Authorization" : `Bearer ${InfoState.MyInformations[0].token}`,
                        "Content-type" : "application/json",
                    },
                };
                const response = await axios.get(
                    `${API_URL}/post/feed`,
                    config,
                );
                setPosts(response.data.posts);
            } catch (error){
                console.error(error);
            }
            
        }
        InfoState.MyInformations[0].token && getFeed();
    },[InfoState.MyInformations])

    return(
        parseInt(InfoState.MyInformations[0].myFollowingCount) > 0 ? <Feed posts={posts}/> 
        :
        <Section>
            <Logo src={whale} alt="whale"/>
            <Title>유저를 검색해 팔로우 해보세요!</Title>
            <Link to = '/home/search'>
                <Search type="button">검색하기</Search>
            </Link>
        </Section>
    )
}

export default HomeSection;