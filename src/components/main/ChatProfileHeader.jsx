import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import menu from '../../assets/icon-more-vertical.png';
import back from '../../assets/icon-arrow-left.png';

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: calc(100% - 28px);
    padding: 0.813rem 0.750em 0.813rem 1rem;
    border-bottom: 0.5px solid #BDBDBD;
    background-color: white;
    z-index: 1;
`;

const Search = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background-color: inherit;
    background-image: ${(props)=>(props.className === 'back' ? `url(${back})` : `url(${menu})`)};
    &:hover{
        cursor: pointer;
    }
`;

const ChatPartner = styled.p`
    font-style: normal;
    font-weight: 700;
    font-size: 1.125rem;
    text-align: center;
    width: 100vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function ChatProfileHeader(props){   
    const history = useHistory();

    return(
        <Head>
            <Search className='back' onClick={() => history.goBack()} />
            <ChatPartner>{props.partner}</ChatPartner>
            <Search className='menu' />
        </Head>
    );
}

export default ChatProfileHeader;