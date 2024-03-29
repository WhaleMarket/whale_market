import React, { useRef } from 'react';
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
    border-bottom: 0.5px solid #bdbdbd;
    background-color: #ffffff;
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
    background-color: #f2f2f2;
    box-sizing: border-box;
    text-indent: 16px;
    &:focus {
        outline: #00bcd4 2px solid;
    }
`;

function SearchBar({ setKeyword }) {
    const input_ref = useRef();

    const inputState = () => {
        if (input_ref) {
            setKeyword(input_ref.current.value);
        }
    };
    return (
        <SearchHeader>
            <GoBackBtn />
            <SearchForm>
                <label className="a11yhidden" htmlFor="searchInput">
                    계정 검색
                </label>
                <input hidden="hidden" />
                <SearchInput
                    type="text"
                    placeholder="계정 검색"
                    name="searchInput"
                    id="searchInput"
                    ref={input_ref}
                    onInput={inputState}
                    autoFocus
                />
            </SearchForm>
        </SearchHeader>
    );
}

export default SearchBar;
