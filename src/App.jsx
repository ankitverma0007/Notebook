import Navbar from "./assets/Navbar"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import About from "./pages/About";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import Notes from "./pages/Notes";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import ProtectedRoutes from "./assets/ProtectedRoutes";
import Signup from "./pages/Signup";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem("isLoggedIn") === "true"
    );
    const navigate = useNavigate();
    const handleLogin = ()=>{
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/tasks");
    }

    const handleSignUp = () =>{
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true); // fdor now bcz of no authentication
      navigate("/tasks");
    }
    const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };



  return (
    <>
      <Navbar title = "NoteBook!" isLoggedIn={isLoggedIn} handleLogout={handleLogout}></Navbar>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="signup" element = {<Signup onSignUp={handleSignUp}/>}/>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/tasks" /> : <Login onLogin={handleLogin} />}/>
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
