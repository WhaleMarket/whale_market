import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const InfoState = useState({
    MyInformations: [
      {
        index: 0,
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
        index: 1,
        email: "",
        password: "",
        token: "",
      },
      {
        index: 2,
        label: "product",
        itemName: [],
        price: [],
        link: [],
        itemImage: [],
      },
      {
        index: 3,
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
        index: 4,
        label: "following Information",
        accountname: [],
        image: [],
      },
      {
        index: 5,
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
      {
        index: 6,
        label: "follower",
        accountname: [],
        username: [],
        image: [],
        intro: [],
        isfollow: [],
      },
      {
        index: 7,
        label: "following",
        accountname: [],
        username: [],
        image: [],
        intro: [],
        isfollow: [],
      },
      {
        index: 8,
        label: "userInformation",
        image: "",
        username: "",
        accountname: "",
        intro: "",
        followerCount: "",
        followingCount: "",
        followerList: [],
      },
      {
        index: 9,
        label: "userProduct",
        itemName: [],
        price: [],
        link: [],
        itemImage: [],
      },
      {
        index: 10,
        label: "postingEdit",
        content: [],
        image: [],
      },
    ],
  });

  return (
    <AuthContext.Provider value={InfoState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
