import { useContext } from 'react';
import AuthContext from '../../../../context/AuthProvider';
import axios from 'axios';
import { API_URL } from '../../../../constants/defaultUrl';
import styled from 'styled-components';

const FollowButton = styled.button`
    width: 56px;
    height: 28px;
    border-radius: 1.625rem;
    font-size: 12px;
    vertical-align: baseline;
    padding: 0;
    border: solid 1px grey;
    background-color: white;
    color: black;
    &:hover {
        cursor: pointer;
    }
`;

function UserFollowButton({ text, user, setUser }) {
    const [InfoState] = useContext(AuthContext);

    const handleClick = () => {
        // 언팔로우
        if (user.isfollow) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${InfoState.MyInformations[0].token}`,
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
                    followerCount: response.data.profile.followerCount,
                });
            })
            .catch((error) => {
                console.error(error);
            })

        // 팔로우
        } else {
            const reqData = [];
            const config = {
                headers: {
                    "Authorization": `Bearer ${InfoState.MyInformations[0].token}`,
                    "Content-type": "application/json",
                },
            };
            axios.post(
                `${API_URL}/profile/${user.accountname}/follow`,
                reqData,
                config
            )
            .then((response) => {
                // 나를 팔로우한 사용자의 정보에 isfollow와 followerCount 추가
                setUser({
                    ...user,
                    isfollow: response.data.profile.isfollow,
                    followerCount: response.data.profile.followerCount,
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