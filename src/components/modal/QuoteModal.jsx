import React from "react";
import styled from "styled-components";
import ModalPortal from "../../../src/Portal";

const ModalBg = styled.section`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 150;
    background-color: rgba(0, 0, 0, 0.2);
    visibility: ${(props) => (props.quoteModal === false ? "hidden" : "visible")};
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 340px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #ffffff;
`;

const Message = styled.p`
    display: inline-block;
    padding: 22px 20px;
    border-bottom: 0.5px solid #dbdbdb;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    white-space: pre-wrap;
`

const QuoteContent = styled(Message)`
    border-bottom: none;
    padding: 20px 20px;
    font-weight: 500;
`;

function QuoteModal({
    quoteModal,
    setQuoteModal,
    msgcontent,
    content
}) {
    return (
    <ModalPortal>
        <ModalBg
            quoteModal={quoteModal}
            onClick={() => {
                setQuoteModal(false)}}
        >
            <ModalContent>
                <Message>{msgcontent}</Message>
                <QuoteContent>{content}</QuoteContent>
            </ModalContent>
        </ModalBg>
    </ModalPortal>
    );
}

export default QuoteModal;
