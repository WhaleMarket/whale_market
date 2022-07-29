import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../../../../context/AuthProvider";
import styled from 'styled-components';
import back from '../../../../assets/icon-arrow-left.png';
import save from '../../../../assets/Ms-button.png';
import disabledSave from '../../../../assets/Ms--Disabled-button.png';


const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 54px;
    padding: 13px 12px 13px 16px;
    border-bottom: 0.5px solid #BDBDBD;
    background-color: #FFFFFF;
    box-sizing: border-box;
`

const BackBtn = styled(Link)`
    width: 24px;
    height: 24px;
    border: none;
    background-color: inherit;
    background-image: url(${back});
    background-size: 22px 22px;
    &:hover{
        cursor: pointer;
    }
`
const SaveBtn = styled.button`
    width: 90px;
    height: 32px;
    border: none;
    background-color: inherit;
    background-image: url(${save});
    background-size: 90px 32px;
    :disabled {
        background-image: url(${disabledSave});
    }
    &:hover{
        cursor: pointer;
    }
`

function ProfileEditHeader({disabled}){
    const [InfoState] = useContext(AuthContext);

    return(
        <Head>
            <BackBtn to = {`/profile/${InfoState.MyInformations[0].myAccountname}`}/>
            <SaveBtn disabled={disabled}/>
        </Head>
    )
}

export default ProfileEditHeader;