import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navbar from "./assets/Navbar";
import ProtectedRoutes from "./assets/ProtectedRoutes";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Footer from "./assets/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();

  const user = {
    name: "Kit",
    email: "kit@email.com",
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/tasks");
  };

  const handleSignUp = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/tasks");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };


  const handleDeleteAccount = () => {
    console.log("Account deleted");
    localStorage.clear();
  };

  const handleDeleteAllNotes = () => {
    localStorage.removeItem("notes");
    console.log("All notes deleted");
  };

  const handleDeleteAllTasks = () => {
    localStorage.removeItem("tasks");
    console.log("All tasks deleted");
  };

  const handleChangePassword = (passwordData) => {
    console.log("Password change request:", passwordData);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar title="NoteBook!" isLoggedIn={isLoggedIn} />
      <div className="flex-grow-1">
        <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>}/>
        <Route path="/signup" element={<Signup onSignUp={handleSignUp} />}/>
        <Route path="/login" element={ isLoggedIn ? <Navigate to="/tasks" /> : <Login onLogin={handleLogin} />}/>
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={
              <Profile user={user}
                handleLogout={handleLogout}
                handleDeleteAccount={handleDeleteAccount}
                handleDeleteAllNotes={handleDeleteAllNotes}
                handleDeleteAllTasks={handleDeleteAllTasks}
                handleChangePassword={handleChangePassword}
              />}/></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
