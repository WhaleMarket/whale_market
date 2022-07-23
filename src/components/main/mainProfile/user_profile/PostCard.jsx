import React, { useState, useEffect, useRef, useContext } from 'react';
import profileImg from '../../../../assets/basic-profile-img.png';
import postImg from '../../../../assets/postImg.png';
import ModalBtn from '../../../modal/ModalBtn';
import Modal from '../../../modal/Modal';
import AlertModal from '../../../modal/AlertModal';
import styled from 'styled-components';
import PostIconContainer from './PostIconContainer';
import AuthContext from '../../../../context/AuthProvider';
import axios from 'axios';
import { API_URL } from '../../../../constants/defaultUrl';

const PostWrapper = styled.div`
    width: 80vw;
    margin-bottom: 34px;
    padding: 0 60px;
    box-sizing: border-box;
`

const PostInfo = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 16px 30px;
`

const UserImgDiv = styled.div`
    width: 2.625rem;
    height: 2.625rem;
    background-image: url(${profileImg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative; 
    border-radius: 50%;
`

const PostInfoUser = styled.div`
    display: inline-block;
    margin-left: 0.750rem;
    padding-top: 0.25rem;
    vertical-align: top;
`

const PostInfoName = styled.strong`
    font-size: 0.875rem;
    font-weight: 500;
`

const PostInfoId = styled.p` 
    margin-top: 2px;
    font-size: 0.75rem;
    color: #767676;
`  
const PostContent = styled.div`
    margin: 0 40px 0 54px;
    padding-left: 0.75rem;
`

const PostTxt = styled.p`
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.125rem;
`

const PostImgWrapper = styled.div`
    text-align: center;
`
const PostImg = styled.img`
    width: 19rem;
    margin-bottom: 0.750rem;
`

const PostDate = styled.p`
    margin-top: 1rem;
    color: #767676;
    font-size: 0.625em;
`

function PostCard() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);

    const modalItemList = [
        {
            content: "삭제",
            onClick: () => {
                setAlertModal(true);
            },
            
        },
        {
            content: "수정",
            onClick: () => {},
        }
    ];

    const deleteBtn = {
        content: "삭제",
        onClick: () => {},
    };

    const [InfoState] = useContext(AuthContext);
    const img = InfoState.MyInformations[0].myImage;
    const name = InfoState.MyInformations[0].myUsername;
    const account = InfoState.MyInformations[0].myAccountname;

    const imgRef = useRef();
    useEffect(() => {
        imgRef.current.style.backgroundImage = `url(${img})`;
    }, [img]);

    const Res = async () => {
        const headerData = {
            headers: {
              "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
        };
        
        const postRes = await axios.get(
            `${API_URL}/post/:accountname/userpost`,
            headerData
        )
        
        console.log(postRes)
    }
    
    return(
        <>
        <PostWrapper>
            <PostInfo>
                <UserImgDiv ref={imgRef} />
                <PostInfoUser>
                    <PostInfoName>{name}</PostInfoName>
                    <PostInfoId>{`@${account}`}</PostInfoId>
                    <ModalBtn className='small' onClick={()=>setIsOpenModal(!isOpenModal)}/>
                </PostInfoUser>
            </PostInfo>
            <PostContent>
                <PostTxt>반짝이는 방황하여도, 간에 속에서 없으면, 고동을 모래뿐일 풀이 있는 황금시대다. 소담스러운 가슴에 그것은 인생을 뜨고, 돋고, 찬미를 같으며, 것이다. 청춘의 어디 인생에 스며들어 우리 바이며, 이상의 얼음 것은 것이다.</PostTxt>
                <PostImgWrapper>
                    <PostImg src={postImg}/>
                </PostImgWrapper>
            <PostIconContainer/>
            <PostDate>2022년 07월 15일</PostDate>
            </PostContent>
        </PostWrapper>

        <Modal 
                isOpenModal={isOpenModal} 
                setIsOpenModal={setIsOpenModal} 
                modalItemList={modalItemList} 
        />
        <AlertModal
                alertModal={alertModal}
                setAlertModal={setAlertModal}
                setIsOpenModal={setIsOpenModal}
                content={"게시글을 삭제할까요?"}
                deleteBtn={deleteBtn}
        />
        </>
    )
}

export default PostCard;