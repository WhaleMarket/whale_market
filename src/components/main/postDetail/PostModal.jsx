import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ModalPortal from '../../../Portal';
import AuthContext from '../../../context/AuthProvider';
import PostContent from '../postDetail/PostContent';
import prev from '../../../assets/prev-icon.png';
import next from '../../../assets/next-icon.png';

const ModalBg = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
    visibility: ${(props) =>
        props.postModal === false ? 'hidden' : 'visible'};
    opacity: ${(props) => (props.postModal === false ? '0' : '1')};
`;

const ModalWrapper = styled.section`
    display: flex;
    overflow: hidden;
    position: relative;
    z-index: 10;
    width: ${(props) => (props.className === 'NoImg' ? null : '700px')};
    width: ${(props) => (props.IsImage !== '' ? null : '700px')};
    height: ${(props) => (props.IsImage !== '' ? '400px' : '400px')};
    margin: 0 auto;
    border-radius: 10px;
    background-color: #ffffff;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        width: 340px;
        height: 540px;
    }
`;

const ContentImg = styled.img`
    width: 420px;
    height: 400px;
    overflow: inherit;
    border-radius: 10px 0 0 10px;
    background-color: #000000;
    object-fit: contain;

    @media screen and (max-width: 768px) {
        width: 340px;
        height: 304px;
        border-radius: 10px 10px 0 0;
    }
`;

const MoveBtn = styled.button`
    position: absolute;
    top: 170px;
    left: ${(props) => (props.direction === 'prev' ? `5px` : `none`)};
    right: ${(props) => (props.direction === 'next' ? `315px` : `none`)};
    width: 50px;
    height: 50px;
    border: 0;
    background-color: transparent;
    background-image: ${(props) =>
        props.direction === 'next' ? `url(${next})` : `url(${prev})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40px;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        top: 105px;
        left: ${(props) => (props.direction === 'prev' ? `20px` : `none`)};
        right: ${(props) => (props.direction === 'next' ? `20px` : `none`)};
        width: 20px;
        height: 50px;
    }
`;

function PostModal({
    postModal,
    setPostModal,
    id,
    index,
    src,
    image,
    content,
    feed,
}) {
    const [InfoState] = useContext(AuthContext);
    const [imgIndex, setImgIndex] = useState(0);
    return (
        <ModalPortal>
            <ModalBg postModal={postModal} onClick={() => setPostModal(false)}>
                {feed === false ? (
                    image !== '' ? (
                        <ModalWrapper
                            postModal={postModal}
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            {imgIndex !== 0 && (
                                <MoveBtn
                                    type="button"
                                    direction="prev"
                                    onClick={() => {
                                        setImgIndex(imgIndex - 1);
                                    }}
                                />
                            )}
                            <ContentImg src={image?.split(',')[imgIndex]} />
                            {imgIndex !== image?.split(',').length - 1 && (
                                <MoveBtn
                                    type="button"
                                    direction="next"
                                    onClick={() => {
                                        setImgIndex(imgIndex + 1);
                                    }}
                                />
                            )}
                            <PostContent
                                Isimg="exist"
                                src={src}
                                id={id}
                                index={index}
                                content={content}
                                feed={feed}
                            />
                        </ModalWrapper>
                    ) : (
                        <ModalWrapper
                            className="NoImg"
                            postModal={postModal}
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <PostContent
                                IsImage=""
                                src={src}
                                id={id}
                                index={index}
                                content={content}
                                feed={feed}
                            />
                        </ModalWrapper>
                    )
                ) : InfoState.MyInformations[5].image[index] !== '' ? (
                    <ModalWrapper
                        postModal={postModal}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        {imgIndex !== 0 && (
                            <MoveBtn
                                type="button"
                                direction="prev"
                                onClick={() => {
                                    setImgIndex(imgIndex - 1);
                                }}
                            />
                        )}
                        <ContentImg
                            src={
                                InfoState.MyInformations[5].image[index]?.split(
                                    ','
                                )[imgIndex]
                            }
                        />
                        {imgIndex !==
                            InfoState.MyInformations[5].image[index]?.split(',')
                                .length -
                                1 && (
                            <MoveBtn
                                type="button"
                                direction="next"
                                onClick={() => {
                                    setImgIndex(imgIndex + 1);
                                }}
                            />
                        )}
                        <PostContent
                            Isimg="exist"
                            src={src}
                            id={id}
                            index={index}
                            content={content}
                            feed={feed}
                        />
                    </ModalWrapper>
                ) : (
                    <ModalWrapper
                        className="NoImg"
                        postModal={postModal}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <PostContent
                            Isimg=""
                            src={src}
                            id={id}
                            index={index}
                            content={content}
                            feed={feed}
                        />
                    </ModalWrapper>
                )}
            </ModalBg>
        </ModalPortal>
    );
}

export default PostModal;
