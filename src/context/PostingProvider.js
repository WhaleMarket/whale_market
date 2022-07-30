import { createContext, useState } from 'react';

const PostingContext = createContext();

export const PostingProvider = ({ children }) => {
    const PostingState = useState({
        data: [
            {
                accountname: '',
                user: [],
                postdata: [],
                followeruser: [],
                followinguser: [],
            },
        ],
    });
    return (
        <PostingContext.Provider value={PostingState}>
            {children}
        </PostingContext.Provider>
    );
};

export default PostingContext;
