import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import back from '../../../assets/icon-arrow-left.png'
import save from '../../../assets/Ms--Disabled-button.png'

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: calc(100% - 28px);
    padding: 0.813rem 0.750rem 0.813rem 1rem;
    border-bottom: 0.031rem solid #BDBDBD;
    background-color: white;
    position: relative;
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
const SaveBtn = styled.button`
    width: 5.625rem;
    height: 2rem;
    border: none;
    background-color: inherit;
    background-image: url(${save});
    background-size: 5.625rem 2rem;
    &:hover{
        cursor: pointer;
    }
`

function ProfileEditHeader(){   
    const history = useHistory();
    return(
        <Head>
            <BackBtn  onClick={() => history.goBack()}/>
            <SaveBtn/>
        </Head>
    )
}

export default ProfileEditHeader;