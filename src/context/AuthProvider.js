import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const InfoState = useState({
        MyInformations: [
            {
                index: 0,
                label: 'login',
                token: localStorage.getItem('token'),
                myImage: '',
                myUsername: '',
                myAccountname: localStorage.getItem('accountname'),
                myIntro: '',
                myFollowerCount: '',
                myFollowingCount: '',
                myFollowerList: [],
            },
            {
                index: 1,
                email: '',
                password: '',
                token: '',
            },
            {
                index: 2,
                label: 'following Information',
                accountname: [],
                image: [],
            },
            {
                index: 3,
                label: 'feed Information',
                id: [],
                username: [],
                accountname: [],
                content: [],
                image: [],
                heartCount: [],
                commentCount: [],
                hearted: [],
                updatedAt: [],
                createdAt: [],
            },
        ],
    });

    return (
        <AuthContext.Provider value={InfoState}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
