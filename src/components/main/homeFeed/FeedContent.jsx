import React, { useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../context/AuthProvider';
import ProfileSection from './ProfileSection';
import IconGroup from './IconGroup';
import { API_URL } from '../../../constants/defaultUrl';
import basic_profile_image from '../../../assets/basic-profile-img.png';

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
        padding: 53px 10px 68px;
    }
`;

const FeedWrapper = styled.li`
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 20px 50px 30px;
    margin-top: 30px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    box-sizing: border-box;

    @media screen and (max-width: 768px) {
        width: 400px;
        padding: 10px 30px 25px;
    }

    @media screen and (max-width: 390px) {
        width: 100%;
        margin-top: 30px;
        padding: 4px 5% 25px;
    }
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

    &:first-child {
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
        for (
            let i = 0;
            i < InfoState.MyInformations[3].accountname.length;
            i++
        ) {
            const index = InfoState.MyInformations[2].accountname.indexOf(
                InfoState.MyInformations[3].accountname[i]
            );

            const createAt = InfoState.MyInformations[3].createdAt[i];
            const timeGap = parseInt(Date.now() - new Date(createAt));
            const hoursGap = Math.floor(timeGap / 3600000);
            const minsGap = Math.floor(timeGap / 60000);
            const secsGap = Math.floor(timeGap / 1000);

            result.push(
                <FeedWrapper key={i}>
                    <ProfileSection
                        src={
                            InfoState.MyInformations[2].image[index] !==
                                `${API_URL}/undefined` &&
                            InfoState.MyInformations[2].image[index]?.includes(
                                API_URL
                            )
                                ? InfoState.MyInformations[2].image[index]
                                : basic_profile_image
                        }
                        username={InfoState.MyInformations[3].username[i]}
                        accountname={InfoState.MyInformations[3].accountname[i]}
                        postId={InfoState.MyInformations[3].id[i]}
                    />
                    <ContentWrapper>
                        <ContentText>
                            {InfoState.MyInformations[3].content[i]}
                        </ContentText>
                        <ImgWrapper>
                            {InfoState.MyInformations[3].image[i] &&
                                InfoState.MyInformations[3].image[i]
                                    .split(',')
                                    .map((value, key) => {
                                        return (
                                            <ContentImg
                                                key={key}
                                                src={value}
                                                alt="게시글 이미지"
                                            />
                                        );
                                    })}
                        </ImgWrapper>
                        <IconGroup
                            src={InfoState.MyInformations[2].image[index]}
                            index={i}
                            id={InfoState.MyInformations[3].id[i]}
                            like={InfoState.MyInformations[3].heartCount[i]}
                            comment={
                                InfoState.MyInformations[3].commentCount[i]
                            }
                            liked={InfoState.MyInformations[3].hearted[i]}
                        />
                        <CreatedDate>
                            {hoursGap < 24
                                ? minsGap < 60
                                    ? secsGap < 60
                                        ? `방금 전`
                                        : `${minsGap}분 전`
                                    : `${hoursGap}시간 전`
                                : `${createAt?.substr(0, 10).split('-')[0]}년 ${
                                      createAt?.substr(0, 10).split('-')[1]
                                  }월 ${
                                      createAt?.substr(0, 10).split('-')[2]
                                  }일`}
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
