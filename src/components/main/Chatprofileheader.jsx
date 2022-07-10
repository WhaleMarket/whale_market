import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import menu from '../../assets/icon-more-vertical.png'
import back from '../../assets/icon-arrow-left.png'

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: calc(100% - 28px);
    padding: 13px 12px 13px 16px;
    margin-bottom: 1.875rem;
    border-bottom: 0.5px solid #BDBDBD;
    background-color: white;
`

const Search = styled.button`
    width: 24px;
    height: 24px;
    border: none;
    background-color: inherit;
    background-image: ${(props)=>(props.className === 'back' ? `url(${back})` : `url(${menu})`)};
    &:hover{
        cursor: pointer;
    }
`

function ChatProfileHeader(){   
    const history = useHistory();
    return(
        <Head>
            <Search className='back' onClick={() => history.goBack()}></Search>
            <Search className='menu'></Search>
        </Head>
    )
}

export default ChatProfileHeader