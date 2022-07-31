import styled from 'styled-components';
import CancleBtn from './CancleBtn';

const PostImage = styled.img`
    display: block;
    margin: 10px 10px 0 15px;
    width: 200px;
    height: auto;
    border-radius: 10px;
    
    @media screen and (max-width: 390px) {
        margin: 10px 0;
    }
`;

function PostingImg({ src, alt }) {
    return (
        <>
            <PostImage src={src} alt={alt} />
            <CancleBtn src={src} index={alt.substr(0, 1)} />
        </>
    );
}

export default PostingImg;
