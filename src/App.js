import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from "styled-reset";
import Start from './pages/Start';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateAccount from './pages/Join';

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
          <Route path="/createaccount" component={CreateAccount}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
