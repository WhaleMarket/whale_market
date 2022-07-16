import React from 'react';
import styled from 'styled-components';
import ProfileSection from './ProfileSection';
// import axios from 'axios';
// import { API_URL } from '../../../constants/defaultUrl';
import IconGroup from './IconGroup';

import dummy from '../../../data.json';

const LayOut =styled.div`
    padding: 53px 0 56px;
`

const FeedWrapper = styled.div`
    display: inline-block;
    width: calc(100% - 32px);
    margin: 20px 16px 0;
`

const ContentWrapper = styled.div`
    margin-left: 54px;
`

const ContentText = styled.p`
    margin: 12px 0 16px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.53px;
`

const ContentImg = styled.img`
    overflow: hidden; //
    min-width: 304px;
    min-height: 228px;
    border: 1px solid ; //지울 것 
    border-radius: 10px;
    object-fit: cover;
`

const CreatedDate = styled.p`
    margin-bottom: 4px;
    color: #767676;
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
`

function FeedContent () {
    return (
        <LayOut>
            {dummy.post.map( item => {
                return (
                    <FeedWrapper key={item.id}>
                        <ProfileSection 
                            profileImg={item.author.profileImg}
                            username={item.author.username}
                            accountname={item.author.accountname}/>
                        <ContentWrapper>
                            <ContentText>{item.content}</ContentText>
                            <ContentImg 
                            src={item.image}
                            alt="게시글 이미지"
                            />
                            {/* image없으면 띄우지 말것  */}
                            <IconGroup 
                                heartCount={item.heartCount}
                                comment={item.commentCount}
                                hearted={item.hearted} 
                            />
                            <CreatedDate>{item.updatedAt}</CreatedDate>
                        </ContentWrapper>
                    </FeedWrapper>
                )
            })}
        </LayOut>
    );
}

export default FeedContent;