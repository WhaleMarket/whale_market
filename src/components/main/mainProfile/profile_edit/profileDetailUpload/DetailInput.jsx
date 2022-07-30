import { useRef, useContext } from 'react';
import styled from 'styled-components';
import ProfileModificationContext from '../../../../../context/ProfileModification';
import axios from 'axios';
import { API_URL } from "../../../../../constants/defaultUrl";

const Input = styled.input`
    width: 322px;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    color: #000000;
    font-size: 14px;
    &:focus {
        outline: none;
        border-bottom: 1px solid #00bcd4;
    }
    &::placeholder {
        color: #dbdbdb;
    }
`;

function DetailInput({
    id,
    type,
    placeholder,
    index,
    errorName,
    defaultValue,
    setErrMsgForAccountname
}) {
    const [, setProfileModificationState] = useContext(ProfileModificationContext);
    const accountnameRegex = /^[-._a-zA-Z0-9]+$/;
    const input_ref = useRef();

    const inputstate = () => {
        if (input_ref) {
            setProfileModificationState((ProfileModificationsState) => {
                ProfileModificationsState.profile[parseInt(index)] = {
                    ...ProfileModificationsState.profile[parseInt(index)],
                    value: input_ref.current.value,
                };
                return { profile: ProfileModificationsState.profile };
            });
        }
        if(id !== "intro"){
            if (input_ref.current.value !== '') {
                setProfileModificationState((ProfileModificationsState) => {
                    ProfileModificationsState.profile[parseInt(index)] = {
                        ...ProfileModificationsState.profile[parseInt(index)],
                        editPossible: true,
                    };
                    return { profile: ProfileModificationsState.profile };
                });
            } else {
                setProfileModificationState((ProfileModificationsState) => {
                    ProfileModificationsState.profile[parseInt(index)] = {
                        ...ProfileModificationsState.profile[parseInt(index)],
                        editPossible: false,
                    };
                    return { profile: ProfileModificationsState.profile };
                });
            }
        } else {
            setProfileModificationState((ProfileModificationsState) => {
                ProfileModificationsState.profile[parseInt(index)] = {
                    ...ProfileModificationsState.profile[parseInt(index)],
                    editPossible: true,
                };
                return { profile: ProfileModificationsState.profile };
            });
        }
    };

    const errorState = async () => {
        if(id !== "accountname"){
            if (errorName) {
                setProfileModificationState((ProfileModificationState) => {
                    ProfileModificationState.profile[parseInt(index)] = {
                        ...ProfileModificationState.profile[parseInt(index)],
                        error: true,
                    };
                    return { profile: ProfileModificationState.profile };
                });
            } else {
                setProfileModificationState((ProfileModificationState) => {
                    ProfileModificationState.profile[parseInt(index)] = {
                        ...ProfileModificationState.profile[parseInt(index)],
                        error: false,
                    };
                    return { profile: ProfileModificationState.profile };
                });
            }
        } else {
            if (input_ref.current.value !== '') {
                try {
                    const reqData = {
                        user: { accountname: input_ref.current.value },
                    };
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    };
                    const response = await axios.post(
                        `${API_URL}/user/accountnamevalid`,
                        reqData,
                        config
                    );
    
                    if (response?.data?.message === '이미 가입된 계정ID 입니다.') {
                        setErrMsgForAccountname('*' + response.data.message);
                        setProfileModificationState((ProfileModificationState) => {
                            ProfileModificationState.profile[parseInt(index)] = {
                                ...ProfileModificationState.profile[parseInt(index)],
                                error: true,
                            };
                            return { profile: ProfileModificationState.profile };
                        });
                    } else if (!accountnameRegex.test(input_ref.current.value)) {
                        setErrMsgForAccountname(
                            '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.'
                        );
                        setProfileModificationState((ProfileModificationState) => {
                            ProfileModificationState.profile[parseInt(index)] = {
                                ...ProfileModificationState.profile[parseInt(index)],
                                error: true,
                            };
                            return { profile: ProfileModificationState.profile };
                        });
                    } else if (
                        response?.data?.message === '사용 가능한 계정ID 입니다.'
                    ) {
                        setErrMsgForAccountname('*' + response.data.message);
                        setProfileModificationState((ProfileModificationState) => {
                            ProfileModificationState.profile[parseInt(index)] = {
                                ...ProfileModificationState.profile[parseInt(index)],
                                error: true,
                                editPossible: true
                            };
                            return { profile: ProfileModificationState.profile };
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    return (
        <>
            <Input
                ref={input_ref}
                onChange={inputstate}
                id={id}
                type={type}
                placeholder={placeholder}
                onBlur={errorState}
                defaultValue={defaultValue}
                maxLength={id==="intro" ? "150" : ""}
            />
        </>
    );
}

export default DetailInput;
