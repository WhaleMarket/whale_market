import { useState, useContext } from "react";
import styled from "styled-components";
import UploadBtn from "./Upload_btn";
import ProfileModificationContext from "../../../../../context/ProfileModification";

const Blank = styled.div`
    position: relative;
    width: 110px;
    height: 110px;
    background-image: url(${(props) => props.url});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
    border-radius: 50%;
`;

function UploadSection() {
  const [ProfileModificationState] = useContext(ProfileModificationContext);
  const [url, setUrl] = useState("");
  return (
    <>
      <Blank url={url === "" ? ProfileModificationState.profile[3].value : url}>
        <UploadBtn setUrl={setUrl} />
      </Blank>
    </>
  );
}

export default UploadSection;
