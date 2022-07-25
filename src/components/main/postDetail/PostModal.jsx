import React from 'react';
import styled from 'styled-components';
import ModalPortal from '../../../Portal';
import PostContent from './PostContent';
import img from '../../../assets/postImg.png'
// import ContentImg from './ContentImg';

const ModalBg = styled.section`
    display: flex;
    justify-content: center;
    align-items:center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
    visibility: ${(props) => (props.postModal === false ? "hidden" : "visible")};
    opacity: ${(props) => (props.postModal === false ? "0" : "1")};
`

const ModalWrapper = styled.section`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    background-color: #FFFFFF;
    width: ${(props) => (props.className === 'NoImg' ? null : "calc(100% - 35px)")};
    width: null;
    max-width: 900px;
    height: 500px;
    z-index: 10;
    margin: 0 auto;

    @media screen and (max-width: 600px) {
        flex-direction: column;
        width: calc(100% - 55px);
        height: fit-content;
    }

    /* 만약 이미지 없다면 ? width: null : width: calc(100% - 35px); */
`

const ContentImg = styled.img`
    width: 70%;
    object-fit: cover;
    overflow: hidden;
    border-radius: 10px 0 0 10px;

    @media screen and (max-width: 600px) {
        width: 100%;
        border-radius: 10px 10px 0 0;

    }
`

function PostModal({postModal,setPostModal}) {
    return (
        <ModalPortal>
            <ModalBg postModal={postModal} onClick={() => setPostModal(false)}>
                {/* { 이미지가 있다면 ? 
                <ModalWrapper postModal={postModal} onClick={(event)=>{event.stopPropagation()}}>
                    <ContentImg src={img} />
                    <PostContent />
                </ModalWrapper>
            :
                <ModalWrapper className="NoImg" postModal={postModal} onClick={(event)=>{event.stopPropagation()}}>
                    <PostContent />
                </ModalWrapper>
            } */}

                <ModalWrapper postModal={postModal} onClick={(event)=>{event.stopPropagation()}}>
                    <ContentImg src={img} />
                    <PostContent />
                </ModalWrapper>
            </ModalBg>
        </ModalPortal>
    );
}

export default PostModal;
