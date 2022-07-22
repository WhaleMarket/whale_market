import { useContext } from 'react';
import AuthContext from '../../../../context/AuthProvider';
import axios from 'axios';
import { API_URL } from '../../../../constants/defaultUrl';
import styled from 'styled-components';

const FollowButton = styled.button`
    width: 56px;
    height: 28px;
    border-radius: 1.625rem;
    border-style: none;
    background-color: #00BCD4;
    font-size: 12px;
    vertical-align: baseline;
    padding: 0;
    color: #fff;
    &:hover {
        cursor: pointer;
    }
`;

function UserFollowButton({ text, user, setUser }) {
    const { token } = useContext(AuthContext);
    const authToken = 'Bearer' + token;
    
    function handleClick() {
        if (user.isfollow) {
            const config = {
                headers: {
                    Authorization: authToken,
                    "Content-type": "application/json",
                },
            };
            axios.delete(
                `${API_URL}/profile/${user.accountname}/unfollow`,
                config
            )
            .then((response) => {
                setUser({
                    ...user,
                    isfollow: response.data.profile.isfollow,
                    followers: response.data.profile.followerCount,
                });
            })
            .catch((error) => {
                console.error(error);
            })
        } else {
            const config = {
                headers: {
                    Authorization: authToken,
                    "Content-type": "application/json",
                },
            };
            axios.delete(
                `${API_URL}/profile/${user.accountname}/follow`,
                config
            )
            .then((response) => {
                setUser({
                    ...user,
                    isfollow: response.data.profile.isfollow,
                    followers: response.data.profile.followerCount,
                });
            })
            .catch((error) => {
                console.error(error);
            })
        }
    };
    return (
        <FollowButton
            type='button'
            onClick={handleClick}
        >
            {text}
        </FollowButton>
    );
}

export default UserFollowButton;