import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../../context/AuthProvider';
import UploadContext from '../../../../context/UploadProvider';
import UploadPostingContext from '../../../../context/UploadImageListProvider';
import PostingModificationContext from '../../../../context/PostingModificationProvider';
import { API_URL } from '../../../../constants/defaultUrl';
import styled from 'styled-components';
import PostingImg from './PostingImg';
import LoadingPage from '../../../../pages/LoadingPage';

const Wrapper = styled.article`
    display: flex;
    justify-content: left;
    align-items: flex-start;

    @media screen and (max-width: 390px) {
        flex-direction: column;
    }
`;

function ImgWrapper({ text }) {
    const [uploadPostingState] = useContext(UploadPostingContext);
    const [PostingModificationState, setPostingModificationState] = useContext(
        PostingModificationContext
    );
    const [, setUploadState] = useContext(UploadContext);
    const [InfoState] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const postId = params.postId;

    useEffect(() => {
        if (uploadPostingState.required[1].prevUrl.length === 0 && !text) {
            setUploadState(false);
        } else {
            setUploadState(true);
        }
    }, [uploadPostingState, setUploadState, text]);

    useEffect(() => {
        async function getPost() {
            setLoading(true);
            try {
                const updateConfig = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const response = await axios.get(
                    `${API_URL}/post/` + postId,
                    updateConfig
                );
                setPostingModificationState((PostingModificationState) => {
                    PostingModificationState.post[0] = {
                        ...PostingModificationState.post[0],
                        image: response.data.post.image,
                    };
                    return { post: PostingModificationState.post };
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
                alert('error');
            }
        }
        postId && getPost();
    }, [postId]);

    return loading ? (
        <LoadingPage />
    ) : (
        <>
            <Wrapper>
                {postId
                    ? (PostingModificationState.post[0].image ||
                          uploadPostingState.required[1].prevUrl.length !==
                              0) &&
                      PostingModificationState.post[0].image
                          .split(',')
                          .concat(uploadPostingState.required[1].prevUrl)
                          .filter((index) => {
                              return index !== '';
                          })
                          .map((index, key) => {
                              return (
                                  <PostingImg
                                      key={key}
                                      src={index}
                                      alt={`${key} Image`}
                                  />
                              );
                          })
                    : uploadPostingState.required[1].prevUrl.length !== 0
                    ? uploadPostingState.required[1].prevUrl.map(
                          (index, key) => (
                              <PostingImg
                                  key={key}
                                  src={index}
                                  alt={`${key} Image`}
                              />
                          )
                      )
                    : ''}
            </Wrapper>
        </>
    );
}

export default ImgWrapper;
