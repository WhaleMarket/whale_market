import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SearchUl = styled.ul`
    padding: 68px 16px 0 16px;
`;

const List = styled.li`
    margin-bottom: 16px;
`;

const FlexedLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
`;

const UserProfileImage = styled.div`
    width: 50px;
    height: 50px;
    margin-right: 12px;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
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

function SearchList({ searchResult }) {
    return (
        <SearchUl>
            {searchResult.map((user) => {
                return (
                    <List key={user._id}>
                        <FlexedLink to={`/${user.accountname}`}>
                            <UserProfileImage style={{ backgroundImage: `url(${user.image})` }}/>
                            <div>
                                <UserName>{user.username}</UserName>
                                <AccountName>@{user.accountname}</AccountName>
                            </div>
                        </FlexedLink>
                    </List>
                )
            })}
        </SearchUl>
    )
}

export default SearchList;