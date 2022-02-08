import {BrowserRouter, Switch,Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps{
    toggleDark:() => void;
}

function Router({toggleDark}:IRouterProps){
    return <BrowserRouter>
        <Switch>
            <Route path="/:coinId">
                <Coin toggleDark={toggleDark} />
            </Route>
            <Route path="/">
             <Coins />
            </Route>
        </Switch>
        </BrowserRouter>
}


export default Router;