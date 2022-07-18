import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginForm } from '../../components/emaillogin/LoginForm';

const EmailLogin = (props) => {
    const history = useHistory();

    // 로컬스토리지에 토큰이 있으면 이메일로그인 페이지는 메인/홈으로 스킵하는 기능
    useEffect(() => {
        if (window.localStorage.getItem('token') !== 'undefined' && window.localStorage.getItem('token')) {
            history.push('/main/home');
        }
    }, [history]);

    return (
        <LoginForm />
    );
}

export default EmailLogin;
