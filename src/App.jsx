import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Home from "./components/main/Home";
import Forbidden from "./components/main/Forbidden.jsx";
import Search from "./components/main/SearchBook";
import Login from "./components/header/login.jsx";
import Edit from "./components/main/EditBook";
import { useAuth } from "./components/provider/useAuth.js";
import Add from "./components/main/AddBook.jsx";
import Details from "./components/main/DetailsBook.jsx";

function App() {
  const { writeAccess } = useAuth();
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bookedit/:id" element={<Edit />} />
            <Route path="/bookdetails/:id" element={<Details />} />
            <Route path="add" element={writeAccess ? <Add /> : <Forbidden />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
