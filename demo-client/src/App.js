import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "./api-services/authService";
import "./App.css";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import jwt from "jsonwebtoken";
import { setJwtInRequestHeader } from "./api-services/httpService";

function App() {
  const [user, setUser] = useState();

  // To check for token as the app opens and set the user
  useEffect(() => {
    async function checkForToken() {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { user: userId } = jwt.decode(token);
      const { data } = await getUserById(userId);
      return setUser(data.data);
    }
  }, []);

  // To set JWT token in request header for authorization on each API call
  useEffect(() => {
    function init() {
      const token = localStorage.getItem("token");
      if (token) {
        setJwtInRequestHeader(token);
      }
    }

    init();
  }, [user]);

  // This function is passed as props to diff compoenents to set the user
  const handleSetUser = (user) => {
    setUser(user);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/collections/:id" element={<Collection />} />
        <Route
          path="/login"
          element={<Login handleSetUser={handleSetUser} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
