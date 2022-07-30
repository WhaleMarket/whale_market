import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import basicProfileImage from '../../../assets/basic-profile-img.png';
import { API_URL } from '../../../constants/defaultUrl';

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
    background-image: url(${(props) => props.src});
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const UsernameBox = styled.div`
    display: flex;
`;

const UserName = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 6px;
`;

const StyledKeywordInUsername = styled.p`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 6px;
    color: #00bcd4;
`;

const AccountNameBox = styled.div`
    display: flex;
`;

const AccountName = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
`;

const StyledKeywordInAccountname = styled.p`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #00bcd4;
`;

function SearchList({ keyword, searchResult }) {
    return (
        <SearchUl>
            {searchResult.map((user) => {
                if (
                    user.accountname.includes(keyword) ||
                    user.username.includes(keyword)
                ) {
                    return (
                        <List key={user._id}>
                            <FlexedLink to={`/profile/${user.accountname}`}>
                                <UserProfileImage
                                    src={
                                        user.image.includes(API_URL) &&
                                        user.image !== `${API_URL}/undefined`
                                            ? user.image
                                            : basicProfileImage
                                    }
                                />
                                <TextBox>
                                    {user.username.includes(keyword) ? (
                                        <UsernameBox>
                                            <UserName>
                                                {
                                                    user.username.split(
                                                        keyword
                                                    )[0]
                                                }
                                            </UserName>
                                            <StyledKeywordInUsername>
                                                {keyword}
                                            </StyledKeywordInUsername>
                                            <UserName>
                                                {user.username.replace(
                                                    user.username.split(
                                                        keyword
                                                    )[0] + keyword,
                                                    ''
                                                )}
                                            </UserName>
                                        </UsernameBox>
                                    ) : (
                                        <UserName>{user.username}</UserName>
                                    )}

                                    {user.accountname.includes(keyword) ? (
                                        <AccountNameBox>
                                            <AccountName>
                                                @
                                                {
                                                    user.accountname.split(
                                                        keyword
                                                    )[0]
                                                }
                                            </AccountName>
                                            <StyledKeywordInAccountname>
                                                {keyword}
                                            </StyledKeywordInAccountname>
                                            <AccountName>
                                                {user.accountname.replace(
                                                    user.accountname.split(
                                                        keyword
                                                    )[0] + keyword,
                                                    ''
                                                )}
                                            </AccountName>
                                        </AccountNameBox>
                                    ) : (
                                        <AccountName>
                                            @{user.accountname}
                                        </AccountName>
                                    )}
                                </TextBox>
                            </FlexedLink>
                        </List>
                    );
                } else {
                    return;
                }
            })}
        </SearchUl>
    );
}

export default SearchList;
