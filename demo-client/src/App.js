import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { setJwtInRequestHeader } from "./api-services/httpService";
import ShowCollectionsByUsername from "./pages/ShowCollectionsByUsername";
import ShowOneCollection from "./pages/ShowOneCollection";
// import jwt from "jsonwebtoken";
// import { getUserById } from "./api-services/authService";

function App() {
  const [user, setUser] = useState();

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
        <Route path="/" element={<Home />} />
        <Route path="/collections/:id" element={<Collection />} />
        <Route path="/:username/collections" element={<ShowCollectionsByUsername />} />
        <Route path="/:username/collections/:id" element={<ShowOneCollection />} />
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


// Not in use right now

  // To check for token as the app opens and sets the user - Not needed for now
  // useEffect(() => {
  //   async function checkForToken() {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;
  //     const { userId, username } = jwt.decode(token);
  //     console.log(username, userId)
  //     const { data } = await getUserById(userId);
  //     return setUser(data.data);
  //   }

  //   checkForToken()
  // }, []);
