import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import back from '../../../../assets/icon-arrow-left.png';
import save from '../../../../assets/Ms-button.png';
import disabledSave from '../../../../assets/Ms--Disabled-button.png';
import AuthContext from "../../../../context/AuthProvider";


const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 28px);
    padding: 0.813rem 0.750rem 0.813rem 1rem;
    border-bottom: 0.031rem solid #BDBDBD;
    background-color: white;
`

const BackBtn = styled(Link)`
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background-color: inherit;
    background-image: url(${back});
    background-size: 1.5rem 1.5rem;
    &:hover{
        cursor: pointer;
    }
`
const SaveBtn = styled.button`
    width: 5.625rem;
    height: 2rem;
    border: none;
    background-color: inherit;
    background-image: url(${save});
    background-size: 5.625rem 2rem;
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