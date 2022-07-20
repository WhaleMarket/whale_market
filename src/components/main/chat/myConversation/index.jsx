import { Wrapper, Date, MessageBox, Text } from './index.style';

function MyConversation(props) {
    return (
        props.pop
        ? 
        <Wrapper>
            <Date>16:02</Date>
            <MessageBox>
                <Text>{props.myText}</Text>
            </MessageBox>
        </Wrapper>
        :
        ''
    );
}

export default MyConversation;