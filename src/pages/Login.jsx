import { Link } from 'react-router-dom'

function Login(){
    return(
        <>
            <div><Link to='/home'>로그인</Link></div>
            <div><Link to='/join'>회원가입</Link></div>
        </>
    )
}

export default Login;