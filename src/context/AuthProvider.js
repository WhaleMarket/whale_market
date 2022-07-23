import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [myImage, setMyImage] = useState('');
    const [myUsername, setMyUsername] = useState('');
    const [myAccountname, setMyAccountname] = useState(
        localStorage.getItem('accountname')
        );
    const [myIntro, setMyIntro] = useState('');
    const [myFollowerCount, setMyFollowerCount] = useState('');
    const [myFollowingCount, setMyFollowingCount] = useState('');
    const [myFollowerList, setMyFollowerList] = useState([]);
        
    return (
        <AuthContext.Provider value={{ 
            auth, 
            setAuth,
            token,
            setToken,
            myImage,
            setMyImage,
            myUsername,
            setMyUsername,
            myAccountname,
            setMyAccountname,
            myIntro,
            setMyIntro,
            myFollowerCount,
            setMyFollowerCount,
            myFollowingCount,
            setMyFollowingCount,
            myFollowerList,
            setMyFollowerList
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;