import './App.css';
import Fib from "./common/pages/Fib";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import logo from './logo.svg'
import OtherPage from "./common/pages/OtherPage";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className={"App-logo"} alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                    <div className="App-container-link">
                        <Link className={"App-link"} to={"/"}>Home</Link>
                        <Link className={"App-link"} to={"/otherpage"}>Other Page</Link>
                    </div>
                </header>
                <Routes>
                    <Route exact path={"/"} element={<Fib/>}/>
                    <Route path={"/otherpage"} element={<OtherPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
