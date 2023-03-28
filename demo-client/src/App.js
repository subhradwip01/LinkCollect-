import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "./api-services/authService";
import "./App.css";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import jwt from "jsonwebtoken";

function App() {
  const location = useLocation();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // For googleauth redirect
  useEffect(() => {
    async function getUserNow() {
      const token = localStorage.getItem("token");
      if (token) {
        const something = jwt.decode(token);
        console.log(something);
        // const { data } = await getUserById(userId);

        // setUser(data.data);
      } else navigate("/login");
    }

    const JWT_token = new URLSearchParams(location.search).get("token");
    if (JWT_token) {
      localStorage.setItem("token", JWT_token);
    }

    getUserNow();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/collections/:id" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
