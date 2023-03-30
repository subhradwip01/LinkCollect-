import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { register } from '../api-services/authService';
import GoogleAuth from '../components/GoogleAuthBtn';
import config from "../config.json"

const api = config.api;

function Register() {
  const [verifying, setVerifying] = useState(false)


    const handleRegister = async(e)=>{
        e.preventDefault();
        const {name, email, password} = e.target;
    
        const {data} = await register(name.value, email.value, password.value.trim());
        return setVerifying(true)
      }

  return (
    !verifying?
    <form onSubmit={handleRegister} className='auth'>
        <label htmlFor="name">name</label>
        <input id='name' name='name' type="text" />

        <label htmlFor="email">Email</label>
        <input id='email' name='email' type="text" />

        <label htmlFor="password">Password</label>
        <input id='password' name='password' type="text" />

        <button>Sign Up</button>
        
        <p>Or</p>

        <GoogleAuth btnText={"Google Sign Up"} />
        <p>Or</p>
        <Link to="/login">Login</Link>
    </form>
    :
    <div>
      Please go to your EMAIL and click on verify Button
    </div>
  )
}

export default Register