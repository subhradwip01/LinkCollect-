import React from 'react'
import GoogleAuth from '../components/GoogleAuthBtn'
import config from "../config.json"
import axios from 'axios';
import { login } from '../api-services/authService';
import {Link} from "react-router-dom"

const api = config.api;

function Login() {  

  const handleLogin = async(e)=>{
    e.preventDefault()
    const {email, password} = e.target;

    const {data} = await login(email.value, password.value);
    console.log(data);
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