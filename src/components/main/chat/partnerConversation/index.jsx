import { Wrapper, Text } from './index.style';

function PartnerConversation(props) {
    return (
        <Wrapper>
            <Text>{props.contents}</Text>
        </Wrapper>
    );
}

export default PartnerConversation;