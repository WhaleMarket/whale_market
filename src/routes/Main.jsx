import Navbar from '../components/main/Navbar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Reward from '../pages/main_page/Reward';
import MainProfile from '../pages/main_page/mainProfile/MyProfile';
import ProductUpload from '../pages/main_page/mainProfile/ProductUpload';
import Home from '../pages/main_page/Home';
import Posting from '../pages/main_page/Posting';
import HomeSearch from '../pages/main_page/HomeSearch';
import Followers from '../pages/main_page/mainProfile/Followers';
import useAccountInfo from '../hook/useAccountInfo';
import Followings from '../pages/main_page/mainProfile/Following';
import UserProfile from '../pages/main_page/mainProfile/UserProfile';
import PostingEdit from '../pages/main_page/mainProfile/PostingEdit';
import ProductEdit from '../pages/main_page/mainProfile/ProductEdit';
import Login from '../pages/login_page/Login';
import ProfileEdit from '../pages/main_page/mainProfile/ProfileEdit';

function MainRouter() {
    useAccountInfo();

    return (
        <>
            <Switch>
                <Route path="/posting" component={Posting} />
                <Route path="/profileedit" component={ProfileEdit} />
                <Route path="/followers/:accountname" component={Followers} />
                <Route path="/followings/:accountname" component={Followings} />
                <Route path="/productupload" component={ProductUpload} />
                <Route path="/userprofile" component={UserProfile} />
                <Route path="/postingedit/:postId" component={PostingEdit} />
                <Route path="/productedit/:postId" component={ProductEdit} />

                <>
                    <Navbar />
                    <Route path="/home" exact render={Home} />
                    <Route path="/reward" component={Reward} />
                    <Route
                        path="/profile/:accountname"
                        component={MainProfile}
                    />
                    <Route path="/home/search" component={HomeSearch} />
                </>
            </Switch>
        </>
    );
}

function Main() {
    const history = useHistory();

    if (window.location.pathname === '/main') {
        history.push('/main/home');
    }

    return window.localStorage.getItem('token') &&
        window.localStorage.getItem('token') !== 'undefined' ? (
        <>
            <BrowserRouter basename="/main">
                <MainRouter />
            </BrowserRouter>
        </>
    ) : (
        <Login />
    );
}

export default Main;
