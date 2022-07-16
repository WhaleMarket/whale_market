import React from 'react';
import Header from '../../components/main/Homeheader';
import Feed from '../../components/main/homeFeed/FeedContent';
import Navbar from '../../components/main/Navbar';

function HomeFeed(){
    return(
        <>
            <Header />
                <Feed />
            <Navbar />
        </>
    );
}

export default HomeFeed;
