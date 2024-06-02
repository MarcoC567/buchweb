import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Home from "./components/main/Home";
import Search from "./components/main/SearchBook";
import Login from "./components/header/login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
