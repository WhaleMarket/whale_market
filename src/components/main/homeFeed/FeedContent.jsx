import React, { useContext } from 'react';
import styled from 'styled-components';
import ProfileSection from './ProfileSection';
import IconGroup from './IconGroup';
import AuthContext from '../../../context/AuthProvider';

const LayOut =styled.div`
    padding: 53px 0 56px;
    /* position: fixed; */
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FeedWrapper = styled.div`
    display: inline-block;
    /* width: calc(100% - 32px); */
    min-width: 358px;
    margin: 20px 16px 0;
    display: flex;
    flex-direction: column;
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
    max-width: 303px;
    min-height: 228px;
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

function FeedContent ({ posts }) {
    const [InfoState] = useContext(AuthContext);
    return (
        <LayOut>
            {InfoState.MyInformations[4].response[0] && posts.map((item, id)=> {
                return (
                    <FeedWrapper key={id}>
                        <ProfileSection 
                            src={InfoState.MyInformations[4].response[InfoState.MyInformations[4].response.map((index)=>{
                                return index["0"].accountname;
                            }).indexOf(item.author.accountname)]["0"].image}
                            username={item.author.username}
                            accountname={item.author.accountname}/>
                        <ContentWrapper>
                            <ContentText>{item.content}</ContentText>
                            {item.image && 
                                <ContentImg 
                                    src={item.image}
                                    alt="게시글 이미지"
                                />
                            }
                            <IconGroup 
                                heartCount={item.heartCount}
                                comment={item.commentCount}
                                hearted={item.hearted} 
                            />
                            <CreatedDate>{item.updatedAt}</CreatedDate>
                        </ContentWrapper>
                    </FeedWrapper>
                );
            })}
        </LayOut>
    );
}

export default FeedContent;