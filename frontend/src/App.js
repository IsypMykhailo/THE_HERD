//import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";

function App() {
    return (
        <div>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/authenticate" element={<Auth/>}/>
                        <Route path="/blog" element={<Blog/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
