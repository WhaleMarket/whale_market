import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from "styled-reset";
import Start from './pages/Start';
import Login from './pages/Login';
import Home from './pages/Home';
import EmailLogin from './pages/EmailLogin';
import Join from './pages/Join';
import Profile from './pages/Profile';


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
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
