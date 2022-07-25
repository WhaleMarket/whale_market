import React, { useContext, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../Portal";
import PostContent from "./PostContent";
import AuthContext from "../../../context/AuthProvider";
import prev from "../../../assets/prev-icon.png";
import next from "../../../assets/next-icon.png";

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
  visibility: ${(props) => (props.postModal === false ? "hidden" : "visible")};
  opacity: ${(props) => (props.postModal === false ? "0" : "1")};
`;

const ModalWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: #ffffff;
  width: ${(props) =>
    props.className === "NoImg" ? null : "calc(100% - 35px)"};
  width: ${(props) => (props.IsImage !== "" ? null : `calc(100% - 35px)`)};
  max-width: 900px;
  height: 500px;
  z-index: 10;
  margin: 0 auto;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: calc(100% - 55px);
    height: fit-content;
  }
`;

const ContentImg = styled.img`
  width: 70%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px 0 0 10px;

  @media screen and (max-width: 600px) {
    width: 100%;
    border-radius: 10px 10px 0 0;
  }
`;

const MoveBtn = styled.button`
  border: 0;
  width: 50px;
  height: 50px;
  background-color: transparent;
  background-image: ${(props) =>
    props.direction === "next" ? `url(${next})` : `url(${prev})`};
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 220px;
  right: ${(props) => (props.direction === "next" ? `272px` : `none`)};
`;

function PostModal({ postModal, setPostModal, id, index, src }) {
  const [InfoState] = useContext(AuthContext);
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <ModalPortal>
      <ModalBg postModal={postModal} onClick={() => setPostModal(false)}>
        {InfoState.MyInformations[5].image[index] !== "" ? (
          <ModalWrapper
            IsImage={InfoState.MyInformations[5].image[index]}
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
                InfoState.MyInformations[5].image[index].split(",")[imgIndex]
              }
            />
            {imgIndex !==
              InfoState.MyInformations[5].image[index].split(",").length -
                1 && (
              <MoveBtn
                type="button"
                direction="next"
                onClick={() => {
                  setImgIndex(imgIndex + 1);
                }}
              />
            )}
            <PostContent src={src} id={id} index={index} />
          </ModalWrapper>
        ) : (
          <ModalWrapper
            className="NoImg"
            postModal={postModal}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <PostContent src={src} id={id} index={index} />
          </ModalWrapper>
        )}
      </ModalBg>
    </ModalPortal>
  );
}

export default PostModal;
