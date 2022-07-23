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
    width: calc(100% - 28px);
    padding: 0.813rem 0.750em 0.813rem 1rem;
    border-bottom: 0.5px solid #BDBDBD;
    background-color: white;
    z-index: 1;
`;

const Search = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background-color: inherit;
    background-image: url(${back});
    background-size: 1.375rem 1.375rem;
    &:hover{
        cursor: pointer;
    }
`;

const ChatPartner = styled.p`
    font-style: normal;
    font-weight: 700;
    font-size: 1.125rem;
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
        onClick: () => {},
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