import Reward from "./Reward";
import styled from "styled-components";
import Ranking from "./Ranking";

const RewardWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  padding-top: 90px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media screen and (max-width: 768px) {
    width: 230px;
    padding-top: 80px;
    margin: 0 26px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
  }

  @media screen and (max-width: 390px) {
    display: flex;
    flex-direction: column;
    width: 330px;
    margin: 0 auto;
    padding: 53px 4% 68px;
  }
`

function Market({ List }) {
  return (
    <>
      <RewardWrapper>
        {List?.map((value, key) => {
          return <Reward key={key} data={value} />;
        })}
      </RewardWrapper>
      <Ranking />
    </>
  );
}

export default Market;
