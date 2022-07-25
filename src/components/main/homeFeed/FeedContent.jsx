import React, { useContext } from "react";
import styled from "styled-components";
import ProfileSection from "./ProfileSection";
import IconGroup from "./IconGroup";
import AuthContext from "../../../context/AuthProvider";

const LayOut = styled.ul`
  padding: 53px 0 68px 0;
  /* position: fixed; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedWrapper = styled.li`
  border: 1px solid black;
  border-radius: 10px;
  display: inline-block;
  /* width: calc(100% - 32px); */
  min-width: 358px;
  margin: 20px 16px 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ContentWrapper = styled.div``;

const ContentText = styled.p`
  margin: 12px 0 16px 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.53px;
`;

const ContentImg = styled.img`
  overflow: hidden; //
  max-width: 360px;
  min-height: 228px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
              id={InfoState.MyInformations[5].id[i]}
              like={InfoState.MyInformations[5].heartCount[i]}
              comment={InfoState.MyInformations[5].commentCount[i]}
              liked={InfoState.MyInformations[5].hearted[i]}
            />
            <CreatedDate>
              {InfoState.MyInformations[5].updatedAt[i]}
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
