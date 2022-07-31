import { useContext } from 'react';
import AuthContext from '../../../../context/AuthProvider';
import styled from 'styled-components';

const Image = styled.img`
    margin-left: 16px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
`;

function Profile() {
    const [InfoState] = useContext(AuthContext);

    return (
        <>
            <Image
                src={InfoState.MyInformations[0].myImage}
                alt="profile image"
            />
        </>
    );
}

export default Profile;
