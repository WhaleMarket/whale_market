import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../../constants/defaultUrl";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";

const Section = styled.li`
  border: 1px solid black;
  border-radius: 10px;
  height: 200px;
  padding: 16px;
`;

const Img = styled.img`
  height: 100px;
  border-radius: 10px;
`;

function Reward({ data }) {
  const [InfoState] = useContext(AuthContext);
  const [Acquired, setAcquired] = useState([]);
  async function getReward() {
    try {
      const commentData = {
        comment: {
          content: "획득",
        },
      };
      await axios.post(`${API_URL}/post/${data.id}/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      });
      const res = await axios.get(`${API_URL}/post/${data.id}/comments`, {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      });
      setAcquired(res.data.comments);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function acquiredReward() {
      try {
        const res = await axios.get(`${API_URL}/post/${data.id}/comments`, {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        });
        setAcquired(res.data.comments);
      } catch (error) {
        console.error(error);
      }
    }
    acquiredReward();
  }, [InfoState.MyInformations]);

  return (
    <Section>
      <Img src={data.image} />
      <p>리워드 이름 : {data.content.split(",")[0]}</p>
      <p>
        남은 수량 :
        {data.content.split(",")[1] -
          Acquired.map((value) => value.author.accountname).filter((value) => {
            return value === InfoState.MyInformations[0].myAccountname;
          }).length}
      </p>
      <button
        onClick={getReward}
        disabled={
          data.content.split(",")[1] -
            Acquired.map((value) => value.author.accountname).filter(
              (value) => {
                return value === InfoState.MyInformations[0].myAccountname;
              }
            ).length ===
          0
            ? true
            : false
        }
      >
        획득하기
      </button>
    </Section>
  );
}

export default Reward;
