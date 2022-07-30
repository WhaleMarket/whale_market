import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';
import PostingContext from '../../../context/PostingProvider';
import { API_URL } from '../../../constants/defaultUrl';
import styled from 'styled-components';
import Comment from '../postDetail/Comment';
import CommentInput from '../postDetail/CommentInput';
import Modal from '../../modal/Modal';
import AlertModal from '../../modal/AlertModal';

const LayOut = styled.div`
    display: flex;
    flex-direction: column;
    width: 330px;
    @media screen and (max-width: 768px) {
        width: 380px;
        height: ${(props) =>
            props.img !== '' && props.img !== undefined ? '280px' : '540px'};
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 4px 10px 16px;
    border-bottom: 0.5px solid #bdbdbd;
`;

const UserProfile = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 15px;
    background: url(${(props) => props.src});
    background-size: 36px 36px;
    overflow: hidden;
    object-fit: cover;
`;

const UserAccount = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
`;

const Wrapper = styled.div`
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const TextContent = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    padding: 16px;
    word-break: break-all;
    white-space: pre-wrap;
`;

const CommentWrapper = styled.ul`
    border-top: 0.5px solid #bdbdbd;
`;

const Nocomment = styled.li`
    padding: 50px;
    font-size: 13px;
    color: #bdbdbd;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

function PostContent({ id, index, src, Isimg, content, feed }) {
    const [PostingState, setPostingState] = useContext(PostingContext);
    const [InfoState, setInfoState] = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    async function fetchData() {
        try {
            const commentconfig = {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-type': 'application/json',
                },
            };
            const res = await axios.get(
                `${API_URL}/post/${id}/comments/?limit=100&skip=0`,
                commentconfig
            );
            setComments([res.data.comments]);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [targetcomment, setTargetcomment] = useState('');
    const [targetUser, setTargetUser] = useState('');

    const modalItemList =
        targetUser === InfoState.MyInformations[0].myAccountname
            ? [
                  {
                      content: '삭제',
                      onClick: () => {
                          setAlertModal(true);
                      },
                  },
              ]
            : [
                  {
                      content: '신고',
                      onClick: () => {
                          setAlertModal(true);
                      },
                  },
              ];

    const removePost = async (commentid) => {
        try {
            const deleteConfig = {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-type': 'application/json',
                },
            };
            await axios.delete(
                `${API_URL}/post/${id}/comments/${commentid}`,
                deleteConfig
            );
            fetchData();
            if (feed) {
                const feedConfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const feedResponse = await axios.get(
                    `${API_URL}/post/feed`,
                    feedConfig
                );
                setInfoState((InfoState) => {
                    InfoState.MyInformations[5] = {
                        ...InfoState.MyInformations[5],
                        commentCount: feedResponse.data.posts.map((value) => {
                            return value.commentCount;
                        }),
                    };
                    return { MyInformations: InfoState.MyInformations };
                });
            } else {
                const Postingconfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const Postingresponse = await axios.get(
                    `${API_URL}/post/${PostingState.data[0].accountname}/userpost`,
                    Postingconfig
                );
                setPostingState((PostingState) => {
                    PostingState.data[0] = {
                        ...PostingState.data[0],
                        postdata: Postingresponse.data.post,
                    };
                    return { data: PostingState.data };
                });
            }
        } catch (error) {
            console.error(error);
            alert('error');
        }
    };

    const reportPost = async (commentid) => {
        try {
            const reportConfig = {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-type': 'application/json',
                },
            };
            await axios.post(
                `${API_URL}/post/${id}/comments/${commentid}/report`,
                {},
                reportConfig
            );
            if (prompt('신고 사유를 적어주세요.') !== '') {
                alert('신고 되었습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('error');
        }
    };

    return (
        <>
            {feed === false ? (
                <LayOut img={Isimg}>
                    <UserInfo>
                        <UserProfile src={PostingState.data[0].user.image} />
                        <UserAccount>
                            {PostingState.data[0].user.username}
                        </UserAccount>
                    </UserInfo>
                    <Wrapper>
                        {content !== '' && <TextContent>{content}</TextContent>}
                        <CommentWrapper>
                            {comments[0] !== undefined &&
                                (comments[0].length > 0 ? (
                                    comments[0].map((value, key) => {
                                        return (
                                            <Comment
                                                value={value}
                                                key={key}
                                                setIsOpenModal={setIsOpenModal}
                                                isOpenModal={isOpenModal}
                                                setTargetcomment={
                                                    setTargetcomment
                                                }
                                                setTargetUser={setTargetUser}
                                            />
                                        );
                                    })
                                ) : (
                                    <Nocomment>아직 댓글이 없습니다.</Nocomment>
                                ))}
                            <Modal
                                isOpenModal={isOpenModal}
                                setIsOpenModal={setIsOpenModal}
                                modalItemList={modalItemList}
                            />
                            <AlertModal
                                alertModal={alertModal}
                                setAlertModal={setAlertModal}
                                setIsOpenModal={setIsOpenModal}
                                content={
                                    targetUser ===
                                    InfoState.MyInformations[0].myAccountname
                                        ? '댓글을 삭제할까요?'
                                        : '댓글을 신고할까요?'
                                }
                                deleteBtn={
                                    targetUser ===
                                    InfoState.MyInformations[0].myAccountname
                                        ? {
                                              content: '삭제',
                                              onClick: () => {
                                                  removePost(targetcomment);
                                              },
                                          }
                                        : {
                                              content: '신고',
                                              onClick: () => {
                                                  reportPost(targetcomment);
                                              },
                                          }
                                }
                            />
                        </CommentWrapper>
                    </Wrapper>

                    <CommentInput
                        index="3"
                        id={id}
                        Liked={PostingState.data[0].postdata[index].hearted}
                        setComments={setComments}
                    />
                </LayOut>
            ) : (
                <LayOut img={Isimg}>
                    <UserInfo>
                        <UserProfile src={src} />
                        <UserAccount>
                            {InfoState.MyInformations[5].username[index]}
                        </UserAccount>
                    </UserInfo>
                    <Wrapper>
                        {InfoState.MyInformations[5].content[index] !== '' && (
                            <TextContent>
                                {InfoState.MyInformations[5].content[index]}
                            </TextContent>
                        )}
                        <CommentWrapper>
                            {comments[0] !== undefined &&
                                (comments[0].length > 0 ? (
                                    comments[0].map((value, key) => {
                                        return (
                                            <Comment
                                                value={value}
                                                key={key}
                                                setIsOpenModal={setIsOpenModal}
                                                isOpenModal={isOpenModal}
                                                setTargetcomment={
                                                    setTargetcomment
                                                }
                                                setTargetUser={setTargetUser}
                                            />
                                        );
                                    })
                                ) : (
                                    <Nocomment>아직 댓글이 없습니다.</Nocomment>
                                ))}
                            <Modal
                                isOpenModal={isOpenModal}
                                setIsOpenModal={setIsOpenModal}
                                modalItemList={modalItemList}
                            />
                            <AlertModal
                                alertModal={alertModal}
                                setAlertModal={setAlertModal}
                                setIsOpenModal={setIsOpenModal}
                                content={
                                    targetUser ===
                                    InfoState.MyInformations[0].myAccountname
                                        ? '댓글을 삭제할까요?'
                                        : '댓글을 신고할까요?'
                                }
                                deleteBtn={
                                    targetUser ===
                                    InfoState.MyInformations[0].myAccountname
                                        ? {
                                              content: '삭제',
                                              onClick: () => {
                                                  removePost(targetcomment);
                                              },
                                          }
                                        : {
                                              content: '신고',
                                              onClick: () => {
                                                  reportPost(targetcomment);
                                              },
                                          }
                                }
                            />
                        </CommentWrapper>
                    </Wrapper>

                    <CommentInput
                        index="5"
                        id={id}
                        Liked={InfoState.MyInformations[5].hearted[index]}
                        setComments={setComments}
                    />
                </LayOut>
            )}
        </>
    );
}

export default PostContent;
