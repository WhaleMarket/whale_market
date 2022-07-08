import Navbar from "../components/main/Navbar";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chatting from "../pages/main_page/Chatting";
import MainProfile from "../pages/main_page/MainProfile";
import Home from "../pages/main_page/Home";
import Posting from "../pages/main_page/Posting";
import HomeSearch from "../pages/main_page/HomeSearch";

function Main(){
    return(
        <>
            <BrowserRouter basename="/main">
                <Navbar />
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/chatting" component={Chatting}/>
                    <Route path="/profile" component={MainProfile}/>
                    <Route path="/posting" component={Posting}/>
                    <Route path="/search" component={HomeSearch}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Main;