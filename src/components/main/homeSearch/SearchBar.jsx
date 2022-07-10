import React from 'react';
import styled from 'styled-components';
import GoBackBtn from './GoBackBtn';

const SearchHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    padding: 0.5rem 1rem;
    border-bottom: 0.5px solid #BDBDBD;
    background-color: white;
    box-sizing: border-box;
`

const SearchForm = styled.form`
    width: 100%;
    margin-left: 0.75rem;
`

const SearchInput = styled.input`
    width: 100%;
    height: 2rem;
    border: none;
    border-radius: 2rem;
    background-color: #F2F2F2;
    box-sizing: border-box;
    text-indent: 1rem;
`

function SearchBar() {
    return (
        <SearchHeader>
            <GoBackBtn />
            <SearchForm>
                <SearchInput type='text' placeholder='계정 검색' name='searchInput' id='searchInput' />
            </SearchForm>
        </SearchHeader>
    );
}

export default SearchBar;
