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
    border-bottom: 0.5px solid #BDBDBD;
    background-color: white;
    position: relative;
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
    return(
        <Head>
            <Search className='back'></Search>
            <Search className='menu'></Search>
        </Head>
    )
}

export default ChatProfileHeader