import styled from "styled-components";
import UploadBtn from "./Upload_btn";

const Blank = styled.div`
  position: relative;
  margin: 18px 0 30px 0;
  height: 204px;
  background-color: #f2f2f2;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
`;

function UploadSection() {
  return (
    <>
      <Blank>
        <UploadBtn />
      </Blank>
    </>
  );
}

export default UploadSection;
