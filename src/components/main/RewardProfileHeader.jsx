import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../constants/defaultUrl";
import styled from "styled-components";
import back from "../../assets/icon-arrow-left.png";
import ModalBtn from "../modal/ModalBtn";
import Modal from "../modal/Modal";
import AlertModal from "../modal/AlertModal";
import MarqueeEvent from "../../theme/marquee";
import whale_left from "../../assets/whale-small-left.png";

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 54px;
  padding: 13px 12px 13px 16px;
  border-bottom: 0.5px solid #bdbdbd;
  background-color: #ffffff;
  box-sizing: border-box;

  @media screen and (max-width: 390px) {
    padding: 13px 5px 13px 5px;
  }
`;

const Search = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: inherit;
  background-image: url(${back});
  background-size: 22px 22px;
  &:hover {
    cursor: pointer;
  }
`;

const Marquee = styled.div`
  
  @media screen and (max-width: 768px) {
    width: 90%;
  }

  @media screen and (max-width: 390px) {
    width: 85%;
  }
`;

const Outer = styled.div`
  overflow: hidden;
`;

const Inner = styled.ul`
  display: flex;
  position: relative;
  width: 200%;
  
  &:nth-child(1) {
    animation: ${MarqueeEvent} 6s linear infinite;
  }
`;

const Content = styled.li`
  width: 100%;
  font-size: 14px;
  color: #515151;

  ::before {
    display: inline-block;
    left: 0;
    vertical-align: middle;
    width: 24px;
    height: 14px;
    margin-right: 5px;
    background-image: url(${whale_left});
    background-size: 24px 14px;
    background-repeat: no-repeat;
    content: "";
  }

  ::after {
    display: inline-block;
    left: 0;
    vertical-align: middle;
    width: 24px;
    height: 14px;
    margin-left: 5px;
    background-image: url(${whale_left});
    background-size: 24px 14px;
    background-repeat: no-repeat;
    content: "";
  }
`;

const CountStrong = styled.strong`
  color: #00bcd4;
  font-weight: 600;
`

function RewardProfileHeader() {
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [InfoState] = useContext(AuthContext);
  const [heart, setHeart] = useState(0);

  const modalItemList = [
    {
      content: "설정 및 개인정보",
      onClick: () => {
        history.push("/profileedit");
      },
    },
    {
      content: "로그아웃",
      onClick: () => {
        setAlertModal(true);
      },
    },
  ];

  const deleteBtn = {
    content: "로그아웃",
    onClick: () => {
      localStorage.clear();
      document.location.href = "/";
    },
  };

  async function getPost() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      };
      const response = await axios.get(
        `${API_URL}/post/${InfoState.MyInformations[0].myAccountname}/userpost/?limit=100&skip=0`,
        config
      );
      let heartCount = 0;
      response.data.post.map((value) => {
        return (heartCount += value.heartCount);
      });
      setHeart(heartCount);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    InfoState.MyInformations[0].myAccountname && getPost();
  }, [InfoState.MyInformations[0].myAccountname]);

  return (
    <Head>
      <Search onClick={() => history.goBack()} />
      <Marquee>
        <Outer>
          <Inner>
            <Content>
              현재 {InfoState.MyInformations[0].myUsername}님이 받은 칭찬이{" "}
              <CountStrong>
                {heart}
              </CountStrong>
              개를 달성했어요!
            </Content>
            <Content>
              현재 {InfoState.MyInformations[0].myUsername}님이 받은 칭찬이{" "}
              <CountStrong>
              {heart}
              </CountStrong>
              개를 달성했어요!              
            </Content>
          </Inner>
        </Outer>
      </Marquee>
      <ModalBtn
        onClick={() => {
          setIsOpenModal(!isOpenModal);
        }}
      />
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
    </Head>
  );
}

export default RewardProfileHeader;
