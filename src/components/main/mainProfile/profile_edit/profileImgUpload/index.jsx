import styled from 'styled-components';
import UploadSection from './Upload_section';

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

function ProfileImgUploadSection() {
    return (
        <Fieldset>
            <UploadSection />
        </Fieldset>
    );
}

export default ProfileImgUploadSection;
