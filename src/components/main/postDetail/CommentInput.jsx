import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';
import PostingContext from '../../../context/PostingProvider';
import { API_URL } from '../../../constants/defaultUrl';
import styled from 'styled-components';
import praise_icon from '../../../assets/icon-praise.png';
import praise_icon_fill from '../../../assets/icon-praise-fill.png';

const CommentForm = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
    border-top: 0.5px solid #dbdbdb;
    border-radius: 0 0 10px 10px;
    background-color: #ffffff;
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

    @media screen and (max-width: 390px) {
        margin-top: 1px;
    }
`;

const Input = styled.input`
    width: calc(100% - 90px);
    border-style: none;
    outline: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    &::placeholder {
        color: #c4c4c4;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
    }
    &:disabled{
        background-color: white;
    }
`;

const SendBtn = styled.button`
    border: none;
    border-radius: 0;
    background: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 17.53px;
    box-shadow: none;
    color: ${(props) => (props.disabled ? '#C4C4C4' : '#00BCD4')};
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

function CommentInput({ index, Liked, id, setComments, user }) {
    // 댓글 작성 api 확인
    const [InfoState, setInfoState] = useContext(AuthContext);
    const [PostingState, setPostingState] = useContext(PostingContext);
    const [comment, setComment] = useState('');
    const commentinput = useRef();

    async function UploadComment() {
        const commentData = {
            comment: {
                content: comment,
            },
        };
        try {
            await axios.post(`${API_URL}/post/${id}/comments`, commentData, {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-type': 'application/json',
                },
            });
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

            if (index === '5') {
                const feedConfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const feedResponse = await axios.get(
                    `${API_URL}/post/feed/?limit=100&skip=0`,
                    feedConfig
                );
                setInfoState((InfoState) => {
                    InfoState.MyInformations[3] = {
                        ...InfoState.MyInformations[3],
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
                    `${API_URL}/post/${PostingState.data[0].accountname}/userpost/?limit=100&skip=0`,
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
        }
    }

    // 버튼 활성화  // 기본값은 비활성화 , 길이 0 이상되면 false되면서 버튼 활성화
    const [isDisabled, setIsDisabled] = useState(true);

    const isPassedComment = () => {
        return comment.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
    };

    // submit -> 버튼 활성화 되어있으면 업로드 코멘트 실행, 코멘트 빈값으로 바꾸기
    const handleSubmit = (event) => {
        event.preventDefault();
        !isDisabled && UploadComment();
        setIsDisabled(true);
        setComment('');
        commentinput.current.value = '';
    };

    return (
        <CommentForm method="POST" onSubmit={handleSubmit}>
            <Heart Liked={Liked} disabled={true} />
            <label htmlFor="text"></label>
            <Input
                id="text"
                type="text"
                placeholder={user==='whalegm' ? "댓글을 입력하실 수 없습니다." : "댓글 입력하기..."}
                ref={commentinput}
                onChange={(event) => setComment(event.target.value)}
                onKeyUp={isPassedComment}
                disabled={user==='whalegm' ? true : false}
            />
            <SendBtn type="submit" disabled={isDisabled}>
                게시
            </SendBtn>
        </CommentForm>
    );
}

export default CommentInput;
