import React, { useState, useRef, useContext} from 'react';
import styled from 'styled-components';
import heart_icon from "../../../assets/icon-heart.png";
import heart_icon_fill from "../../../assets/icon-heart-fill.png";
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';
import { API_URL } from '../../../constants/defaultUrl';

const CommentForm = styled.form`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    padding: 16px;
    border-top: 0.5px solid #DBDBDB;
    border-radius: 0 0 10px 10px;
`

const Heart = styled.button`
    background-color: inherit;
    margin-right: 6px;
    width: 20px;
    height: 20px;
    border: none;
    background-image: ${(props) =>
        props.Liked ? `url(${heart_icon_fill})` : `url(${heart_icon})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px 20px;
    &:hover {
        cursor: pointer;
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
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #C4C4C4
    }
`

const SendBtn = styled.button`
    background: inherit; 
    border:none; 
    box-shadow:none; 
    border-radius: 0; 
    font-size: 14px;
    font-weight: 500;
    line-height: 17.53px;
    color: ${(props) => props.disabled ? '#C4C4C4' : '#00BCD4'};
    cursor: ${(props) => props.disabled ? "default" : "pointer"};
`

function CommentInput() {
    // 댓글 작성 api 확인 
    const [InfoState]  = useContext(AuthContext);
    const [comment, setComment] = useState('');
    const commentinput = useRef();

    async function UploadComment() {
        const commentData = { 
            "comment":{
                "content":String
            }
        };
        try {
            const response = await axios.post(
                `${API_URL}/post/:post_id/comments`,
                commentData, 
                { headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    "Content-type": "application/json",
                },
            });
        } catch (err) {
            console.error(err);
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
        isDisabled(false) && UploadComment();
        setComment('');
        commentinput.current.value = "";
    };

    return (
        <CommentForm method='POST' onSubmit={handleSubmit}>
            <Heart 
                // Liked={liked} onClick={liked ? useHandleUnlike : useHandleLike} 
            />
            <label htmlFor='text'></label>
                    <Input 
                        id='text'
                        type='text' 
                        placeholder='댓글 입력하기...'
                        ref={commentinput}
                        onChange={(event) => setComment(event.target.value)}
                        onKeyUp={isPassedComment}
                    />
            <SendBtn type='submit' disabled={isDisabled}>게시</SendBtn>
        </CommentForm>
    );
}

export default CommentInput;