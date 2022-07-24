import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const InfoState = useState({
    MyInformations: [
      {
        label: "login",
        token: localStorage.getItem("token"),
        myImage: "",
        myUsername: "",
        myAccountname: localStorage.getItem("accountname"),
        myIntro: "",
        myFollowerCount: "",
        myFollowingCount: "",
        myFollowerList: [],
      },
      {
        email: "",
        password: "",
        token: "",
      },
      {
        label: "product",
        itemName: [],
        price: [],
        link: [],
        itemImage: [],
      },
      {
        label: "posting",
        id: [],
        content: [],
        image: [],
        createdAt: [],
        updatedAt: [],
        hearted: [],
        heartCount: [],
        commentCount: [],
      },
      {
        label: "following Information",
        accountname: [],
        image: [],
      },
      {
        label: "feed Information",
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
    <AuthContext.Provider value={InfoState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
