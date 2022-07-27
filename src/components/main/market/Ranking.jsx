import styled from "styled-components";
import crown from "../../../assets/crown.png"

const RankingSection = styled.section`
    margin: 50px;
    padding-bottom: 100px;
    text-align: center;
    color: #515151;
    @media screen and (max-width: 1200px) {
      margin-top: 40px;
    }
    @media screen and (max-width: 480px) {
      width: 100%;
      padding-bottom: 90px;
    }
`

const RankingTit = styled.h1`
    font-size: 36px;
    font-weight: 600;
    color: #515151;
    @media screen and (max-width: 1200px) {
    font-size: 32px;
    }
    @media screen and (max-width: 480px) {
      margin: 14px auto;
    }
    ::before {
        display: inline-block;
        left: 0;
        vertical-align: middle;
        width: 48px;
        height: 48px;
        margin-right: 16px;
        background-image: url(${crown});
        background-size: 48px 48px;
        background-repeat: no-repeat;
        content: '';
  }
`

const UserWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 80%;
    margin: 50px auto;
    @media screen and (max-width: 1200px) {
        margin: 30px auto;
    }
    @media screen and (max-width: 480px) {
      width: 90%;
      gap: 16px;
    }
`

const FollowWrapper = styled.div`
`

const RankingUser =styled.p`
    margin-bottom: 24px;
    font-size: 20px;
    @media screen and (max-width: 480px) {
        margin-bottom: 24px;
    }
`

const UserList = styled.p`
    font-size: 16px;
    line-height: 28px;
    @media screen and (max-width: 1200px) {
    font-size: 14px;
    line-height: 24px;
    }

`

function Ranking() {
    return(
        <RankingSection>
            <RankingTit>Ranking</RankingTit>
            <UserWrapper>
                <FollowWrapper>
                <RankingUser>Followers</RankingUser>
                <UserList>1. follower name</UserList>
                </FollowWrapper>
                <FollowWrapper>
                <RankingUser>Followings</RankingUser>
                <UserList>1. following name</UserList>
                </FollowWrapper>
            </UserWrapper>
        </RankingSection>
    )
}

export default Ranking;