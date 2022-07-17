import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import back from '../../../../assets/icon-arrow-left.png'

const Head = styled.header`
    display: flex;
    align-items: center;
    position: relative;
    width: calc(100% - 28px);
    padding: 0.813rem 0.750rem 0.813rem 1rem;
    border-bottom: 0.031rem solid #BDBDBD;
    background-color: white;
`

const BackBtn = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background-color: inherit;
    background-image: url(${back});
    &:hover{
        cursor: pointer;
    }
`

const FollowTxt = styled.h1`
    margin-left: 0.5rem;
    font-size: 0.875rem;
`

function FollowHeader(){
    const history = useHistory();

    return(
        <Head>
            <BackBtn  onClick={() => history.goBack()}/>
            <FollowTxt>Followers</FollowTxt>
        </Head>
    )
}

export default FollowHeader;