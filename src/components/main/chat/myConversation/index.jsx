import { Wrapper, Date, MessageBox, Text } from './index.style';

function MyConversation(props) {
    return (
        <Wrapper>
            <Date>16:02</Date>
            <MessageBox>
                <Text>{props.myText}</Text>
            </MessageBox>
        </Wrapper>
    );
}

export default MyConversation;