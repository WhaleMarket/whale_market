import styled from 'styled-components'
import search_icon from '../../assets/icon-search.png'
import { Link } from 'react-router-dom'

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: calc(100% - 28px);
    padding: 13px 12px 13px 16px;
    border-bottom: 0.5px solid #BDBDBD;
    background-color: white;
`

const Search = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background-color: inherit;
    background-image: url(${search_icon});
    background-size: 1.5rem 1.5rem;
    &:hover{
        cursor: pointer;
    }
`

const Title = styled.h1`
    font-size: 18px;
    font-weight: 500;
`

function Header(){
    return(
        <Head>
            <Title>감귤마켓 피드</Title>
            <Link to = '/search'>
                <Search />
            </Link>
        </Head>
    )
}

export default Header;