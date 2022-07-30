import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../../context/AuthProvider';
import ProfileModificationContext from '../../../../context/ProfileModification';
import ProfileImgUploadSection from './profileImgUpload';
import ProfileEditHeader from './profileEditHeader';
import ProfileDetail from './profileDetailUpload'

const ProfileEditContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 78px 34px;
`;

function ProfileEditSection() {
    const [InfoState] = useContext(AuthContext);
    const [ProfileModificationState, setProfileModificationState] = useContext(ProfileModificationContext);

    useEffect(()=>{
        setProfileModificationState((ProfileModificationState) => {
            ProfileModificationState.profile = [
                {
                    label: "username",
                    error: false,
                    editPossible: false,
                    value: InfoState.MyInformations[0].myUsername,
                  },
                  {
                    label: "accountname",
                    error: false,
                    editPossible: false,
                    value: InfoState.MyInformations[0].myAccountname,
                  },
                  {
                    label: "intro",
                    error: false,
                    editPossible: false,
                    value: InfoState.MyInformations[0].myIntro,
                  },
                  {
                    label: "image",
                    error: false,
                    editPossible: false,
                    value: InfoState.MyInformations[0].myImage,
                  }
            ]
            return { profile : ProfileModificationState.profile };
        })
    }, [InfoState.MyInformations])

    return (
        <ProfileEditContainer>
            <Wrapper>
                <ProfileImgUploadSection />
                <ProfileDetail />
            </Wrapper>
            <ProfileEditHeader />
        </ProfileEditContainer>
    )
}

export default ProfileEditSection;