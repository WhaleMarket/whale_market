import styled from "styled-components"
import axios from "axios";
import { useContext ,useEffect, useState } from "react";
import AuthContext from "../../../../context/AuthProvider";
import { API_URL } from "../../../../constants/defaultUrl";

const Reward = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #D9D9D9;
  background-color: #fff;
  box-shadow: 0px 3px 3px #D9D9D9;
  transition: 0.3s;
  background-image: url(${props => props.src});
  background-size: 80px auto;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-flex;
  flex-direction: column;
  align-items: right;
  justify-content: flex-end;

  &:active{
    margin-top: ${props => props.disabled ? "0" : "5px"};
    box-shadow: ${props => props.disabled ? "0px 3px 3px grey" : "none"};
  }
`

function AlbumReward({ post, setEat, changePost, acquiredFeed}){
    const [InfoState] = useContext(AuthContext);
    const [Acquired, setAcquired] = useState([]);
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        async function acquiredReward() {
          try {
            const res = await axios.get(`${API_URL}/post/${post.id}/comments`, {
              headers: {
                Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                "Content-type": "application/json",
              },
            });
            setAcquired(res.data.comments);
            const feedres = await axios.get(`${API_URL}/post/${changePost.id}/comments`, {
                headers: {
                  Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                  "Content-type": "application/json",
                },
              });
              setFeed(feedres.data.comments);
          } catch (error) {
            console.error(error);
          }
        }
        acquiredReward();
      }, [InfoState.MyInformations]);

    async function getFeed() {
        try {
          const commentData = {
            comment: {
              content: "고래 먹이로 줬음",
            },
          };
          await axios.post(`${API_URL}/post/${changePost.id}/comments`, commentData, {
            headers: {
              Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
              "Content-type": "application/json",
            },
          });
          const res = await axios.get(`${API_URL}/post/${changePost.id}/comments`, {
            headers: {
              Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
              "Content-type": "application/json",
            },
          });
          setFeed(res.data.comments);
        } catch (error) {
          console.error(error);
        }
      }

    return(
        <Reward disabled={
            Acquired.filter((value)=>{
                return value.author.accountname === InfoState.MyInformations[0].myAccountname
            }).length - feed.filter((value) => {
                return value.author.accountname === InfoState.MyInformations[0].myAccountname
            }).length === 0 ? true : false
        } src={post.image} onClick={()=>{setEat(true); getFeed(); acquiredFeed();}}>{Acquired.filter((value)=>{
            return value.author.accountname === InfoState.MyInformations[0].myAccountname
        }).length - feed.filter((value) => {
            return value.author.accountname === InfoState.MyInformations[0].myAccountname
        }).length}</Reward>
    )
}

export default AlbumReward