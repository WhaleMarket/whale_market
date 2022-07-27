import Reward from "./Reward";
import styled from "styled-components";
import Ranking from "./Ranking";

const RewardWrapper = styled.ul`
  display: flex;
  width: 60vw;
  padding-top: 100px; 
  margin: 0 auto;
  gap: 20px;
  box-sizing: border-box;
  @media screen and (max-width: 1200px) {
    width: 80%;
    padding-top: 90px;
    gap: 15px;
  }
  @media screen and (max-width: 480px) {
    flex-direction: column;
    padding-bottom: 30px;
    gap: 24px;
  }
`;

function Market({ List }) {
  return (
    <>
      <RewardWrapper>
        {List?.map((value, key) => {
          return <Reward key={key} data={value} />;
        })}
      </RewardWrapper>
      <Ranking/>
    </>
  );
}

export default Market;
