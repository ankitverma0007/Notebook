import { useState } from "react";
import Login from "../pages/Login";

export default function Auth() {
    const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

    const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Fake Login Example</h2>

      {isLoggedIn ? (
        <>
          <p>✅ You are logged in</p>
          
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>❌ You are logged out</p>
          <Login/>
          <button onClick={login}>Login</button>
        </>
      )}
    </div>
    </div>
  )
}
