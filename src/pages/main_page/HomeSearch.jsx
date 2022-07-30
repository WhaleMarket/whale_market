import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/defaultUrl';
import SearchBar from '../../components/main/homeSearch/SearchBar';
import SearchList from '../../components/main/homeSearch/SearchList';
import Navbar from '../../components/main/Navbar';

function HomeSearch(){
    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        if (keyword !== '') {
            const search = async () => {
                    const token = window.localStorage.getItem('token');
                    const config = {
                        headers: {
                            "Authorization" : `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    };
                    const response = await axios.get(
                        `${API_URL}/user/searchuser/?keyword=${keyword}`,
                        config
                    );
                    setSearchResult(response.data);
            };
            search();
        }
    }, [keyword]);

    return(
        <>
            <SearchBar setKeyword={setKeyword}/>
            {keyword !== '' && <SearchList keyword={keyword} searchResult={searchResult} />}
            <Navbar />
        </>
    );
}

export default HomeSearch;
