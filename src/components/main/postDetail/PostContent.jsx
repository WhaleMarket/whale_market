import React, { useContext, useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import styled from "styled-components";
import Comment from "./Comment";
import AuthContext from "../../../context/AuthProvider";
import axios from "axios";
import { API_URL } from "../../../constants/defaultUrl";

const LayOut = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 4px 10px 16px;
`;

const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 15px;
  background: url(${(props) => props.src});
  background-size: 36px 36px;
  overflow: hidden;
  object-fit: cover;
`;

const UserAccount = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
`;

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TextContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  padding: 0 16px 16px 16px;
`;

const CommentWrapper = styled.ul`
  border-top: 0.5px solid #bdbdbd;
`;

function PostContent({ id, index, src }) {
  const [InfoState] = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  async function fetchData() {
    try {
      const commentconfig = {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      };
      const res = await axios.get(
        `${API_URL}/post/${id}/comments`,
        commentconfig
      );
      setComments([res.data.comments]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayOut>
      <UserInfo>
        <UserProfile src={src} />
        <UserAccount>{InfoState.MyInformations[5].username[index]}</UserAccount>
      </UserInfo>
      <Wrapper>
        {InfoState.MyInformations[5].content[index] !== "" && (
          <TextContent>
            {InfoState.MyInformations[5].content[index]}
          </TextContent>
        )}
        <CommentWrapper>
          {comments[0] !== undefined &&
            (comments[0].length > 0 ? (
              comments[0].map((value, key) => {
                return <Comment value={value} key={key} />;
              })
            ) : (
              <p>아직 댓글이 없습니다.</p>
            ))}
        </CommentWrapper>
      </Wrapper>

      <CommentInput
        id={id}
        Liked={InfoState.MyInformations[5].hearted[index]}
        setComments={setComments}
      />
    </LayOut>
  );
}

export default PostContent;
