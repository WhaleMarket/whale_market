import { useState, useEffect } from "react";
import styled from "styled-components";

const Top = styled.button`
    position: fixed;
    margin: 20px 0 0 10px;
    z-index: 10;
    top: 0;
    padding: ${(props) => (props.on === "true" ? "40px 10px 10px 10px" : "0 10px 10px 10px")};
    border: 1px solid #BDBDBD;
    background-color: transparent;
    border-radius: 10px;
    transition: 1s ease-in-out;
    cursor: pointer;
`

function TopButton(){
    const [on, setOn] = useState("false");

    const [height, setHeight] = useState(window.location.pathname.split('')[6] === "h" ? window.document.getElementById('root')?.childNodes[4]?.getBoundingClientRect().top : document.getElementById('root').lastChild?.lastChild?.lastChild?.lastChild?.getBoundingClientRect().top);

    const handleHeight = () => {
        setHeight(window.location.pathname.split('')[6] === "h" ? window.document.getElementById('root').childNodes[4]?.getBoundingClientRect().top : document.getElementById('root').lastChild?.lastChild?.lastChild?.lastChild?.getBoundingClientRect().top);
    };
  
    useEffect(() => {
      window.document.getElementById('root').addEventListener("scroll", handleHeight);
      return () => {
        window.document.getElementById('root').removeEventListener("scroll", handleHeight);
      };
    }, []);

    useEffect(()=>{
        if(window.location.pathname.split('')[6] === "h" ? height < -700 : height < -100){
            setOn("true")
        } else{
            setOn("false")
        }
    },[height])
    
    const handleTopdirect = () => {
        document.getElementById('root').scrollTo({
            top: 0,
        });
    }

    useEffect(()=>{
        handleTopdirect()
    },[window.location.pathname])

    const handleTop = () => {
        document.getElementById('root').scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }

    return(
        <>
            <Top on={on} onClick={handleTop}>위로 가기</Top>
        </>
    )
}

export default TopButton;