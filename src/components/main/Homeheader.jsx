import styled from 'styled-components'
import search_icon from '../../assets/icon-search.png'

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
    width: 24px;
    height: 24px;
    border: none;
    background-color: inherit;
    background-image: url(${search_icon});
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
            <Search></Search>
        </Head>
    )
}

export default Header;