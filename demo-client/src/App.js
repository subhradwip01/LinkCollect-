import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "./api-services/authService";
import "./App.css";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getUserFromToken } from "./utils/getUserFromToken";

import { setTokenToLocalStorage } from "./utils/setToken";

function App() {
  const location = useLocation();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // For googleauth redirect
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (!token) return;
    setTokenToLocalStorage(token);
    return navigate("/");
  }, []);

  useEffect(() => {
    async function getUserNow() {
      const token = localStorage.getItem("token");
      if (token) {
        const userId = getUserFromToken(token);
        const user = await getUserById(userId);
        return setUser(user);
      }
      return navigate("/login");
    }

    getUserNow();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/:id" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
