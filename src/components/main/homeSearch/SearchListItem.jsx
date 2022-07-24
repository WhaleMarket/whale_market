import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_URL } from '../../../constants/defaultUrl'; 
import basicImage from '../../../assets/basic-profile-img.png';
import { SearchProvider } from '../../../context/SearchProvider';

const SearchUl = styled.ul`
    padding-top: 50px;
`;

const SearchList = styled.li`
    display: flex;
    align-items: center;
    padding: ;
`;

const UserProfileImage = styled.img`
    width: 50px;
    margin-right: 12px;
`;

const UserName = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 6px;
`;

const AccountName = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
`;

function SearchListItem() {

    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword] = useState('');



    useEffect(() => {
        if (keyword) {
            const search = async () => {
                try {
                    const token = window.localStorage.getItem('token');
                    const config = {
                        headers: {
                            "Authorization" : `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    };
                    const response = await axios.get(
                        `${API_URL}/user/searchuser/?keyword=${keyword}`,
                        config
                    );
                    console.log(JSON.stringify(response));
                } catch(error) {
                    console.error(error);
                }
            };
            search();
        }
        
    }, []);

    return (
        <SearchUl>
            {/* <SearchList>
                <UserProfileImage src={basicImage} alt="" />
                <div>
                    <UserName>username</UserName>
                    <AccountName>@accountname</AccountName>
                </div>
            </SearchList> */}
            {searchResult.map((user) => {
                return (
                    <SearchList key={user._id}>
                        <UserProfileImage src={basicImage} alt="" />
                            <div>
                                <UserName>{user.username}</UserName>
                                <AccountName>{user.accountname}</AccountName>
                            </div>
                    </SearchList>
                )
            })}
        </SearchUl>
    )
}

export default SearchListItem