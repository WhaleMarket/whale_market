import React, { useContext } from "react";
import styled from "styled-components";
import ProfileSection from "./ProfileSection";
import IconGroup from "./IconGroup";
import AuthContext from "../../../context/AuthProvider";

const LayOut = styled.ul`
  width: 50vw;
  padding: 53px 0 68px;
  margin: 0 auto;
  /* position: fixed; */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 53px 4% 68px;
  }
`;

const FeedWrapper = styled.li`
  border: solid #dbdbdb 1px;
  border-radius: 10px;
  display: inline-block;
  /* width: calc(100% - 32px); */
  width: 100%;
  /* min-width: 358px; */
  margin-top: 20px;
  /* padding: 53px 4% 68px ; */
  padding: 0 8% 30px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  word-break: break-word;
`;

const ContentText = styled.p`
  margin-bottom: 28px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.53px;
  @media screen and (max-width: 855px) {
    margin-bottom: 16px;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  margin: 0 auto 24px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentImg = styled.img`
  overflow: hidden;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 10px;
  @media screen and (max-width: 855px) {
    height: 228px;
  }
`;

const CreatedDate = styled.p`
  margin-bottom: 4px;
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
          <ProfileSection
            src={InfoState.MyInformations[4].image[index]}
            username={InfoState.MyInformations[5].username[i]}
            accountname={InfoState.MyInformations[5].accountname[i]}
          />
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
