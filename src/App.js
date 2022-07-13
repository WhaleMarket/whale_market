import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from "styled-reset";
import Start from './pages/login_page/Start';
import Login from './pages/login_page/Login';
import Home from './pages/login_page/Home';
import EmailLogin from './pages/login_page/EmailLogin';
import Join from './pages/login_page/Join';
import Profile from './pages/login_page/Profile';
import Main from './routes/Main'
import MainProfile from './pages/main_page/mainProfile/MyProfile';
import ProfileModification from './pages/main_page/mainProfile/ProfileEdit';


const Globalstyle = createGlobalStyle`
    ${reset}
`

function App() {
    return (
        <>
            <BrowserRouter>
                <Globalstyle />
                <Switch>
                    <Route path="/" exact component={Start}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path='/emaillogin' component={EmailLogin} />
                    <Route path='/join' component={Join} />
                    <Route path="/profile" component={Profile}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/mainprofile" component={MainProfile}/>
                    <Route path="/profileedit" component={ProfileModification}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
