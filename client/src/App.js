import './App.css';
import Fib from "./common/pages/Fib";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import logo from '../public/fibonacci.png'
import OtherPage from "./common/pages/OtherPage";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <div className={"App-title-logo-wrapper"}>
                            <img src={logo} className={"App-logo"} alt="logo"/>
                            <h1 className="App-title">fibonacci suite</h1>
                        </div>
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
        </QueryClientProvider>
    );
}

export default App;
