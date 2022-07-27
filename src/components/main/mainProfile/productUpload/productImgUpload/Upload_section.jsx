import styled from "styled-components";
import UploadBtn from "./Upload_btn";
import { useState, useContext } from "react";
import ProductModificationContext from "../../../../../context/ProductModification";

const Blank = styled.div`
  position: relative;
  margin: 18px 0 30px 0;
  height: 204px;
  background-color: #f2f2f2;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
`;

function UploadSection() {
  const [ProductModificationState] = useContext(ProductModificationContext);
  const [url, setUrl] = useState("");
  return (
    <>
      <Blank url={url === "" ? ProductModificationState.product[0].image : url}>
        <UploadBtn setUrl={setUrl} />
      </Blank>
    </>
  );
}

export default UploadSection;
