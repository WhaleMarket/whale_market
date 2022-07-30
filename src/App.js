import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Start from './pages/login_page/Start';
import Login from './pages/login_page/Login';
import Home from './pages/login_page/Home';
import EmailLogin from './pages/login_page/EmailLogin';
import Join from './pages/login_page/Join';
import Profile from './pages/login_page/Profile';
import Main from './routes/Main';
import NotFound from './pages/NotFoundPage';
import './fonts/font.css';

const Globalstyle = createGlobalStyle`
    ${reset}
    html, body, #root {
        height: 100%;
        font-family: 'GangwonEdu_OTFBoldA';
        font-family: 'TmoneyRoundWindRegular';
        overflow: auto;
        white-space: nowrap;
        ::-webkit-scrollbar {
            width: 12px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: rgba(179, 229, 252, 0.8);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
        background-color: rgba(225, 245, 254, 0.7);
        }
    }

    textarea, textarea::placeholder, input, input::placeholder, button {
        font-family: 'TmoneyRoundWindRegular';
    }
        .a11yhidden {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
    }
`;

function App() {
    return (
        <>
            <BrowserRouter>
                <Globalstyle />
                <Switch>
                    <Route path="/" exact component={Start} />
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/emaillogin" component={EmailLogin} />
                    <Route path="/join" component={Join} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/main" component={Main} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
