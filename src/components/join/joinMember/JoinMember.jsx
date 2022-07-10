import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../../constants/defaultUrl";
import axios from "axios";
import styled from "styled-components";
import Button from "../../login/Button";
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;

    h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 40px;
    }
`;

const StyledForm = styled.form`
    width: 322px;
`;

const StyledLabel = styled.label`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
`;

const StyledInput = styled.input`
    outline: none;
    display: block;
    border : none;
    border-bottom: 1px solid #DBDBDB;
    width: 100%;
    height: 32px;
    padding: 0;
    margin-bottom: 6px;

    &:focus {
        border-bottom: 1px solid #00BCD4;
    }
`;

const ErrorMessage = styled.strong`
    display: inline-block;
    color: tomato;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    margin-top: 6px;
`;

const JoinMember = ({ setNextPage, setUserInfo }) => {
    // 이메일 에러메시지 상태관리
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    // useForm: register등 메서드와 formState 객체를 사용하여 onChange할때마다 유효성 검사를 진행한다
    const {
        // 유효성 검사 규칙을 적용하여 입력내용을 등록하는 메서드(함수)
        register,
        // 유효성 검사 통과 시 양식 제출하는 메서드(함수)
        handleSubmit,
        // 값 가져오는 메서드(함수)
        getValues,
        // 전체양식의 State 객체. 에러 메시지를 반환할 수 있는 errors, 양식에 에러가 없으면 true값을 반환하는 isValid.
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
    });

    // getValues함수 값의 email에 변경이 있으면 이메일 에러메시지가 있는 상태이면 없애줌
    useEffect(() => {
        if (emailErrorMessage) setEmailErrorMessage("");
    }, [getValues().email]);

    // 이메일 유효성 검사
    const getEmailValid = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const reqData = {
            user: { email: getValues().email },
        };
        const { data } = await axios.post(
            `${API_URL}/user/emailvalid`,
            reqData,
            config,
        );

        return data;
    };

    
    const onSubmit = async ({ email, password }) => {
        if (isValid) {
            try {
            const response = await getEmailValid();
            
            if (response.message === "사용 가능한 이메일 입니다.") {
                setNextPage(false);
                setUserInfo({ email, password });
            }
            if (response.message === "이미 가입된 이메일 주소 입니다.") {
                setEmailErrorMessage(response.message);
            }
        } catch (e) {
            console.error(e);
        }
    }
};

    // TODO: 유효성 검사
        // 이메일 주소의 형식이 유효하지 않거나, 이미 가입된 이메일일 경우, 또는 비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
        // 이메일 주소 또는 비밀번호를 입력하고 입력창에서 포커스를 잃으면 바로 유효성 검사가 진행되는 기능 
        // 유효성검사를 통과하지 못한 경우 경고 문구가 각 입력창 하단에 표시되는 기능

        return (
            <Wrapper>
            <h2>이메일로 회원가입</h2>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <StyledLabel htmlFor="email">
                        이메일
                        <StyledInput
                            name="email"
                            id="email"
                            type="email"
                            placeholder="이메일 주소를 입력해 주세요."
                            autoComplete="off"
                            spellCheck="false"
                            {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            })}
                        />
                        {errors?.email?.type === "required" && (
                            <ErrorMessage>* 필수 입력사항입니다.</ErrorMessage>
                        )}
                        {errors.email?.type === "pattern" && (
                            <ErrorMessage>*올바르지 않은 이메일 형식입니다.</ErrorMessage>
                        )}
                        {emailErrorMessage && (
                            <ErrorMessage>{emailErrorMessage}</ErrorMessage>
                        )}
                    </StyledLabel>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <StyledLabel htmlFor="password">
                        비밀번호
                        <StyledInput
                            name="password"
                            id="password"
                            type="password"
                            spellCheck="false"
                            placeholder="비밀번호를 설정해 주세요."
                            {...register("password", { required: true, minLength: 6 })}
                        />
                        {/* handleSubmit이 실행되고 난 후 error가 발생하게 되면 해당 error 값들은 formState 객체 안의 errors에 담겨있다 */}
                        {errors?.password?.type === "required" && (
                            <ErrorMessage>* 필수 입력사항입니다.</ErrorMessage>
                        )}
                        {errors.password?.type === "minLength" && (
                            <ErrorMessage>* 비밀번호는 6자 이상이어야 합니다.</ErrorMessage>
                        )}
                    </StyledLabel>
                </div>

                {/* <button disabled={!isValid}>다음</button> */}
                <Button 
                    type="submit" 
                    text="다음"
                    disabled={!isValid}
                    style={{ backgroundColor: isValid ? '#00BCD4' : '#B2EBF2', border: '0px', fontWeight: '500', fontSize: '14px', color: 'white', marginTop: '30px' }}
                />
                <Link to='/profile'>다음(프로필 페이지 이동 test)</Link>

            </StyledForm>
        </Wrapper>
    );
};

export default JoinMember;
