import styled from "styled-components";
import search_icon from "../../assets/icon-search.png";
import { Link } from "react-router-dom";

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 54px;
  padding: 13px 12px 13px 16px;
  border-bottom: 0.5px solid #BDBDBD;
  background-color: #FFFFFF;
  box-sizing: border-box;
`;

const Search = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: inherit;
  background-image: url(${search_icon});
  background-size: 24px 24px;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

function Header() {
  return (
    <Head>
      <Title>🐳웨일마켓 피드</Title>
      <Link to="/home/search">
        <Search />
      </Link>
    </Head>
  );
}

export default Header;
