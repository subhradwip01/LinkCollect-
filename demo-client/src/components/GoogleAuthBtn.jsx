import React from 'react'
import { useNavigate } from 'react-router-dom';
import { googleAuth } from '../api-services/authService'


function GoogleAuth({btnText}) {
  return (
    <div>
        <button>
            <a href={googleAuth()}>{btnText}</a>
        </button>
    </div>
  )
}

export default GoogleAuth