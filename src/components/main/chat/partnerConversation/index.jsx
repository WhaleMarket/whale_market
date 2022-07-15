import { Wrapper, Date, MessageBox, Text, PreviewProfile, ProfileImg } from './index.style';
import basicProfileImg from '../../../../assets/basic-profile-img.png';

function PartnerConversation(props) {
    return (
        <Wrapper>
            <PreviewProfile href="">
                <ProfileImg src={basicProfileImg} alt="프로필사진" />
            </PreviewProfile>
            <MessageBox>
            <Text>{props.contents}</Text>
            </MessageBox>
            <Date>16:02</Date>
        </Wrapper>
    );
}

export default PartnerConversation;