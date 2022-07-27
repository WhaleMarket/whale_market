import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/main/homeSearch/SearchBar';
import Navbar from '../../components/main/Navbar';
import SearchList from '../../components/main/homeSearch/SearchList';
import axios from 'axios';
import { API_URL } from '../../constants/defaultUrl';

function HomeSearch(){
    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword] = useState('');

    function handleKeyword(event) {
        setKeyword(event.target.value);
        if (event.target.value === '') {
            setSearchResult([]);
        }
    }

    useEffect(() => {
        if (keyword) {
            const search = async () => {
                    const token = window.localStorage.getItem('token');
                    const config = {
                        headers: {
                            "Authorization" : `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    };
                    const response = await axios.get(
                        `${API_URL}/user/searchuser/?keyword=${keyword}/?limit=100&skip=0`,
                        config
                    );
                    setSearchResult(response.data);
            };
            search();
        }
    }, [keyword]);

    return(
        <>
            <SearchBar value={keyword} handleKeyword={handleKeyword} />
            <SearchList keyword={keyword} searchResult={searchResult} />
            <Navbar />
        </>
    );
}

export default HomeSearch;
