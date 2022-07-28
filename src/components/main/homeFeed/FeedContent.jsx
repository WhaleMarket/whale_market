import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileSection from "./ProfileSection";
import IconGroup from "./IconGroup";
import AuthContext from "../../../context/AuthProvider";

const LayOut = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  padding: 53px 0 68px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media screen and (max-width: 768px) {
    width: 400px;
    padding: 53px 4% 68px;
  }
  @media screen and (max-width: 390px) {
    width: 330px;
    margin: 0 auto;
    padding: 53px 4% 68px;
  }
`;

const FeedWrapper = styled.li`
  display: flex;
  flex-direction: column;
  width: 600px;
  padding: 20px 50px 30px;
  margin-top: 30px;
  border: 1px solid #DBDBDB;
  border-radius: 10px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    width: 400px;
    padding: 10px 30px 25px;
  }

  @media screen and (max-width: 390px) {
    width: 100%;
    margin-top: 30px;
    padding: 10px 5% 25px;
  }
`;

const PassLink = styled(Link)`
  text-decoration: none;
`;

const ContentWrapper = styled.div`
  word-break: break-word;
  white-space: pre-wrap;
`;

const ContentText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 17.53px;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: max-content;
  margin-bottom: 16px;
  `;

const ContentImg = styled.img`
  overflow: hidden;
  width: 502px;
  height: 401px;
  margin-bottom: 10px;
  border-radius: 10px;
  object-fit: cover;

  &:first-child{
    margin-top: 16px;
  }

  @media screen and (max-width: 768px) {
    width: 338px;
    height: 270px;
  }
  
  @media screen and (max-width: 390px) {
    width: 100%;
    height: 230px;
  }
`;

const CreatedDate = styled.p`
  color: #767676;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
`;

function FeedContent() {
  const [InfoState] = useContext(AuthContext);

  const rendering = () => {
    const result = [];
    for (let i = 0; i < InfoState.MyInformations[5].accountname.length; i++) {
      const index = InfoState.MyInformations[4].accountname.indexOf(
        InfoState.MyInformations[5].accountname[i]
      );

      const createAt = InfoState.MyInformations[5].createdAt[i];
      const timeGap = parseInt(Date.now() - new Date(createAt));
      const hoursGap = Math.floor(timeGap / 3600000);
      const minsGap = Math.floor(timeGap / 60000);
      const secsGap = Math.floor(timeGap / 1000);

      result.push(
        <FeedWrapper key={i}>
          <PassLink to={`/profile/${InfoState.MyInformations[5].accountname[i]}`}>
            <ProfileSection
                src={InfoState.MyInformations[4].image[index]}
                username={InfoState.MyInformations[5].username[i]}
                accountname={InfoState.MyInformations[5].accountname[i]}
            />
          </PassLink>
          <ContentWrapper>
            <ContentText>{InfoState.MyInformations[5].content[i]}</ContentText>
            <ImgWrapper>
              {InfoState.MyInformations[5].image[i] &&
                InfoState.MyInformations[5].image[i]
                  .split(",")
                  .map((value, key) => {
                    return (
                      <ContentImg key={key} src={value} alt="게시글 이미지" />
                    );
                  })}
            </ImgWrapper>
            <IconGroup
              src={InfoState.MyInformations[4].image[index]}
              index={i}
              id={InfoState.MyInformations[5].id[i]}
              like={InfoState.MyInformations[5].heartCount[i]}
              comment={InfoState.MyInformations[5].commentCount[i]}
              liked={InfoState.MyInformations[5].hearted[i]}
            />
            <CreatedDate>
              {hoursGap < 24
                ? minsGap < 60
                  ? secsGap < 60
                    ? `방금 전`
                    : `${minsGap}분 전`
                  : `${hoursGap}시간 전`
                : `${createAt?.substr(0, 10).split("-")[0]}년 ${
                    createAt?.substr(0, 10).split("-")[1]
                  }월 ${createAt?.substr(0, 10).split("-")[2]}일`}
            </CreatedDate>
          </ContentWrapper>
        </FeedWrapper>
      );
    }
    return result;
  };

  return <LayOut>{rendering()}</LayOut>;
}

export default FeedContent;
