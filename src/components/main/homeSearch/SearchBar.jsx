import React from 'react';
import styled from 'styled-components';
import GoBackBtn from './GoBackBtn';

const SearchHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 54px;
    padding: 8px 16px;
    border-bottom: 0.5px solid #BDBDBD;
    background-color: #FFFFFF;
    box-sizing: border-box;
`;

const SearchForm = styled.form`
    width: 100%;
    margin-left: 12px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 32px;
    border: none;
    border-radius: 32px;
    background-color: #F2F2F2;
    box-sizing: border-box;
    text-indent: 16px;
    &:focus {
        outline: #00BCD4 2px solid;
    }
`;

function SearchBar({ value, handleKeyword }) {
    return (
        <SearchHeader>
            <GoBackBtn />
            <SearchForm>
                <label className='a11yhidden' htmlFor='searchInput'>계정 검색</label>
                <input hidden='hidden' />
                <SearchInput 
                    type='text' 
                    placeholder='계정 검색' 
                    name='searchInput' 
                    id='searchInput' 
                    value={value}
                    onChange={handleKeyword}
                    autoFocus
                />
            </SearchForm>
        </SearchHeader>
    );
}

export default SearchBar;
