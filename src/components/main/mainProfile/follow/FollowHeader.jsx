import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import back from '../../../../assets/icon-arrow-left.png';

const Head = styled.header`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 54px;
    padding: 13px 12px 13px 16px;
    border-bottom: 0.5px solid #bdbdbd;
    background-color: #ffffff;
    box-sizing: border-box;
`;

const BackBtn = styled.button`
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

const FollowTxt = styled.h1`
    margin-left: 8px;
    font-size: 13px;
`;

function FollowHeader() {
    const history = useHistory();

    return (
        <Head>
            <BackBtn onClick={() => history.goBack()} />
            <FollowTxt>
                {window.location.pathname.includes('followers')
                    ? 'Followers'
                    : 'Followings'}
            </FollowTxt>
        </Head>
    );
}

export default FollowHeader;
