import { useContext, useState } from 'react';
import DetailInput from './DetailInput';
import DetailLabel from './DetailLabel';
import ErrorMessage from './ErrorMessage';
import ProfileModificationContext from '../../../../../context/ProfileModification';
import AuthContext from '../../../../../context/AuthProvider';

function Detail() {
    const [ProfileModificationState] = useContext(ProfileModificationContext);
    const [InfoState] = useContext(AuthContext);
    const [errMsgForAccountname, setErrMsgForAccountname] = useState('');

    const nameState =
    ProfileModificationState.profile[0].value.split('').length < 2 ||
    ProfileModificationState.profile[0].value.split('').length > 10;

    return (
        <>
            <legend className="a11yhidden">Profile Edit</legend>
            <DetailLabel id="username" title="사용자 이름" />
            <DetailInput
                errorName={nameState}
                index="0"
                id="username"
                type="text"
                placeholder="2~10자 이내여야 합니다."
                defaultValue={InfoState.MyInformations[0].myAccountname}
            />
            {ProfileModificationState.profile[0].error && (
                <ErrorMessage message="*2~10자 이내여야 합니다." />
            )}
            <DetailLabel id="accountname" title="계정 ID" />
            <DetailInput
                index="1"
                id="accountname"
                type="text"
                placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                defaultValue={InfoState.MyInformations[0].myAccountname}
                setErrMsgForAccountname={setErrMsgForAccountname}
            />
            {ProfileModificationState.profile[1].error && (
                <ErrorMessage message={errMsgForAccountname} />
            )}
            <DetailLabel id="intro" title="소개" />
            <DetailInput
                index="2"
                id="intro"
                type="text"
                placeholder="자신을 소개해 주세요!"
                defaultValue={InfoState.MyInformations[0].myIntro}
                errorName={false}
            />
        </>
    );
}

export default Detail;
