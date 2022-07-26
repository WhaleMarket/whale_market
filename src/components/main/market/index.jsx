import Reward from "./reward";
import styled from "styled-components";

const Wrapper = styled.ul`
  padding: 68px 16px 0 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
`;

function Market({ List }) {
  return (
    <>
      <Wrapper>
        {List?.map((value, key) => {
          return <Reward key={key} data={value} />;
        })}
      </Wrapper>
    </>
  );
}

export default Market;
