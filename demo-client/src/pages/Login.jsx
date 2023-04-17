import React, { useEffect } from 'react'
import GoogleAuth from '../components/GoogleAuthBtn'
import { getUserById, login } from '../api-services/authService';
import { Link, useLocation, useNavigate } from "react-router-dom"
import jwt from "jsonwebtoken";

function Login({ handleSetUser }) {
  const location = useLocation();
  const navigate = useNavigate()

  // For google auth redirect and email verification redirect from server with token in query
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    setUserAndRedirect(token)
  }, [])

  // To handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = e.target;
    const { data } = await login(email.value, password.value.trim());
    const token = data.data.token;
    setUserAndRedirect(token)
  }

  const setUserAndRedirect = async (token) => {
    if (!token) return;
    const { userId } = jwt.decode(token);
    const response = await getUserById(userId);
    handleSetUser(response.data.data);
    localStorage.setItem("token", token);
    return navigate("/");
  }

  return (
    <div className='auth'>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input id='email' name='email' type="text" />

        <label htmlFor="password">Password</label>
        <input id='password' name='password' type="text" />

        <button>Login</button>
      </form>

      <p>Or</p>

      <GoogleAuth btnText={"Google Login"} />
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login