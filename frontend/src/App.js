//import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
    return (
        <div>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/authenticate" element={<Auth/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
