import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';
import { API_URL } from '../../../constants/defaultUrl';
import styled from 'styled-components';
import praise_icon from '../../../assets/icon-praise.png';
import praise_icon_fill from '../../../assets/icon-praise-fill.png';
import comment_icon from '../../../assets/icon-comment.png';
import PostModal from '../postDetail/PostModal';
import HeartEvent from '../../../theme/heartClickEvent';

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
`;

const Heart = styled.button`
    width: 26px;
    height: 18px;
    margin-right: 6px;
    border: none;
    background-color: inherit;
    background-image: ${(props) =>
        props.Liked ? `url(${praise_icon_fill})` : `url(${praise_icon})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 26px 19px;
    transition: 0.5s ease-in-out;
    &.like {
        animation: ${HeartEvent} 0.5s ease-in-out;
    }
    &:hover {
        cursor: pointer;
    }
`;

const HeartCount = styled.span`
    color: #767676;
    font-size: 12px;
    line-height: 20px;
`;

const CommentBtn = styled.a`
    display: inline-block;
    width: 26px;
    margin-left: 16px;
    margin-right: 6px;
    height: 18px;
    border: none;
    background-color: inherit;
    background: url(${comment_icon}) no-repeat center / 26px 19px;
    &:hover {
        cursor: pointer;
    }
`;

const CommentCount = styled.span`
    color: #767676;
    font-size: 12px;
    line-height: 20px;
`;

function IconGroup({ like, comment, liked, id, index, src }) {
    const [InfoState, setInfoState] = useContext(AuthContext);
    const [postModal, setPostModal] = useState(false);

    const useHandleLike = () => {
        async function fetchData() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                await axios.post(`${API_URL}/post/${id}/heart`, {}, config);

                const Feedconfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const Feedresponse = await axios.get(
                    `${API_URL}/post/feed`,
                    Feedconfig
                );

                setInfoState((InfoState) => {
                    InfoState.MyInformations[5] = {
                        ...InfoState.MyInformations[5],
                        hearted: Feedresponse.data.posts.map((item) => {
                            return item.hearted;
                        }),
                        heartCount: Feedresponse.data.posts.map((item) => {
                            return item.heartCount;
                        }),
                    };
                    return { MyInformations: InfoState.MyInformations };
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    };

    const useHandleUnlike = () => {
        async function fetchData() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                await axios.delete(`${API_URL}/post/${id}/unheart`, config);

                const Feedconfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const Feedresponse = await axios.get(
                    `${API_URL}/post/feed`,
                    Feedconfig
                );

                setInfoState((InfoState) => {
                    InfoState.MyInformations[5] = {
                        ...InfoState.MyInformations[5],
                        hearted: Feedresponse.data.posts.map((item) => {
                            return item.hearted;
                        }),
                        heartCount: Feedresponse.data.posts.map((item) => {
                            return item.heartCount;
                        }),
                    };
                    return { MyInformations: InfoState.MyInformations };
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    };

    function openPostModal() {
        setPostModal(true);
    }

    return (
        <>
            <IconWrapper>
                <Heart
                    Liked={liked}
                    className={`${liked ? 'like' : ''}`}
                    onClick={liked ? useHandleUnlike : useHandleLike}
                />
                <HeartCount>{like}</HeartCount>
                <CommentBtn
                    onClick={() => {
                        openPostModal();
                    }}
                />
                <CommentCount>{comment}</CommentCount>
            </IconWrapper>

            <PostModal
                feed={true}
                src={src}
                index={index}
                id={id}
                postModal={postModal}
                setPostModal={setPostModal}
            />
        </>
    );
}

export default IconGroup;
