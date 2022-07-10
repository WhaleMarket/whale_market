import React from 'react';
import styled from 'styled-components';

const Contents = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    padding-top: 300px;
`;

function ChatContents(props) {
    console.log(props)
    return (
        <Contents>{props.content}</Contents>
    );
}

export default ChatContents;