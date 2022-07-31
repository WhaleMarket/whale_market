import styled from 'styled-components';
import Profile from './Profile';
import PostingArea from './Textarea';

const PostingWrapper = styled.section`
    margin: 70px 0;
    display: flex;
    justify-content: left;
    align-items: flex-start;
`;

function PostingSection() {
    return (
        <>
            <PostingWrapper>
                <Profile />
                <PostingArea />
            </PostingWrapper>
        </>
    );
}

export default PostingSection;
