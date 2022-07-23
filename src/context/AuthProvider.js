import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const InfoState = useState({
        MyInformations: [
            {
                token: localStorage.getItem('token'),
                myImage: "",
                myUsername: "",
                myAccountname: localStorage.getItem('accountname'),
                myIntro: "",
                myFollowerCount: "",
                myFollowingCount: "",
                myFollowerList: []
            },
            {
                email: "",
                password: "",
                token: "",
            },
        ]
    })
        
    return (
        <AuthContext.Provider value={InfoState}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;