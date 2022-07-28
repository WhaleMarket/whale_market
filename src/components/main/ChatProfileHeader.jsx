import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import back from '../../assets/icon-arrow-left.png';
import ModalBtn from '../modal/ModalBtn';
import Modal from '../modal/Modal';
import AlertModal from '../modal/AlertModal';

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 54px;
    padding: 13px 12px 13px 16px;
    border-bottom: 0.5px solid #BDBDBD;
    background-color: #FFFFFF;
    box-sizing: border-box;
`;

const Search = styled.button`
    width: 24px;
    height: 24px;
    border: none;
    background-color: inherit;
    background-image: url(${back});
    background-size: 22px 22px;
    &:hover{
        cursor: pointer;
    }
`;

const ChatPartner = styled.p`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    width: 100vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function ChatProfileHeader(props){   
    const history = useHistory();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false); 

    const modalItemList = [
        {
            content: "설정 및 개인정보",
            onClick: () => {
                history.push('/profileedit');
            },
        },
        {
            content: "로그아웃",
            onClick: () => {
                setAlertModal(true);
            },
        }
    ];

    const deleteBtn = {
        content: "로그아웃",
        onClick: () => {
                localStorage.clear();
                document.location.href = "/";
        },
    };

    const quitModal = [
        {
            content: "채팅방 나가기",
            onClick: () => {
                setAlertModal(true);
            },
        }
    ];

    const quitBtn = {
        content: "나가기",
        onClick: () => {},
    };


    return (
        <Head>
            <Search onClick={() => history.goBack()} />
            <ChatPartner>{props.partner}</ChatPartner>

            <ModalBtn 
                onClick= {()=>{setIsOpenModal(!isOpenModal)}}
                /> 

            { props.partner ? 
            <>
                <Modal 
                    isOpenModal={isOpenModal} 
                    setIsOpenModal={setIsOpenModal} 
                    modalItemList={quitModal} 
                />
                <AlertModal
                    alertModal={alertModal}
                    setAlertModal={setAlertModal}
                    setIsOpenModal={setIsOpenModal}
                    content={"채팅방을 나가시겠어요?"}
                    deleteBtn={quitBtn}
                />
            </>
            : 
            <>
                <Modal 
                    isOpenModal={isOpenModal} 
                    setIsOpenModal={setIsOpenModal} 
                    modalItemList={modalItemList} 
                />
                <AlertModal
                    alertModal={alertModal}
                    setAlertModal={setAlertModal}
                    setIsOpenModal={setIsOpenModal}
                    content={"로그아웃하시겠어요?"}
                    deleteBtn={deleteBtn}
                />
            </>
            }
        </Head>
    );
}

export default ChatProfileHeader;