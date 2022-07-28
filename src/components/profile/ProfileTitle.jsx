import React from 'react';
import styled from 'styled-components';

const ProfileTit = styled.h1`
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
`;

const ProfileSubTit = styled.p`
    margin-top: 12px;
    font-size: 14px;
    font-weight: 400;
`;

function ProfileTitle() {
    return (
        <>
        <ProfileTit>프로필 설정</ProfileTit>
        <ProfileSubTit>나중에 언제든지 변경할 수 있습니다.</ProfileSubTit>
        </>
    );
};

export default ProfileTitle;